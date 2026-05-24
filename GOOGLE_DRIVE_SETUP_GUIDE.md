# Google Drive Integration Setup Guide

This guide explains how to set up the Google Drive API to automatically fetch videos from your gallery folders.

## Overview

The Video Editing Gallery now fetches videos dynamically from a Google Drive folder. This requires:
1. A Google Cloud project
2. Google Drive API enabled
3. An API key configured in the server's `.env` file

## Steps to Set Up Google Drive API

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Portfolio Video Gallery")
5. Click "CREATE"
6. Wait for the project to be created

### Step 2: Enable Google Drive API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on "Google Drive API"
4. Click the "ENABLE" button
5. Wait for the API to be enabled

### Step 3: Create an API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. A new API key will be created and displayed
4. Copy this API key (you can click the copy icon next to it)

### Step 4: Add API Key to .env File

1. Open `server/.env` in your text editor
2. Find the line: `GOOGLE_API_KEY=your_google_api_key_here`
3. Replace `your_google_api_key_here` with the API key you copied
4. Save the file

Example:
```
GOOGLE_API_KEY=AIzaSyDXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 5: Restart the Server

1. Stop your Node.js server (if it's running)
2. Start it again with `npm start` or `npm run dev`
3. The server will now be able to fetch videos from Google Drive folders

## Verifying the Setup

1. Start your development server
2. Navigate to the portfolio page
3. Click "Open Gallery" on the "Video Editing" card
4. The gallery should now load videos from the Google Drive folder

## Troubleshooting

### Error: "Google API key not configured"
- Make sure you've added the `GOOGLE_API_KEY` to your `.env` file
- Restart the server after adding the key
- Verify the key is not wrapped in quotes in the `.env` file

### Error: "Error fetching videos from Google Drive"
- Check that the Google Drive API is enabled in your Google Cloud project
- Verify the folder ID is correct: `1Brfmpms9-o2eaWAk224acWya1TLu-DA4`
- Make sure the videos in the folder are in MP4 or other common video formats

### Videos Not Loading
- Ensure the Google Drive folder is publicly shared (or shared with appropriate permissions)
- Check the browser console (F12) for more detailed error messages
- Verify that the API key has permissions to access Google Drive

## File Locations

- Server `.env` file: `server/.env`
- Backend endpoint: `GET /api/gallery/:folderId`
- Frontend component: `client/src/components/sections/Services.jsx`

## Security Notes

- Keep your API key private - don't commit it to version control
- The `.env` file is listed in `.gitignore` by default
- If the API key is exposed, you can revoke it in Google Cloud Console and create a new one

## Advanced Configuration

### Adding More Galleries

To add more video galleries, you can add more folders to the `galleryFolders` object in `Services.jsx`:

```javascript
const galleryFolders = {
  videoEditing: {
    title: 'Video Editing Gallery',
    folderId: '1Brfmpms9-o2eaWAk224acWya1TLu-DA4',
    videos: loadedVideos.videoEditing,
  },
  newGallery: {
    title: 'New Gallery Title',
    folderId: 'YOUR_FOLDER_ID_HERE',
    videos: loadedVideos.newGallery,
  },
};
```

### Caching

Videos are cached for 1 hour on the server to reduce API calls. To change the cache duration, edit `server/index.js`:

```javascript
const CACHE_TTL = 3600000; // 1 hour in milliseconds
```
