$(document).ready(function(){
	
	
	var MyModule = (function(){
		
		var RectangleFactory = function(x, y){
			var Rectangle = function(x, y){
				this.width = x;
				this.height = y;
				return this;
			}
			Rectangle.prototype.Area = function(){
				return this.width * this.height;
			}
			
			return new Rectangle(x, y);
		};
		
		
		return { layerx: { rect: RectangleFactory } };
	})();
	
	var any = MyModule.layerx.rect(4, 5);
	console.log(any.Area());
});