#!/usr/bin/env node

/**
 * Google Drive Video Extractor
 * 
 * This utility helps extract video file IDs from a Google Drive folder
 * and populate them in videos.json for the gallery.
 * 
 * Usage:
 *   node extract-videos.js <folderId> [output]
 * 
 * Example:
 *   node extract-videos.js 1Brfmpms9-o2eaWAk224acWya1TLu-DA4 videos.json
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const args = process.argv.slice(2);
const folderId = args[0];
const outputFile = args[1] || 'videos-extracted.json';

if (!folderId) {
  console.error('❌ Error: Folder ID is required');
  console.error('\nUsage: node extract-videos.js <folderId> [outputFile]');
  console.error('\nExample:');
  console.error('  node extract-videos.js 1Brfmpms9-o2eaWAk224acWya1TLu-DA4 videos.json');
  process.exit(1);
}

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error('❌ Error: GOOGLE_API_KEY not found in .env file');
  console.error('\nPlease follow these steps:');
  console.error('1. Create a .env file in the server directory');
  console.error('2. Add: GOOGLE_API_KEY=your_api_key_here');
  console.error('3. See GOOGLE_DRIVE_SETUP_GUIDE.md for detailed instructions');
  process.exit(1);
}

const drive = google.drive({
  version: 'v3',
  auth: apiKey,
});

async function extractVideos() {
  console.log('🔍 Extracting videos from Google Drive folder...\n');

  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'video/' and trashed=false`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType, createdTime)',
      pageSize: 100,
      orderBy: 'createdTime desc',
    });

    const files = response.data.files || [];

    if (files.length === 0) {
      console.error('❌ No video files found in this folder');
      console.error('   Folder ID:', folderId);
      console.error('   Make sure:');
      console.error('   - The folder contains videos');
      console.error('   - The folder ID is correct');
      console.error('   - The API key has proper permissions');
      process.exit(1);
    }

    const videos = files
      .filter(file => file.mimeType && file.mimeType.startsWith('video/'))
      .map((file, index) => ({
        id: file.id,
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
        category: 'Video',
        duration: 'Video',
        description: `Video from gallery - ${file.name}`,
      }));

    const output = {
      videoEditing: videos,
      motionGraphics: [],
      extracted: {
        timestamp: new Date().toISOString(),
        folderUrl: `https://drive.google.com/drive/folders/${folderId}`,
        totalVideos: videos.length,
      },
    };

    // Write to file
    const outputPath = path.join(process.cwd(), outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`✅ Successfully extracted ${videos.length} videos!\n`);
    console.log('📋 Videos found:');
    videos.forEach((video, index) => {
      console.log(`   ${index + 1}. ${video.name}`);
      console.log(`      ID: ${video.id}`);
    });

    console.log(`\n💾 Data saved to: ${outputFile}`);
    console.log('\n📝 Next steps:');
    console.log('1. Review the videos in the extracted file');
    console.log('2. Edit video names and descriptions as needed');
    console.log(`3. Replace server/videos.json with the updated ${outputFile}`);
    console.log('4. Restart your development server');
    console.log('5. Refresh the portfolio page to see the videos');

  } catch (error) {
    console.error('❌ Error extracting videos:', error.message);

    if (error.message.includes('Invalid Credentials')) {
      console.error('\n⚠️  Invalid API Key');
      console.error('   Please check your GOOGLE_API_KEY in .env');
    } else if (error.message.includes('forbidden')) {
      console.error('\n⚠️  Access Denied');
      console.error('   The API key may not have permission to access this folder');
    } else if (error.message.includes('notFound')) {
      console.error('\n⚠️  Folder not found');
      console.error('   Please verify the folder ID:', folderId);
    }

    process.exit(1);
  }
}

extractVideos();
