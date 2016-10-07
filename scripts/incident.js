gpg.controller('incident__', function($http, $scope) {
var marker = {};

    $scope.submit = function () {
        console.log("submit incident");
        var incident = {
            insert: "yes",
            lat: $scope.latitude,
            long: $scope.longitude,
            desc: $scope.description
        };
        console.log(incident);
        var request = {
            method: 'POST',
            url: 'http://owen.exall.za.net/gpg/create_incident.php', //NOTICE NOTICE NOTICE NOTICE NOTICE NOTICE
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
            data: incident
        };
        $http(request).then(function successCallback(response) {
            if (response.data == "true")
                alert("Incident logged");
            else{
                console.log(response);
                alert("Failed to log Incident");
            }
        }, function errorCallback(response) {
            console.log("Error");
        });
    };


    $scope.get_my_loc = function() {
        console.log("TTTT");
        navigator.geolocation.getCurrentPosition(push_coordinates, gps_error, {
            timeout: 5000
        });
    };

    function push_coordinates(position) {
        console.log("GPS coordinates fetched!");
        var lat = position.coords.latitude;
        $scope.latitude = lat;
        var lng = position.coords.longitude;
        $scope.longitude = lng;
        var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();
        var latlng = {
            lat: lat,
            lng: lng
        };

        geocoder.geocode({
                'location': latlng
            },
            function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                            var marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });

                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        console.log($scope);
                        $scope.user = {};
                        $scope.user.address = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name;
                        $scope.user.address2 = results[0].address_components[2].long_name;
                        $scope.user.city = results[0].address_components[3].long_name;
                        $scope.user.postalCode = results[0].address_components[7].long_name;
                        $scope.$apply();
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        console.log(lat);
        console.log(lng);
    }

    function gps_error(error) {
        console.log("GPS failure!");
		var geocoder = new google.maps.Geocoder();
        var infowindow = new google.maps.InfoWindow();

        $scope.latitude = -26.1189003;
        $scope.longitude = 27.9513096;

        geocoder.geocode({
                'location': my_location
            },
            function(results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                            var marker = new google.maps.Marker({
                            position: my_location,
                            map: map
                        });

                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                        console.log($scope);
                        $scope.user = {};
                        $scope.user.address = results[0].address_components[0].long_name + " " + results[0].address_components[1].long_name;
                        $scope.user.address2 = results[0].address_components[2].long_name;
                        $scope.user.city = results[0].address_components[3].long_name;
                        $scope.user.postalCode = results[0].address_components[7].long_name;
                        $scope.$apply();
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
    }
});
