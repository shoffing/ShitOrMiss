var map;

function initialize() {
	var mapOptions = {
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	// Click and hold on map
	var mapsTimeoutId = 0;
	google.maps.event.addListener(map, 'mousedown', function(event) {
		mapsTimeoutId = setTimeout(function() {
			addNewBathroom(event.latLng);
		}, 500);
	});
	google.maps.event.addListener(map, 'mouseup', function(event) {
		clearTimeout(mapsTimeoutId);
	});
	google.maps.event.addListener(map, 'mouseout', function(event) {
		clearTimeout(mapsTimeoutId);
	});

	// Try HTML5 geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: 'Location found using HTML5.<br>'
			});

			map.setCenter(pos);
		}, function() {
			handleNoGeolocation(true);
		});
	} else {
		// Browser doesn't support Geolocation
		handleNoGeolocation(false);
	}
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

function addNewBathroom(location) {
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});

	map.panTo(location);
}