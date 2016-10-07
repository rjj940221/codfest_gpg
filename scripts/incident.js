gpg.controller('incident__', function($scope) {
var marker = {};


    $scope.get_my_loc = function() {
        console.log("TTTT");
        navigator.geolocation.getCurrentPosition(push_coordinates, gps_error, {
            timeout: 5000
        });
    };

    function push_coordinates(position) {
        console.log("GPS coordinates fetched!");
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
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
