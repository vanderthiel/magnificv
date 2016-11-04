$(document).ready(function(){
	$('h2').click(function(){
		$(this).html('I was clicked');
		console.log('4. H1 clicked');
	});
	
	
	var x = 10;
	console.log('2. executed');
});


console.log('3. all script loaded');
