$.get("/api.geotest/", (data) => {
	console.log(data);

	//pulls data and long and address
	var latLong = [data[0].latitude, data[0].longitude];
	//Need to replace setView to lat/long in database
	var mymap = L.map('mapid').setView(latLong, 13);

	//Mapbox API key + access token
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 16,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiYWFydml6dTI5IiwiYSI6ImNrMXZtbWdhbjBpdG4zYnA1NGZ2eXpmZ2oifQ.nD8_Rft10MhlpJqZjnNYDw'
	}).addTo(mymap);

	//Add Scale to Map
	L.control.scale().addTo(mymap);

	//Add Pin to Map, replace marker with lat/long in database
	L.marker(latLong).bindPopup(address).addTo(mymap);

	//Add Circle with 1000 meters from middle point
	L.circle(latLong, { radius: 1000 }).addTo(mymap);

	//Add a circle around irvine
	var circleIrvine = L.circle([33.6405, 117.8443], {
		color: 'blue',
		fillColor: '#7FFF00',
		fillOpacity: 0.5,
		radius: 500
	}).addTo(mymap)
})
// console.log(process.env);