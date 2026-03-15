const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8000;

const upload = multer({ 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// Middleware
app.use(express.json());
app.use(express.static('./')); // Serve static HTML files from root

// Ensure directories and files exist
if (!fs.existsSync('./images')) {
    fs.mkdirSync('./images');
}
if (!fs.existsSync('./data.json')) {
    fs.writeFileSync('./data.json', '{}');
}

// API: Save JSON
app.post('/api/save', (req, res) => {
    try {
        fs.writeFileSync('./data.json', JSON.stringify(req.body, null, 2));
        res.json({ status: 'success', message: 'Data saved to local data.json' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// API: Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    const originalName = fileNameSafe(req.file.originalname);
    const desiredName = fileNameSafe(req.body?.desiredName || '');
    const overwrite = String(req.body?.overwrite || '').toLowerCase() === '1' || String(req.body?.overwrite || '').toLowerCase() === 'true';
    const filename = desiredName || (Date.now() + '_' + originalName);
    const targetPath = path.join('./images/', filename);

    if (fs.existsSync(targetPath) && !overwrite) {
        return res.status(409).json({ status: 'error', message: 'File already exists', filename });
    }

    try {
        fs.writeFileSync(targetPath, req.file.buffer);
        const relativeUrl = './images/' + filename;
        res.json({ status: 'success', url: relativeUrl, filename, overwritten: overwrite && fs.existsSync(targetPath) });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// API: Delete Image
app.post('/api/delete_image', (req, res) => {
    const filename = fileNameSafe(req.body?.filename || '');
    if (!filename) {
        return res.status(400).json({ status: 'error', message: 'Filename is required' });
    }
    const targetPath = path.join('./images/', filename);
    if (!fs.existsSync(targetPath)) {
        return res.status(404).json({ status: 'error', message: 'File not found' });
    }
    try {
        fs.unlinkSync(targetPath);
        res.json({ status: 'success', filename });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// API: List Images
app.get('/api/list_images', (req, res) => {
    fs.readdir('./images/', (err, files) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        
        const images = files
            .filter(f => !f.startsWith('.'))
            .sort((a, b) => {
                return fs.statSync(`./images/${b}`).mtime.getTime() - fs.statSync(`./images/${a}`).mtime.getTime();
            })
            .map(f => `./images/${f}`);
            
        res.json({ status: 'success', images });
    });
});

app.listen(PORT, () => {
    console.log(`Local Admin Server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT}/admin.html to manage content.`);
});

function fileNameSafe(name) {
    return String(name || '')
        .trim()
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/^\.+/, '');
}
