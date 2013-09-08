$(function() {
	$("#submitButton").click(function() {
		// validate and process form here

		var name = $("#modal-name").val();
		if (name == "") {
			//$("label#name_error").show();
			//$("input#name").focus();
			return false;
		}
		
		var shitOrMiss = $("#modal-rating").val();
		var latitude = $("#modal-latitude").val();
		var longitude = $("#modal-longitude").val();
		
		var dataString = "name=" + name + "&shit_or_miss" + shitOrMiss + "&lat" + latitude + "&long" + longitude;
 	
		console.log(dataString);
		$.ajax({
			type: "POST",
			url: "bathrooms/upload",
			data: dataString,
			success: function() {
				$('#success-alert').alert();
				setTimeout(function() {
					$("#success-alert").fadeOut(500, function() {
						$("#success-alert").alert('close');
					});
				}, 3000);
			}

		});

		$('#addBathroomModal').modal('hide');
		return false;
	});
});
