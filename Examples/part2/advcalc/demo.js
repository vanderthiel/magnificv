$(document).ready(function(){
	function Calc(){
		this.Result = '0';
		this.Memory = '0';
		this.Operator = '';
	}
	Calc.prototype.GetResult = function(){ return this.Result; };
	Calc.prototype.NumButton = function(num){ this.Memory += num; };
	Calc.prototype.OpButton = function(operator){
		this.Flush();
		this.Operator = operator;
	};
	Calc.prototype.Flush = function(){
		if(this.Operator.length) {
			this.Result = eval(this.Result + this.Operator + this.Memory);
			this.Memory = '0';
			this.Operator = '';
		} else {
			this.Result = this.Memory;
			this.Memory = '0';
		}
	 };


	var mycalculator = new Calc();

	$(".calculator .num.button").click(function(){
		mycalculator.NumButton($(this).text());
		console.log(mycalculator.Result + ' ' + mycalculator.Operator + ' ' + mycalculator.Memory);
	});

	$(".calculator .op.button").click(function(){
		if($(this).text() === 'C') mycalculator = new Calc();
		else if($(this).text() === '=') mycalculator.Flush();
		else { mycalculator.OpButton($(this).text()); }

		$("#result").val(mycalculator.GetResult());
	});
});
