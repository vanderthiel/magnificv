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
	$('.resultaat').html('Waiting');

	myPromise.then(function(data){
		$('.resultaat').html(data.value);
	});

	$('.resultaat').html('Still Waiting');
});