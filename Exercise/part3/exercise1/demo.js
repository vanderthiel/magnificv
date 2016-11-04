$(document).ready(function(){
	// todo: do your things here
	function Rectangle(x,y){
		this.Width = x;
		this.Height = y;
		return this;
	}
	Rectangle.prototype.Surface = function(){
		return this.Width * this.Height;
	};
});