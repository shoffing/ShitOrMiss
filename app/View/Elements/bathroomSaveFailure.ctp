<div id="error-alert" class="alert alert-error alert-dismissable" style="position:absolute; top: 0; left: 0; font-size: 24px; width: 100%; text-align: center;">Error.</div>


<div id="lastLatLong" style="display:none;"><?php echo h($message); ?></div>

<script>
	$("#error-alert").alert();
	$("#instr-alert").alert('close');
	setTimeout(function() {
		$("#error-alert").fadeOut(500, function() {
			$("#error-alert").alert('close');
		});
	}, 3000);
</script>
