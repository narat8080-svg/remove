import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Set up static folder for serving uploaded files (images and APKs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the compiled Vite React frontend
app.use(express.static(path.join(__dirname, '../dist')));

// Ensure upload directories exist
const uploadDirs = [path.join(__dirname, 'uploads/photos'), path.join(__dirname, 'uploads/apks')];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'photo') {
            cb(null, path.join(__dirname, 'uploads/photos/'));
        } else if (file.fieldname === 'apk') {
            cb(null, path.join(__dirname, 'uploads/apks/'));
        } else {
            cb(new Error('Invalid fieldname'), '');
        }
    },
    filename: function (req, file, cb) {
        // Create unique filenames avoiding collisions but keeping extensions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 * 1024 // 500MB max limit to match frontend specs 
    }
});


// --- Mock Database (for when MySQL is not available yet) ---
// Using an array to emulate rows before setting up full SQL
let mockDatabaseTable = [
    { id: 1, name: '8 Ball Pool MVP', version: 'v5.12.2', status: 'Active', downloads: '45.2K', date: '2 hours ago', photo: null, apk: null },
    { id: 2, name: 'Subway Surfers Max', version: 'v3.18.0', status: 'Active', downloads: '12.8K', date: '5 hours ago', photo: null, apk: null },
    { id: 3, name: 'Clash of Clans TX', version: 'v15.83.6', status: 'Needs Update', downloads: '89.1K', date: '1 day ago', photo: null, apk: null }
];


// --- API Endpoints ---

// 1. Get all mods
app.get('/api/mods', (req, res) => {
    res.json(mockDatabaseTable);
});

// 2. Upload and Create new Mod
app.post('/api/mods', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'apk', maxCount: 1 }
]), (req, res) => {

    try {
        const { name, version, status } = req.body;

        // Grab paths of uploaded files if they exist
        const photoPath = req.files && req.files['photo'] ? `http://localhost:5000/uploads/photos/${req.files['photo'][0].filename}` : null;
        const apkPath = req.files && req.files['apk'] ? `http://localhost:5000/uploads/apks/${req.files['apk'][0].filename}` : null;

        const newMod = {
            id: Date.now(), // Create a unique ID
            name: name,
            version: version || '1.0.0',
            status: status || 'Active',
            downloads: '0 DLs',
            date: 'Just now',
            photo: photoPath,
            apk: apkPath
        };

        // Save to Database
        mockDatabaseTable.unshift(newMod); // Prepend so it's first

        console.log("New Mod Created:", newMod);

        res.status(201).json({
            message: 'Mod uploaded successfully',
            mod: newMod
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: 'Failed to upload mod. Make sure all fields are correct.' });
    }
});

// 3. Delete a mod
app.delete('/api/mods/:id', (req, res) => {
    const { id } = req.params;

    // In a real app we would want to also fs.unlinkSync the photo and apk files connected to the mod id to clear storage space.

    mockDatabaseTable = mockDatabaseTable.filter(mod => mod.id.toString() !== id);
    res.json({ message: 'Mod deleted successfully' });
});

// 4. Catch-all route to serve the React frontend for client-side routing
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`Ensure 'uploads/' directory has right write permissions if deploying.`);
});
