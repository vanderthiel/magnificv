$(document).ready(function(){
	$('#bereken').mouseenter(function(){
		$('#result').html($('#sideX').val() * $('#sideY').val());
		$('#result').show();
	});
	$('#bereken').mouseleave(function(){
		$('#result').html('');
		$('#result').hide();
	});
});