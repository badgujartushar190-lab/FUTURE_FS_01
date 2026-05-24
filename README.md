# ANTIGRAVITY Professional Portfolio

A high-end, futuristic portfolio website for video and photo editors.

## Tech Stack
- **Frontend**: React.js (Vite), Framer Motion, Lucide Icons, react-tsparticles
- **Backend**: Node.js, Express, Nodemailer
- **Database**: MongoDB

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd server
npm install
```
- Create a `.env` file in the `server` directory (one is provided as a template).
- Add your `MONGODB_URI`, `EMAIL_USER`, and `EMAIL_PASS` (Gmail App Password).
```bash
npm start
```

## Features
- **Glitch Text**: Futuristic "ANTIGRAVITY" animations.
- **Particle System**: Interactive floating background.
- **Portfolio Filter**: Category-based sorting for projects.
- **Hover Play**: Automatic video preview on thumbnail hover.
- **Contact Integration**: Saves messages to MongoDB and sends email alerts.

## Deployment
- **Frontend**: Best hosted on Vercel or Netlify.
- **Backend**: Host on Render, Railway, or Vercel (as Serverless Functions).
- **Database**: Use MongoDB Atlas (Free Tier).
