# Tata Ibadah Workbench

Turns the Sunday order of service (Word, PDF or PowerPoint) into a slideshow you can check, present, or save.

**Open it:** https://yos2204.github.io/Weekly-tata-ibadah-powerpoint/

## Install on your phone
- **iPhone / iPad (Safari):** open the link → Share → **Add to Home Screen**.
- **Android (Chrome):** open the link → ⋮ → **Install app** (or **Add to Home screen**).

## When it opens
A pop-up asks how to get this Sunday's Tata Ibadah:
- **Find it automatically**: uses a file you shared to the app from WhatsApp (Android), your watched folder (Chrome/Edge on a computer), or searches Google Drive for the newest .pdf/.docx/.doc whose name matches the coming Sunday.
- **Choose the Tata Ibadah**: pick the file yourself.

Add `?full=1` to the link to skip the pop-up.

### Google Drive (one-time setup)
Google Drive search needs a Google OAuth client ID (Web application) with
JavaScript origin `https://yos2204.github.io` and redirect URIs
`https://yos2204.github.io/Weekly-tata-ibadah-powerpoint/` and `https://yos2204.github.io/butet/workbench/`.
Paste it in the pop-up, or put it in `GDRIVE_CLIENT_ID` in `index.html`.

## Files
- `index.html` – the whole app
- `manifest.webmanifest`, `sw.js`, `icon-*.png` – let it install and open offline as a phone app

## Updating
Replace `index.html` with the new version. If the installed app keeps showing the old one, close and reopen it once.
