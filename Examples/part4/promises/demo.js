$(document).ready(function(){
	// todo: do your things here
	
	function GetPromise(){
		var prom = $.Deferred();

		setTimeout(function(){
			prom.resolve({ value: 'success' });
		}, 3000);

		return prom;
	}

	var myPromise = GetPromise();
	$('.resultaat').html('Got promise');

	myPromise.then(function(data){
		$('.resultaat').html('Result: ' + data.value);
	});

	$('.resultaat').html('Still Waiting');
});