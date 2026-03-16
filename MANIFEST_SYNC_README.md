# Manifest Sync Scripts

These scripts automatically sync `images/manifest.json` with the actual contents of the `images/` folder.

## Quick Start

### Option 1: One-Time Sync (Simplest)

**Python:**
```bash
python sync_manifest.py
```

**PowerShell:**
```powershell
.\sync-manifest.ps1
```

### Option 2: Auto-Watch (Continuous)

Install Python watchdog first:
```bash
pip install watchdog
```

Then run the watcher:
```bash
python watch_images.py
```

This will continuously monitor the images folder and auto-update manifest.json whenever files are added, deleted, or modified.

## When to Use

### Use one-time sync when:
- You manually uploaded images to the folder
- You want to verify manifest is current
- Running as part of a deployment script

### Use auto-watch when:
- Actively working on the site locally
- Frequently adding/removing images
- Want real-time manifest updates

## Integration Options

### 1. Git Pre-Commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/sh
python sync_manifest.py
git add images/manifest.json
```

### 2. npm/package.json Script
Add to `package.json`:
```json
{
  "scripts": {
    "sync-manifest": "python sync_manifest.py",
    "watch-images": "python watch_images.py"
  }
}
```

### 3. Windows Task Scheduler
Schedule `sync-manifest.ps1` to run periodically.

### 4. GitHub Actions
Already handled by the server.js auto-sync on API requests.

## How It Works

All scripts:
1. Scan the `images/` folder for valid image files
2. Filter by extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.avif`
3. Exclude hidden files (starting with `.`) and `manifest.json` itself
4. Sort by modification time (newest first)
5. Write to `images/manifest.json` as JSON array

## Current Server Behavior

The Node.js server (`server.js`) already auto-syncs manifest.json:
- On server startup
- After each upload via API
- After each delete via API
- **On every `/api/list_images` request** (ensures always current)

These scripts are useful for:
- Manual file uploads outside the admin panel
- Batch operations
- Development workflows
- Backup/verification
