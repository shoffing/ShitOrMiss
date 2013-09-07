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
				content: 'We think you\'re around here.'
			});

			var currentMarker = new google.maps.Marker({
				position: pos,
				map: map
			});
			
			var info = new google.maps.InfoWindow({
				content: 'testing messages'
			});
			
			//Create random points in these bounds
			var southWest = new google.maps.LatLng(39.954121 , -75.202505);
			var northEast = new google.maps.LatLng(39.955848 , -75.198385);

			var bounds = new google.maps.LatLngBounds(southWest, northEast);
			map.fitBounds(bounds);
			
			// var markerList = [];
			// markerList[0] = new google.maps.Marker({
				// position: (39.953841 , -75.198761)
			
			var lngSpan = northEast.lng() - southWest.lng();
			var latSpan = northEast.lat() - southWest.lat();

			for (var i = 0; i < 5; i++) {
				var position = new google.maps.LatLng(
					southWest.lat() + latSpan * Math.random(),
					southWest.lng() + lngSpan * Math.random());
				var marker = new google.maps.Marker({
				position: position,
				map: map
				});

				marker.setTitle((i + 1).toString());
				attachSecretMessage(marker, i);
			}
			
			google.maps.event.addListener(currentMarker, 'click', function () {
				info.open(currentMarker.get('map'), currentMarker);
				$("#btn-shit").removeAttr("disabled");
				$("#btn-miss").removeAttr("disabled");
			});

			google.maps.event.addListener(map, 'click', function () {
				$("#btn-shit").attr("disabled", "disabled");
				$("#btn-miss").attr("disabled", "disabled");
			});

			google.maps.event.addListener(map, 'drag', function () {
				$("#btn-shit").attr("disabled", "disabled");
				$("#btn-miss").attr("disabled", "disabled");

				clearTimeout(mapsTimeoutId);
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

	// store lat/long in form for sending to php
	
	$("#modal-latitude").val(location.lat());
	$("#modal-longitude").val(location.lng());

	// callbacks are for losers
	$("#modal-shit").css("background-color", "#DFF0D8");
	$("#modal-miss").css("background-color", "#F2DEDE");

	$("#addBathroomModal").modal('show');
}

function attachSecretMessage(marker, num) {
	var message = ['This', 'is', 'the', 'secret', 'message'];
	var info2 = new google.maps.InfoWindow({
		content: message[num]
	});

	google.maps.event.addListener(marker, 'click', function() {
		info2.open(marker.get('map'), marker);
	});
}
