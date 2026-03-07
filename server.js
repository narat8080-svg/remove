// This file exists to fix the Render deployment issue where the 
// Start Command is hardcoded to `node server.js` in the Render Dashboard.
// It simply delegates to the actual server file located in the backend folder.
import './backend/server.js';
