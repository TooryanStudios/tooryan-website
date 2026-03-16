#!/usr/bin/env python3
"""
Auto-sync manifest.json with images folder contents.
Run this script to keep manifest.json always up-to-date.
"""

import os
import json
from pathlib import Path
from datetime import datetime

# Configuration
IMAGES_DIR = Path(__file__).parent / 'images'
MANIFEST_FILE = IMAGES_DIR / 'manifest.json'
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'}

def get_image_files():
    """Get all image files from the images directory, sorted by modification time."""
    images = []
    
    for file_path in IMAGES_DIR.iterdir():
        if not file_path.is_file():
            continue
        if file_path.name.startswith('.') or file_path.name == 'manifest.json':
            continue
        if file_path.suffix.lower() in IMAGE_EXTENSIONS:
            images.append({
                'name': file_path.name,
                'mtime': file_path.stat().st_mtime
            })
    
    # Sort by modification time (newest first)
    images.sort(key=lambda x: x['mtime'], reverse=True)
    
    return [img['name'] for img in images]

def sync_manifest():
    """Sync manifest.json with current images folder contents."""
    try:
        image_files = get_image_files()
        
        # Write manifest.json
        with open(MANIFEST_FILE, 'w', encoding='utf-8') as f:
            json.dump(image_files, f, indent=2, ensure_ascii=False)
            f.write('\n')
        
        print(f"✓ Manifest synced: {len(image_files)} images")
        return True
    except Exception as e:
        print(f"✗ Error syncing manifest: {e}")
        return False

if __name__ == '__main__':
    print("Syncing manifest.json...")
    sync_manifest()
