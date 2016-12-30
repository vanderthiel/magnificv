$(document).ready(function(){
	// Isolate implementation in a module
	var MyModule = (function(){
		// Factory pattern: generate a new object on each call
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
		
		// Return an anonymous API object for this module,
		// and link it to isolated factories and implementations
		return {
			newRect: RectangleFactory
		};
	})();
	
	// Call the module's factory method
	var rect = MyModule.newRect(4, 5);
	console.log(rect.Area());
});