# Real Estate Dates — Setup Guide

## BEFORE YOU START: Check you have Node.js

Open your terminal and run:
```bash
node --version
```

If you see a version number (like `v20.x.x`), you're good!  
If you get "command not found", install Node.js first: https://nodejs.org (download the LTS version)

---

## Step-by-Step Setup

### 1. Extract the ZIP file

Double-click `real-estate-dates.zip` to extract it. You should see a folder called `app`.

### 2. Open terminal in the `app` folder

**Mac:** Right-click the `app` folder → Services → New Terminal at Folder  
**Windows:** Right-click the `app` folder → Open in Terminal  
**Or:** Open terminal and type `cd ` then drag the `app` folder into terminal and press Enter

### 3. Install dependencies (ONE TIME ONLY)

```bash
npm install
```

Wait for this to finish. It downloads all the libraries the website needs.

### 4. Start the development server

```bash
npm run dev
```

After a few seconds, you'll see something like:
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help
```

### 5. Open in browser

Click the `http://localhost:5173/` link or copy-paste it into your browser.

**DO NOT** open the `index.html` file directly — it won't work! You must use the dev server URL.

---

## Build for Production (when ready to deploy)

```bash
npm run build
```

This creates a `dist/` folder with the production-ready website. You can upload the contents of `dist/` to any web host.

---

## Common Problems

### "npm: command not found"
→ Install Node.js: https://nodejs.org

### "Cannot find module"
→ Run `npm install` again

### Blank white page
→ Make sure you're opening `http://localhost:5173/` NOT the `index.html` file directly

### Images not showing
→ Make sure the `public/assets/` folder exists with the image files

---

## To Push to GitHub

```bash
cd app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/real-estate-dates.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.
