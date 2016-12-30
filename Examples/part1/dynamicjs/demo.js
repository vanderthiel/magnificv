// Basic variables, dynamic typing
var x = 1;
console.log(x);

x = 'one';
console.log(x);

// Use as either property or associative array
x = {
	one: 'param',
	two: 'two'
	};
console.log(x.one);
console.log(x['one']);
console.log(x['two']);

// Use as both array and object
x = [1,2,3];
x.one = 5;
console.log(x.one);
console.log(x[1]);
console.log(x[2]);

// Add function to object that is also array
x.three = function(){return 90; };
console.log(x.three());

// Or create typed object
function Rectangle(x,y){
	this.Width = x;
	this.Height = y;
	return this;
}
Rectangle.prototype.Surface = function(){
	return this.Width * this.Height;
};

x = new Rectangle(3,4);
console.log(x.Width);
console.log(x.Height);
console.log(x.Surface());
