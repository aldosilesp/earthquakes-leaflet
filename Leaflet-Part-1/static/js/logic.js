// create a Leaflet map centered on the USA
var map = L.map('map').setView([37.8, -96], 4);

// add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// fetch earthquake data and add markers to the map
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(url).then(function(data) {
    data.features.forEach(feature => {
      // extract earthquake properties
      var mag = feature.properties.mag;
      var depth = feature.geometry.coordinates[2];
      var place = feature.properties.place;
      var time = new Date(feature.properties.time).toLocaleString();

      // determine marker size based on earthquake magnitude
      var size;
      if (mag < 2) {
        size = 3;
      } else if (mag < 3) {
        size = 5;
      } else if (mag < 4) {
        size = 10;
      } else if (mag < 5) {
        size = 20;
      } else {
        size = 30;
      }

      // determine marker color based on earthquake depth
      var color;
      if (depth < 10) {
        color = '#A3F600'; // 
      } else if (depth < 30) {
        color = '#DCF401'; // 
      } else if (depth < 50) {
        color = '#F6DB11'; // 
      } else if (depth < 70) {
        color = '#FDB72A'; // 
      } else if (depth < 90) {
        color = '#FBA35D'; // 
      } else {
        color = '#FF5F65'; // 
      }

      //determine popups
      var popupContent = "<b>" + place + "</b><br>" +
                          "Magnitude: " + mag + "<br>" +
                          "Depth: " + depth + " km" + "<br>" +
                          "Time: " + time;
      var onEachFeature = function(feature, layer) {
        layer.bindPopup(popupContent);
      }

      // create marker and add to the map
      var marker = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: size,
        color: color,
        fillOpacity: 0.7
      }).addTo(map);

      marker.on('click', function() {
        marker.openPopup();
      });

      marker.on('mouseover', function() {
        marker.openPopup();
      });

      marker.on('mouseout', function() {
        marker.closePopup();
      });

      marker.bindPopup(popupContent);
    });
  });