$(document).ready(function(){
	function Rectangle(x,y){
		this.Width = x;
		this.Height = y;
		return this;
	}
	Rectangle.prototype.Surface = function(){
		return this.Width * this.Height;
	};
	
	// todo: do your thingy here
	
	var rect = new Rectangle(4,5);
	
	localStorage.setItem('rectangle', JSON.stringify(rect));
	
	var newrect = localStorage.getItem('rectangle');
	newrect = new Rectangle(newrect.Width, newrect.Height);
	
	if(newrect instanceof Rectangle){
		console.log('it was a rectangle, me');
	}
});