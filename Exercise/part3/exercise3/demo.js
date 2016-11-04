$(document).ready(function(){
	var GeometryModule = (function(){
		function Rectangle(x,y){
			this.Width = x;
			this.Height = y;
			return this;
		}
		Rectangle.prototype.Surface = function(){
			return this.Width * this.Height;
		};
		
		return {
			rectangle: Rectangle
		};
	})();
	
	
	
	
	$("#bereken").click(function(){
		console.log($('input[name=shape]:checked').val());
	});
});