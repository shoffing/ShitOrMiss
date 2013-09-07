var map;
var markerList = [];

function initialize() {
	var mapOptions = {
		zoom: 15,
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
			
			
			google.maps.event.addListener(currentMarker, 'click', function () {
				info.open(currentMarker.get('map'), currentMarker);
				$("#btn-shit").removeAttr("disabled");
				$("#btn-miss").removeAttr("disabled");
			});
			
			google.maps.event.addListener(marker, 'click', function () {
				info.open(marker.get('map'), marker);
				$("#btn-shit").removeAttr("disabled");
				$("#btn-miss").removeAttr("disabled");
			});
			

			google.maps.event.addListener(map, 'click', function () {
				$("#btn-shit").attr("disabled", "disabled");
				$("#btn-miss").attr("disabled", "disabled");
				info.close();
				for(var f = 0; f > markerList.length; f++)
					info2.close();
				
			});
	
			google.maps.event.addListener(map, 'drag', function () {
				$("#btn-shit").attr("disabled", "disabled");
				$("#btn-miss").attr("disabled", "disabled");
				info.close();
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
	
				//Create random points in these bounds
			var southWest = new google.maps.LatLng(39.951431 , -75.192313);
			var northEast = new google.maps.LatLng(39.952599 , -75.190027);

			var bounds = new google.maps.LatLngBounds(southWest, northEast);
			map.fitBounds(bounds);
			
			
			// markerList[0] = new google.maps.Marker({
				// position: (39.953841 , -75.198761)
			
			var lngSpan = northEast.lng() - southWest.lng();
			var latSpan = northEast.lat() - southWest.lat();

			for (var i = 0; i < 5; i++) {
				var ranpos = new google.maps.LatLng(
					southWest.lat() + latSpan * Math.random(),
					southWest.lng() + lngSpan * Math.random());
				var marker = new google.maps.Marker({
				position: ranpos,
				map: map
				});
				
				markerList.push(marker);
				marker.setTitle((i + 1).toString());
				attachPopup(marker, i);
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

function attachPopup(marker, num) {
	var message = ['This', 'is', 'the', 'secret', 'message'];
	var info2 = new google.maps.InfoWindow({
		content: message[num]
	});

	google.maps.event.addListener(marker, 'click', function() {
		info2.open(marker.get('map'), marker);
		$("#btn-shit").removeAttr("disabled");
		$("#btn-miss").removeAttr("disabled");
		
	});
	

}

google.maps.event.addDomListener(window, 'load', initialize);
