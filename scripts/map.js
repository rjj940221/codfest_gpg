var incidents = [];
var heatmap_data = [];

var crimes = null;
var marker_on = 0;
var map;
var url = "http://owen.exall.za.net/GPG/select_incidents.php";
$.getJSON(url, function(result) {
	$.each(result, function(i, field) {
		incidents.push(field);
	});
});

// Image used for crime pinpointing
var image = {
	url: 'svg/ic_danger_location_black_24px.svg',
	size: new google.maps.Size(40, 40),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(14, 40)
};

// Gradient for the heatmap
var grad_array =
[	'rgba(0, 255, 255, 0)',
	'rgba(63, 0, 91, 1)',
	'rgba(127, 0, 63, 1)',
	'rgba(191, 0, 31, 1)',
	'rgba(255, 0, 0, 1)'];

//heatmap Data points defined as an array of LatLng objects
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmap_data,
	gradient: grad_array,
	radius: 35
});

function load_heatmap(map) {
	console.log("Loading heatmap");
	incidents.forEach(function(item) {
		console.log(item);
		heatmap_data.push(new google.maps.LatLng(item.latitude, item.longitude));
	});
}

var my_location = new google.maps.LatLng(-26.114779, 27.952908);
var map_options = {
	//mapTypeId: 'satellite',
	zoom: 15,
	center: my_location,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false
};

function load_heatmap(map) {
	console.log("Loading heatmap");
	incidents.forEach(function(item) {
		heatmap_data.push(new google.maps.LatLng(item.latitude, item.longitude));
	});
}

function init_map() {
	console.log("Opening map");
	console.log(heatmap_data);
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
		//console.log(item);
		var crimes = new google.maps.Marker({
			position: new google.maps.LatLng(item.latitude, item.longitude),
			map: map,
			icon: image,
			title: item.event,
			zIndex: parseInt(item.id)
		});
	});
}
