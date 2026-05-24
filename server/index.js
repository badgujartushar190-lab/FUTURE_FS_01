import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fetchText = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https://') ? https : http;
  const request = client.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const nextUrl = new URL(res.headers.location, url).toString();
      return resolve(fetchText(nextUrl));
    }

    if (res.statusCode !== 200) {
      return reject(new Error(`Request failed with status ${res.statusCode}`));
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => resolve(data));
  });

  request.on('error', reject);
  request.setTimeout(15000, () => request.destroy(new Error('Request timed out')));
});

const parseDriveFolderHtml = (html) => {
  if (!html) return [];

  const normalized = html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>');

  const ids = new Set();
  const pattern = /null,"([^\"]+)"\],null,null,null,"video\/mp4"/g;
  let match;

  while ((match = pattern.exec(normalized)) !== null) {
    ids.add(match[1]);
  }

  return [...ids];
};

const fetchPublicDriveFolderVideos = async (folderId) => {
  const urls = [
    `https://drive.google.com/drive/folders/${folderId}`,
    `https://drive.google.com/drive/folders/${folderId}?usp=drive_link`,
  ];

  for (const url of urls) {
    try {
      const html = await fetchText(url);
      const ids = parseDriveFolderHtml(html);
      if (ids.length > 0) {
        return ids;
      }
    } catch (error) {
      console.warn(`Drive HTML fetch failed for ${url}:`, error.message);
    }
  }

  return [];
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Google Drive Setup
let drive = null;
if (process.env.GOOGLE_API_KEY) {
  drive = google.drive({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });
}

// Video cache with TTL
const videoCache = {};
const CACHE_TTL = 3600000; // 1 hour

// Helper function to extract video metadata
function extractVideoMetadata(filename) {
  // Remove file extension and extract meaningful info
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return {
    name: nameWithoutExt,
    category: 'Gallery Video',
    duration: 'Video',
    description: 'Video from your gallery collection',
  };
}

// Routes
app.get('/api/gallery/:folderId', async (req, res) => {
  const { folderId } = req.params;

  // Check cache
  if (videoCache[folderId] && Date.now() - videoCache[folderId].timestamp < CACHE_TTL) {
    return res.json({ success: true, videos: videoCache[folderId].videos });
  }

  let videos = [];
  let driveError = null;

  // Attempt Google Drive API first if configured
  if (drive) {
    try {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'video/' and trashed=false`,
        spaces: 'drive',
        fields: 'files(id, name, mimeType, createdTime, webContentLink)',
        pageSize: 100,
        orderBy: 'createdTime desc',
      });

      if (response.data.files && response.data.files.length > 0) {
        videos = response.data.files
          .filter(file => file.mimeType && file.mimeType.startsWith('video/'))
          .map((file) => ({
            id: file.id,
            ...extractVideoMetadata(file.name),
          }));
      }
    } catch (error) {
      driveError = error;
      console.warn('Google Drive API fetch failed:', error.message);
    }
  }

  // HTML fallback for public Drive folders
  if (videos.length === 0) {
    try {
      const htmlVideoIds = await fetchPublicDriveFolderVideos(folderId);
      if (htmlVideoIds.length > 0) {
        videos = htmlVideoIds.map((id, index) => ({
          id,
          ...extractVideoMetadata(`Video ${index + 1}.mp4`),
        }));
      }
    } catch (error) {
      console.warn('Public Drive HTML fallback failed:', error.message);
    }
  }

  // Fallback: load from videos.json
  if (videos.length === 0) {
    try {
      const videosPath = path.join(__dirname, 'videos.json');
      if (fs.existsSync(videosPath)) {
        const videosData = JSON.parse(fs.readFileSync(videosPath, 'utf8'));

        let categoryKey = 'videoEditing';
        if (folderId === '1K9kp8j7A9PI94ivUsdec86LpJJQ-sLxB') {
          categoryKey = 'motionGraphics';
        }

        if (Array.isArray(videosData[categoryKey])) {
          videos = videosData[categoryKey]
            .filter(v => v.id && !v.id.includes('YOUR_'))
            .map((video) => ({
              id: video.id,
              name: video.name || `Video ${video.id}`,
              category: video.category || 'Gallery Video',
              duration: video.duration || 'Video',
              description: video.description || 'Video from your gallery collection',
            }));
        }
      }
    } catch (jsonError) {
      console.warn('Could not load from videos.json:', jsonError.message);
    }
  }

  if (videos.length > 0) {
    videoCache[folderId] = {
      videos,
      timestamp: Date.now(),
    };

    return res.json({ success: true, videos });
  }

  if (!drive) {
    return res.status(400).json({
      success: false,
      message: 'Google API not configured and no videos available from fallback',
      instructions: 'Set GOOGLE_API_KEY in server/.env or add video file IDs to server/videos.json',
    });
  }

  const errorMessage = driveError && driveError.message.includes('Invalid Credentials')
    ? 'Invalid Google API Key'
    : 'Error fetching videos';
  const errorDetails = driveError ? driveError.message : 'No videos were found using the fallback methods.';

  res.status(500).json({
    success: false,
    message: errorMessage,
    details: errorDetails,
    fallback: 'Add public Drive IDs to server/videos.json if the automatic folder scan fails.',
  });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Save to Database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent and saved!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error processing request' });
  }
});

app.get('/', (req, res) => {
  res.send('Tushar API is operational.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
