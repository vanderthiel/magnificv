var PromModule = (function(){
	function Promise(){
		this.resolved = false;
	}
	Promise.prototype.then = function(onFulfilled, onRejected){
		this.res = onFulfilled;
		this.rej = onRejected;
		return this;
	};
	Promise.prototype.resolve = function(data){
		if(!this.resolved) {
			this.resolved = true;
			this.resultData = data;
			if(this.res != undefined){ this.res(this.resultData) }
		}
	};
	Promise.prototype.reject = function(){
		if(!this.resolved) {
			this.resolved = true;
			if(this.rej != undefined){ this.rej() }
		}
	};
	
	return {
		Deferred: function(){ return new Promise(); }
	};
})();

var myPromise = PromModule.Deferred();
myPromise.then(function(data){
	console.log('step 1: ' + data);
});
console.log('step 2');

myPromise.resolve('Yoo hoo');
console.log('step 3');
