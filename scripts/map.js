gpg.controller('map__', function($scope) {

    $scope.gimme_heat = function () {
        load_heatmap();
        heatmap.setMap(heatmap.getMap() ? null : map);
		if (heatmap.getMap() === null) {
			$("#heatmap").removeClass("md-accent");
		}
		else {
			$("#heatmap").addClass("md-accent");
		}
    };

    $scope.showme_saps = function () {
        console.log("Initiating saps loop");
        marker_saps = marker_saps ? 0 : 1;
        if (marker_saps === 1) {
            saps_db.forEach(function (item) {
                var saps = new google.maps.Marker({
                    position: new google.maps.LatLng(item.latitude, item.longitude),
                    map: map,
                    icon: "svg/ic_saps_black_40px.svg",
                    title: item.name,
                    zIndex: parseInt(item.id)
                });
                saps_mark.push(saps);
            });
			$("#saps").addClass("md-accent");
        }
        else {
            for (i = 0; i < saps_mark.length; i++) {
				saps_mark[i].setVisible(false);
			}
            $("#saps").removeClass("md-accent");
        }
    };

    $scope.showme_crimes = function () {
        console.log("Initiating incident loop");
        marker_incident = marker_incident ? 0 : 1;
        if (marker_incident === 1) {
            incidents_db.forEach(function (item) {
                var crimes = new google.maps.Marker({
                    position: new google.maps.LatLng(item.latitude, item.longitude),
                    map: map,
                    icon: image,
                    title: item.event,
                    zIndex: parseInt(item.id)
                });
                incident_mark.push(crimes);
            });
			$("#crimes").addClass("md-accent");
        }
        else {
            for (i = 0; i < incident_mark.length; i++) {
				incident_mark[i].setVisible(false);
			}
            $("#crimes").removeClass("md-accent");
        }

        $scope.logout = function () {
            delete $scope.user;
            delete $sessionStorage.user_id;
            delete $sessionStorage.user_name;
            delete $sessionStorage.rights;
        };

        $scope.register = function (ev) {
            $mdSidenav('account').close();
            console.log("Opening register_form");
            $mdDialog.show({
                controller: dialog__,
                locals: {job_id: undefined, user_id: undefined},
                templateUrl: "register_form.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true
            });
            console.log("test");
        };
        document.title = "Map";
    };
});

var incidents_db = [];
var incident_mark = [];
var saps_db = [];
var saps_mark  = [];
var heatmap_data = [];
var marker_incident = 0;
var marker_saps = 0;
var map;
var url_incident = "http://owen.exall.za.net/GPG/select_incidents.php";
$.getJSON(url_incident, function(result) {
	$.each(result, function(i, field) {
		incidents_db.push(field);
	});
});

var url_saps = "http://owen.exall.za.net/GPG/select_all_police_stations.php";
$.getJSON(url_saps, function(result) {
	$.each(result, function(i, field) {
		saps_db.push(field);
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
	incidents_db.forEach(function(item) {
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