# Video Gallery Update - Complete Setup Guide

This guide explains all the changes made to implement dynamic video loading from Google Drive and how to get everything working.

## 🎯 What's New

✅ **Dynamic Video Loading**: Videos are now fetched from Google Drive instead of being hardcoded  
✅ **Video Editing Gallery**: All old hardcoded videos have been removed  
✅ **Two Setup Methods**: API-based or manual JSON-based configuration  
✅ **Fallback Support**: Works with or without Google Drive API configured  
✅ **Automatic Caching**: Reduces API calls and improves performance  

## 📁 Files Modified

### Backend
- `server/index.js` - Added Google Drive API endpoint
- `server/package.json` - Added googleapis dependency
- `server/.env` - Added GOOGLE_API_KEY placeholder
- `server/videos.json` - Manual video management (NEW)
- `server/extract-videos.js` - Video extraction utility (NEW)

### Frontend
- `client/src/components/sections/Services.jsx` - Updated to fetch videos from backend

### Documentation
- `GOOGLE_DRIVE_SETUP_GUIDE.md` - Full API setup instructions
- `QUICK_START_MANUAL_VIDEOS.md` - Quick manual setup guide
- `VIDEO_GALLERY_SETUP_README.md` - This file

## 🚀 Quick Start (Choose One Method)

### Option 1: Quick Manual Setup (Easiest - 5 minutes)

Perfect for testing or if you don't want to set up the Google API.

1. **Get video file IDs** from https://drive.google.com/drive/folders/1Brfmpms9-o2eaWAk224acWya1TLu-DA4
   - For each video, right-click → "Get link" 
   - Extract the ID from the URL

2. **Edit `server/videos.json`**:
```json
{
  "videoEditing": [
    {
      "id": "PASTE_YOUR_VIDEO_ID_HERE",
      "name": "Video Title",
      "category": "Video",
      "duration": "MM:SS",
      "description": "Your description"
    }
  ]
}
```

3. **Save and reload** - Videos appear immediately!

📖 See `QUICK_START_MANUAL_VIDEOS.md` for detailed instructions.

### Option 2: Full API Setup (Better - 15 minutes)

Automatic video syncing from Google Drive folder.

1. **Create Google Cloud Project** and get API Key
2. **Add to `server/.env`**:
   ```
   GOOGLE_API_KEY=YOUR_API_KEY_HERE
   ```

3. **Use extraction script** (optional):
   ```bash
   cd server
   node extract-videos.js 1Brfmpms9-o2eaWAk224acWya1TLu-DA4 videos.json
   ```

4. **Restart server** and videos load automatically

📖 See `GOOGLE_DRIVE_SETUP_GUIDE.md` for detailed instructions.

## 🔧 Installation & Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

The new `googleapis` package will be installed.

### 2. Configure Environment

Edit `server/.env`:

```env
# Existing config
MONGODB_URI=...
EMAIL_USER=...
EMAIL_PASS=...
PORT=5001

# New - Add this line (get key from Google Cloud Console)
GOOGLE_API_KEY=your_api_key_here
```

### 3. Start the Server

```bash
# Development
npm run dev

# Production
npm start
```

### 4. Test the Gallery

1. Open your portfolio
2. Scroll to "CORE SERVICES" section
3. Click "Open Gallery" on the Video Editing card
4. Videos should load from either the API or videos.json

## 🎬 How It Works

### Frontend Flow
1. User clicks "Open Gallery"
2. Request sent to `GET /api/gallery/:folderId`
3. Gallery opens and displays videos

### Backend Flow
1. **API Method** (if GOOGLE_API_KEY is set):
   - Uses Google Drive API to fetch videos from folder
   - Caches results for 1 hour
   - Filters for video files only

2. **Fallback Method** (if no API key):
   - Reads from `server/videos.json`
   - Returns manually configured videos

3. **Display**:
   - Videos play in fullscreen modal
   - Thumbnail gallery on the side
   - Full controls and descriptions

## 📊 API Endpoints

### Get Videos from Gallery

```
GET /api/gallery/:folderId

Response:
{
  "success": true,
  "videos": [
    {
      "id": "file_id",
      "name": "Video Title",
      "category": "Video",
      "duration": "3:45",
      "description": "Description"
    }
  ]
}
```

**Folder IDs:**
- Video Editing: `1Brfmpms9-o2eaWAk224acWya1TLu-DA4`
- Motion Graphics: `1K9kp8j7A9PI94ivUsdec86LpJJQ-sLxB`

## 🎨 UI/UX Preserved

All original design features are maintained:
- ✅ Modern dark UI with glassmorphism
- ✅ Smooth hover animations
- ✅ Responsive grid layout
- ✅ Fullscreen modal gallery
- ✅ Video thumbnail sidebar
- ✅ Loading spinners
- ✅ Gradient text and accents
- ✅ Mobile-friendly design

## 🔍 Troubleshooting

### Videos Not Loading

**Issue**: Gallery opens but shows "No videos found"

**Solutions**:
1. Check if `server/videos.json` has valid entries
2. Verify GOOGLE_API_KEY is set if using API
3. Check browser console (F12) for error messages
4. Restart the server after any changes

### "Google API not configured" Error

**Means**: GOOGLE_API_KEY is not set

**Fix**:
- Either set GOOGLE_API_KEY in `.env` (Google Drive API method)
- Or add videos to `server/videos.json` (manual method)

### Invalid API Key

**Means**: GOOGLE_API_KEY is wrong or expired

**Fix**:
1. Go to Google Cloud Console
2. Check your API key is valid
3. Ensure Google Drive API is enabled
4. Create a new API key if needed
5. Update `.env` with new key
6. Restart server

### Videos Not Updating

**Means**: Changes in videos.json aren't showing

**Solutions**:
1. Hard refresh browser (Ctrl+F5)
2. Check that videos.json is valid JSON
3. Restart the server
4. Cache expires after 1 hour

### Access Denied / Permission Error

**Means**: API key doesn't have permission

**Fix**:
1. Verify Google Drive API is enabled
2. Check folder ID is correct
3. Check API key has Drive API permissions
4. Create a new API key with correct permissions

## 📝 Configuration Files

### `server/.env`
Environment variables including GOOGLE_API_KEY

### `server/videos.json`
Manual video configuration - edit this to add/remove videos without API

### `server/extract-videos.js`
Utility script to extract videos from folder (requires API key)

### `client/src/components/sections/Services.jsx`
Frontend component that displays the gallery

## 🔐 Security Notes

- `.env` file is in `.gitignore` - keep it private
- Don't commit your API key to version control
- Regenerate API key if exposed
- The videos.json is local and not committed

## 📚 Additional Resources

- [Google Drive API Docs](https://developers.google.com/drive/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- See `GOOGLE_DRIVE_SETUP_GUIDE.md` for step-by-step API setup
- See `QUICK_START_MANUAL_VIDEOS.md` for manual setup

## ✨ Next Steps

1. Choose your setup method (Quick Manual or Full API)
2. Follow the corresponding guide
3. Test by clicking "Open Gallery"
4. Customize video titles and descriptions
5. Deploy with confidence!

## 💡 Tips

- Use the extraction script (`extract-videos.js`) for bulk imports
- Edit `videos.json` directly for quick changes
- Cache is automatically managed (1 hour TTL)
- No database changes needed - everything is file-based

---

**Need Help?**
- Check the relevant guide (`GOOGLE_DRIVE_SETUP_GUIDE.md` or `QUICK_START_MANUAL_VIDEOS.md`)
- Review error messages in browser console
- Check server logs for backend errors
- Verify all file paths and folder IDs
