# Fraud-Shield Extension

Browser extension for quick fraud detection of SMS texts using the Fraud-Shield backend.

## 🚀 Features
- Paste SMS into popup and check instantly.
- Connects to Fraud-Shield backend (`/fraud-check` API).
- Optional content script for auto-scanning on selected sites.

## 🛠 Setup
1. Clone this repo.
2. Run your Fraud-Shield backend (`npm start` in backend repo).
3. Open `chrome://extensions/` → Enable Developer Mode → Load unpacked → Select this folder.
4. Click extension icon, paste SMS, and hit **Check**.

## 📦 Packaging
- For Chrome Web Store: Zip the folder and upload.
- For Firefox: Use `about:debugging` → Load Temporary Add-on.

## ⚠️ Notes
- Do **not** embed API keys here — all sensitive logic must stay in the backend.
- Update `manifest.json` `host_permissions` and `popup.js` backend URL for production deployment.
