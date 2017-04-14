$(document).ready(function(){
	$('h2').click(function(){
		$(this).html('I was clicked');
		console.log('2. H1 clicked');
	});
	
	
	var x = 10;
	console.log('3. executed');
});


console.log('4. all script loaded');
