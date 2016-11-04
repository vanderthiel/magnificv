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
	
});