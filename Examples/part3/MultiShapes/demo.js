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
		
		var CircleFactory = function(x){
			var Circle = function(x){
				this.radius = x;
				return this;
			}
			Circle.prototype.Area = function(){
				return Math.pow(this.radius, 2) * Math.PI;
			}
			
			return new Circle(x);
		};
		
		var ShapeControllerFactory = function(shape){
			var Controller = function(shape){
				this.shape = shape;
				return this;
			}
			
			Controller.prototype.Surface = function(){
				return this.shape.Area();
			}
			
			return new Controller(shape);
		};
		
		return {
			shapes: {
				rect: RectangleFactory,
				cir: CircleFactory
			},
			controller: ShapeControllerFactory
		};
	})();
	
	$("#rect").click(function(){
		var rect = MyModule.shapes.rect($("#x").val(),$("#y").val());
		var controller = MyModule.controller(rect);
		console.log(controller.Surface());
	});
	$("#circle").click(function(){
		var circle = MyModule.shapes.cir($("#x").val());
		var controller = MyModule.controller(circle);
		console.log(controller.Surface());
	});
});