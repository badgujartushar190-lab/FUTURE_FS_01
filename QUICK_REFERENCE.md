# 🚀 QUICK START - 5 MINUTE SETUP

Choose ONE method below and follow the steps.

---

## ⚡ METHOD 1: Manual Setup (Easiest - 5 min)

### Step 1: Get Video IDs
1. Open: https://drive.google.com/drive/folders/1Brfmpms9-o2eaWAk224acWya1TLu-DA4
2. Right-click each video → "Get link"
3. Copy the ID from the URL (after `id=`)

### Step 2: Add to videos.json
1. Open `server/videos.json`
2. Replace placeholder IDs with real ones:
```json
{
  "videoEditing": [
    {
      "id": "1J7Z3Zk6YEr7Q8ZlVv9tGxqE0b1c2D3fH",
      "name": "My Video",
      "category": "Demo",
      "duration": "3:45",
      "description": "Description here"
    }
  ]
}
```
3. Save file

### Step 3: Done!
- Refresh portfolio page
- Click "Open Gallery"
- Videos appear! 🎉

---

## 🔑 METHOD 2: Full API Setup (Better - 15 min)

### Step 1: Get API Key (5 min)
1. Go to https://console.cloud.google.com/
2. Create new project
3. Search for "Google Drive API" → Enable
4. Go to Credentials → Create API Key
5. Copy the key

### Step 2: Configure Server (2 min)
1. Edit `server/.env`
2. Add: `GOOGLE_API_KEY=YOUR_KEY_HERE`
3. Save

### Step 3: Install & Run (3 min)
```bash
cd server
npm install
npm run dev
```

### Step 4: Test (optional)
- Run extraction script:
```bash
node extract-videos.js 1Brfmpms9-o2eaWAk224acWya1TLu-DA4 videos.json
```

### Step 5: Done!
- Videos auto-load from folder 🎉

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Videos not showing | Check `server/videos.json` has valid IDs |
| "API not configured" | Either add GOOGLE_API_KEY or use videos.json |
| "Access Denied" | Verify API key in .env (no quotes) |
| Server won't start | Run `npm install` in server directory |
| Port in use | Change `PORT=5001` in server/.env |

---

## 📞 Files to Know

- `server/.env` - Configuration
- `server/videos.json` - Video data
- `server/index.js` - Backend API
- `client/src/components/sections/Services.jsx` - Frontend

---

## 🎬 Testing

1. Open http://localhost:5173
2. Scroll to "CORE SERVICES"
3. Click "Open Gallery" on Video Editing
4. Videos should load!

---

## 📚 Need More Help?

- Full setup: See `GOOGLE_DRIVE_SETUP_GUIDE.md`
- Manual method: See `QUICK_START_MANUAL_VIDEOS.md`
- Overview: See `VIDEO_GALLERY_SETUP_README.md`

---

**You got this! 💪**
