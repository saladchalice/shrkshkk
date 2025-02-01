// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13); // Change the coordinates and zoom level

// Add a tile layer (e.g., OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load GeoJSON data
fetch('lib/lnos_geojson.json')
  .then(response => response.json())
  .then(data => {
    // Add the GeoJSON data to the map
    L.geoJSON(data).addTo(map);
  })
  .catch(error => console.error('Error loading GeoJSON:', error));