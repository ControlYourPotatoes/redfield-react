// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Ensure this port is free or change it as needed
// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(cors()); // This enables CORS for all routes

// Mock data for the sake of example
const hurricaneData = {
  id: "hurricane-2023",
  name: "maria path",
  path: [
    { lat: 15.3, lon: -61.3},
    { lat: 15.5, lon: -63.0 },
    { lat: 16.0, lon: -64.7 },
    { lat: 16.8, lon: -66.0 },
    { lat: 17.4, lon: -66.9 },
    { lat: 18.2, lon: -67.1 },
    { lat: 18.5, lon: -68.0 },
    // Add as many points as needed
  ]
};


// API endpoint for hurricane data
app.get('/api/hurricane', (req, res) => {
  res.json(hurricaneData);
});

// Root route serving a simple HTML page
app.get('/', (req, res) => {
    res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>H-Redfield</title>
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
    `);
  });

  // Start the server
app.listen(port, () => {
  console.log(`Hurricane API running at http://localhost:${port}`);
});
