// server.js — Express entrypoint for Railway
// Wraps the existing Vercel-style handler in api/data.js (no logic changes needed —
// it already uses req.query / res.status().json(), which Express supports natively)
// and serves index.html as a static file.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const dataHandler = require('./api/data.js');

// Same route the frontend already calls: /api/data
app.get('/api/data', (req, res) => dataHandler(req, res));
app.options('/api/data', (req, res) => dataHandler(req, res));

// Serve the dashboard
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Spyne dashboard listening on port ${PORT}`);
});
