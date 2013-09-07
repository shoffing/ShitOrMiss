$(function() {
	$("#submitButton").click(function() {
		// validate and process form here

		var name = $("#modal-name").val();
		if (name == "") {
			//$("label#name_error").show();
			//$("input#name").focus();
			return false;
		}
		
	/*	var email = $("input#email").val();
		if (email == "") {
			$("label#email_error").show();
			$("input#email").focus();
			return false;
		}
		
		var phone = $("input#phone").val();
		if (phone == "") {
			$("label#phone_error").show();
			$("input#phone").focus();
			return false;
		}
	*/
		
		  var dataString = 'name='+ name + '&email=' + email + '&phone=' + phone;

		$.ajax({
			type: "POST",
			url: "bin/process.php",
			data: dataString,
			success: function() {
				$('#contact_form').html("<div id='message'></div>");
				$('#message').html("<h2>Contact Form Submitted!</h2>")
					.append("<p>We will be in touch soon.</p>")
					.hide()
					.fadeIn(1500, function() {
				$('#message').append("<img id='checkmark' src='images/check.png' />");
					});
			}
		});

		return false;
	});
});
