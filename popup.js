$(document).ready(function(){
//open popup
	$("#overlay_form").hide();
	$("#pop").click(function(){
		$("#overlay_form").slideToggle();
	});
	$("#close").click(function() {
		$("#overlay_form").slideUp();
	});

});