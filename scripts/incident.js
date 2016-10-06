function push_coordinates(position){
	console.log("GPS coordinates fetched!");
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	//my_location = new google.maps.LatLng(lat, lng);
  console.log(lat);
  console.log(lng);
}

function gps_error(error){
  console.log("GPS failure!");
}
