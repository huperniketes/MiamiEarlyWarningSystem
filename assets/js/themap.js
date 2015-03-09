// var clientip = "127.0.0.1";
    latLng = [25.787778, -80.224167];  // Default to Hollywood, CA when no geolocation support
latLng = [34.0983425, -118.3267434];
    if (0)	// ( navigator.geolocation )
	{
        function success(pos) {
            // Location found, show map with these coordinates
            latLng = [pos.coords.latitude, pos.coords.longitude];
			map.setView(latLng, 13);
        }
        function fail(error) {
	console.log(error);
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    }
function onLocationFound(e) {
    meterRadius = e.accuracy / 2;
	latLng = [e.latitude, e.longitude];
console.log(latLng);
}

function onDrag(e) {
	var o = map.getCenter();
	latLng = [o.lat, o.lng];
	updateEvents();
}

$.get('https://seeclickfix.com/api/v2/issues?page=2&per_page=10', function (results) {
    // Do something with the returned issues objects
    for (var i = 0; i < results.issues.length; i++) { 
      var object = results.issues[i];

	  m = L.marker([object.lat, object.lng]).bindPopup(object.summary);
	  Markers.addLayer(m);
    }
});
// create a map in the "map" div, set the view to a given place and zoom
// var map = L.map('map').setView([51.505, -0.09], 13);
// var map = L.map('map').setView(latLng, 13);
var map = L.map('map').on('locationfound', onLocationFound).on('dragend', onDrag);

map.locate({ setView: true, maxZoom: 13 });

$('document').map = map;

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Markers = L.layerGroup().addTo(map); // for marker objects
// add a marker in the given location, attach some popup content to it and open the popup
// L.marker([51.5, -0.09]).addTo(map)
//    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
//    .openPopup();

function updateEvents()
{

var Warnings = Parse.Object.extend("TestObject");
var query = new Parse.Query(Warnings);
// query.equalTo("playerName", "Dan Stemkoski");
query.find({
  success: function(results) {
		Markers.clearLayers();
    console.log("Successfully retrieved " + results.length + " warnings.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      console.log(object.id + ' - ' + object.get('foo'));
	  if(object.has('location'))
	  {
	m = L.marker([object.get('location').latitude, object.get('location').longitude]).bindPopup(object.get('foo'));
	  Markers.addLayer(m);
			var keys = [];
			for(var k in object) keys.push(k);
			// console.log(keys);
	  }
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

}