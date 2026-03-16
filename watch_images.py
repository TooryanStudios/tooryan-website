#!/usr/bin/env python3
"""
Watch images folder and auto-sync manifest.json on any changes.
Requires: pip install watchdog
"""

import os
import json
import time
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

IMAGES_DIR = Path(__file__).parent / 'images'
MANIFEST_FILE = IMAGES_DIR / 'manifest.json'
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'}

class ImageFolderHandler(FileSystemEventHandler):
    """Handler for image folder changes."""
    
    def __init__(self):
        self.last_sync = 0
        self.debounce_seconds = 1
    
    def should_sync(self, event):
        """Check if we should sync for this event."""
        if event.is_directory:
            return False
        
        path = Path(event.src_path)
        if path.name.startswith('.') or path.name == 'manifest.json':
            return False
        
        if path.suffix.lower() not in IMAGE_EXTENSIONS:
            return False
        
        # Debounce: don't sync more than once per second
        now = time.time()
        if now - self.last_sync < self.debounce_seconds:
            return False
        
        return True
    
    def sync_manifest(self):
        """Sync manifest.json with current folder contents."""
        try:
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
            
            images.sort(key=lambda x: x['mtime'], reverse=True)
            image_names = [img['name'] for img in images]
            
            with open(MANIFEST_FILE, 'w', encoding='utf-8') as f:
                json.dump(image_names, f, indent=2, ensure_ascii=False)
                f.write('\n')
            
            self.last_sync = time.time()
            print(f"✓ [{time.strftime('%H:%M:%S')}] Synced: {len(image_names)} images")
        except Exception as e:
            print(f"✗ Error syncing: {e}")
    
    def on_created(self, event):
        if self.should_sync(event):
            print(f"→ File added: {Path(event.src_path).name}")
            self.sync_manifest()
    
    def on_deleted(self, event):
        if self.should_sync(event):
            print(f"→ File deleted: {Path(event.src_path).name}")
            self.sync_manifest()
    
    def on_modified(self, event):
        if self.should_sync(event):
            print(f"→ File modified: {Path(event.src_path).name}")
            self.sync_manifest()

def main():
    print("Starting image folder watcher...")
    print(f"Watching: {IMAGES_DIR}")
    print("Press Ctrl+C to stop\n")
    
    event_handler = ImageFolderHandler()
    event_handler.sync_manifest()  # Initial sync
    
    observer = Observer()
    observer.schedule(event_handler, str(IMAGES_DIR), recursive=False)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n\nStopping watcher...")
    
    observer.join()

if __name__ == '__main__':
    main()
