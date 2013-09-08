<div id="success-alert" class="alert alert-success alert-dismissable" style="position:absolute; top: 0; left: 0; font-size: 24px; width: 100%; text-align: center;">Success.</div>

<div id="lastLatLong" style="display:none;"><?php echo h($message); ?></div>

<script>
	$("#success-alert").alert();
	$("#instr-alert").alert('close');
	setTimeout(function() {
		$("#success-alert").fadeOut(500, function() {
			$("#success-alert").alert('close');
		});
	}, 3000);
</script>
