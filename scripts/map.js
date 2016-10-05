gpg.controller('map__', function($scope) {
	document.title = "Map";
});

var incidents = [];
var url = "http://owen.exall.za.net/GPG/select_incidents.php";
$.getJSON(url, function(result) {
	$.each(result, function(i, field) {
		incidents.push(field);
	});
});

function init_map() {
	console.log("Opening map");
	// TODO: prompt the user to activate the gps on failure
	navigator.geolocation.getCurrentPosition(on_success, on_error, {
		timeout: 5000
	});
}

function on_success(position) {
	getInfo();
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	var my_location = new google.maps.LatLng(lat, lng);
	var map_options = {
		zoom: 13,
		center: my_location,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false
	};
	console.log(document.getElementById("map"));
	var map = new google.maps.Map(document.getElementById("map"), map_options);
	var my_marker = new google.maps.Marker({
		position: my_location,
		map: map
	});

	show_incidents(map);
}

function show_incidents(map) {


	// Origins, anchor positions and coordinates of the marker increase in the X
	// direction to the right and in the Y direction down.
	var image = {
		url: 'svg/ic_danger_location_black_24px.svg',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(40, 40),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(14, 40)
	};
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

function on_error(error) {
	document.addEventListener("deviceready", function() {
		cordova.dialogGPS("Your GPS is Disabled, please enable it to use this app.", //message
			"Activate location.", //description
			function(buttonIndex) { //callback
				switch (buttonIndex) {
					case 0:
						break; //cancel
					case 1:
						break; //Activate
				}
			},
			"Please Turn on GPS", //title
			["Cancel", "Activate"]); //buttons
	});
}


//		alert('code: ' + error.code + '\n' +
//				'message: ' + error.message + '\n');
//	}