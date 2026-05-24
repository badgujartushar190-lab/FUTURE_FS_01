# Quick Start Guide - Manual Video Setup

If you don't want to set up the Google Drive API yet, you can quickly add videos to your gallery by manually adding their file IDs.

## How to Get Video File IDs from Google Drive

### Method 1: From the URL (Easiest)

1. Open your Google Drive folder: https://drive.google.com/drive/folders/1Brfmpms9-o2eaWAk224acWya1TLu-DA4
2. For each video you want to add:
   - Right-click on the video
   - Click "Get link"
   - Copy the link (it will look like: `https://drive.google.com/open?id=1J7Z3Zk6YEr7Q8ZlVv9tGxqE0b1c2D3fH`)
   - Extract the ID (the part after `id=`)

### Method 2: Using Shared Link

1. Right-click on a video in the folder
2. Click "Share"
3. The link will contain the file ID
4. Extract the ID from the URL

## How to Add Videos to Your Gallery

1. Open `server/videos.json` in your text editor
2. Replace the placeholder IDs with actual video file IDs
3. Update the video names and descriptions
4. Save the file

### Example:
```json
{
  "videoEditing": [
    {
      "id": "1J7Z3Zk6YEr7Q8ZlVv9tGxqE0b1c2D3fH",
      "name": "My First Video",
      "category": "Tutorial",
      "duration": "3:45",
      "description": "A great video tutorial"
    },
    {
      "id": "1N8vB9jQwP4RzH0LsY6Tg3eF4a0Mn1x2V",
      "name": "My Second Video",
      "category": "Demo",
      "duration": "2:30",
      "description": "Product demonstration"
    }
  ]
}
```

## Verifying Your Setup

1. Save the `server/videos.json` file
2. No need to restart the server - changes take effect immediately
3. Refresh your portfolio page
4. Click "Open Gallery" on the Video Editing card
5. Your videos should now appear

## Adding More Videos

Simply add more objects to the `videoEditing` array in `videos.json`:

```json
{
  "id": "VIDEO_FILE_ID_HERE",
  "name": "Video Title",
  "category": "Category Name",
  "duration": "MM:SS",
  "description": "Video description"
}
```

## Formatting Guidelines

- **id**: The Google Drive file ID (required)
- **name**: Title of your video (max 50 characters recommended)
- **category**: Type/category (e.g., "Tutorial", "Demo", "Commercial")
- **duration**: Length in MM:SS format
- **description**: Brief description (max 150 characters)

## Using API Later

Once you have videos working with the manual method, you can set up the Google Drive API for automatic syncing:
- See `GOOGLE_DRIVE_SETUP_GUIDE.md` for detailed instructions
- With the API configured, videos will automatically sync from your Google Drive folder

## Troubleshooting

### Videos Not Showing
- Double-check the file IDs are correct (no spaces or typos)
- Ensure the JSON format is valid (use a JSON validator if needed)
- Make sure you're not replacing the entire template - keep the JSON structure

### Invalid JSON Error
- Use a JSON validator to check your syntax
- Make sure commas are in the right places
- Double-check that quotes are matching

### Wrong URL Format
- File ID should be approximately 28 characters long
- Should not include hyphens at the end
- Example: `1J7Z3Zk6YEr7Q8ZlVv9tGxqE0b1c2D3fH`
