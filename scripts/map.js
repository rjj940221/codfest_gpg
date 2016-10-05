var incidents = [];
var crimes = null;
var marker_on = 0;
var map;
var url = "http://owen.exall.za.net/GPG/select_incidents.php";
$.getJSON(url, function(result) {
	$.each(result, function(i, field) {
		incidents.push(field);
	});
});


/*

Hotspot changes
Added map.setMapTypeId('satellite'); to Draw function
Set zoom to 15

*/


// Image used for crime pinpointing
var image = {
	url: 'svg/ic_danger_location_black_24px.svg',
	size: new google.maps.Size(40, 40),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(14, 40)
};

// Gradient for the heatmap
var grad_array = [
				 'rgba(0, 90, 0, 1)',
				 'rgba(0, 75, 0, 1)',
				 'rgba(0, 65, 0, 1)',
				 'rgba(0, 55, 0, 1)',
				 'rgba(85, 20, 21, 1)',
				 'rgba(191, 0, 31, 1)',
				 'rgba(255, 0, 0, 1)'
			 ];

//heatmap Data points defined as an array of LatLng objects
var heatmapData = [
  new google.maps.LatLng(-26.113027, 27.957837)
];

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData,
	gradient: grad_array,
	radius: 65
});


var my_location = new google.maps.LatLng(-26.114779, 27.952908);
var map_options = {
	mapTypeId: 'satellite',
	zoom: 13,
	center: my_location,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false
};

function init_map() {
	console.log("Opening map");
	//getInfo();
	navigator.geolocation.getCurrentPosition(on_success, on_error, {
		timeout: 1000});
}

function draw_map() {
	map = new google.maps.Map(document.getElementById("map"), map_options);
	//show_incidents(map);
	var my_marker = new google.maps.Marker({position: my_location, map: map});

}

function on_success(position){
	console.log("GPS activated sucessfully!");
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	my_location = new google.maps.LatLng(lat, lng);
	draw_map();
}

function on_error(error) {
	console.log("GPS activation failure!");
	draw_map();
}

function show_incidents(map) {
	console.log("Initiating incident loop");
	incidents.forEach(function(item) {
		console.log(item);
		var crimes = new google.maps.Marker({
			position: new google.maps.LatLng(item.latitude, item.longitude),
			map: map,
			icon: image,
			title: item.event,
			zIndex: parseInt(item.id)
		});
	});
}































/*
var heatmap;

var grad_array = [
				 'rgba(0, 255, 255, 0)',
				 'rgba(0, 255, 255, 1)',
				 'rgba(0, 191, 255, 1)',
				 'rgba(0, 127, 255, 1)',
				 'rgba(0, 63, 255, 1)',
				 'rgba(0, 0, 255, 1)',
				 'rgba(0, 0, 223, 1)',
				 'rgba(0, 0, 191, 1)',
				 'rgba(0, 0, 159, 1)',
				 'rgba(0, 0, 127, 1)',
				 'rgba(63, 0, 91, 1)',
				 'rgba(127, 0, 63, 1)',
				 'rgba(191, 0, 31, 1)',
				 'rgba(255, 0, 0, 1)'
			 ];



var incidents = [];
var url = "http://owen.exall.za.net/GPG/select_incidents.php";
$.getJSON(url, function(result) {
	$.each(result, function(i, field) {
		incidents.push(field);
	});
});
var my_location = new google.maps.LatLng(-26.114779, 27.952908);
var map_options = {
	zoom: 15,
	center: my_location,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false
};

function init_map() {
	console.log("Opening map");
	navigator.geolocation.getCurrentPosition(on_success, on_error, {
		timeout: 1000});
}

function draw_map() {

	//show_incidents(map);
	heatmap = new google.maps.visualization.HeatmapLayer({
	//data: new google.maps.LatLng(item.latitude, item.longitude),
	data: new google.maps.LatLng(-26.114779, 27.952908),
	radius: 50,
	opacity: 0.2,
//	gradient: grad_array,
});



	var map = new google.maps.Map(document.getElementById("map"), map_options);
var my_marker = new google.maps.Marker({position: my_location, map: map});
//heatmap.setMap(map);
map.setMapTypeId('satellite');
}

function on_success(position){
	console.log("GPS activated sucessfully!");
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	my_location = new google.maps.LatLng(lat, lng);
	draw_map();
}

function on_error(error) {
	console.log("GPS activation failure!");
	draw_map();
}


function show_incidents(map) {
	console.log("Initiating heatmap loop");

	console.log(incidents);
	console.log(incidents.length);
	incidents.forEach(function(item) {
		console.log(item);

		heatmap = new google.maps.visualization.HeatmapLayer({
  	//data: new google.maps.LatLng(item.latitude, item.longitude),
		data: new google.maps.LatLng(37.785, -122.435),
		radius: 50,
		opacity: 0.2,
		gradient: grad_array,
		map: map
		});
	});
}

*/
