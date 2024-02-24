// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // This enables CORS for all routes
const port = 3001; // Ensure this port is free or change it as needed

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

app.get('/api/hurricane', (req, res) => {
  res.json(hurricaneData);
});

app.listen(port, () => {
  console.log(`Hurricane API running at http://localhost:${port}`);
});
