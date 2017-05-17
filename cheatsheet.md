# Cheatsheet Javascript Fundamentals

Building an object:
```js
function Banana(size) {
    this.Size = size;
    this.Pealed = false;
}
Banana.prototype.Peal = function() {
    this.Pealed = true;
}
```

Code isolation using closures:

```js
(function(){
    ... // All sorts of code
})();
```

Using closure to create a module:

```js
var FruitModule = (function(){
    ... // All sorts of code

    return {
        NewBanana: function(){ return new Banana(3); },
        NewApple: function(){ return new Apple(); }
    };
})();
```

Using jquery to bind events:

```js
// Used instead of closure to isolate code
$(document).ready(function(){
    ... // All sorts of code
});
// Bind to element click event, but there are more
$('.someClass').click(function(){
    ... // All sorts of code
});
```

Using jquery to get page values:

```js
    // Thes are a couple of ways, but there are more
    $('.someClass').val();
    $('p').html();
```

Using jquery to modify content:

```js
    // Thes are a couple of ways, but there are more
    $('.someClass').append('<div>element</div>');
    var paragraph = $('p').clone();
```

Asynchronous programming using promises:

```js
    var prom = $.Deferred();

    // Code to be executed after resolved promise
	prom.then(function(data){ $('.resultaat').html('Result: ' + data.value); });

    // Resolve after 3 seconds
    setTimeout(function(){ prom.resolve({ value: 'success' }); }, 3000);
```

Using local storage:
```js
	var rect = new Rectangle(4,5);
    // Store some typed object
	localStorage.setItem('rectangle', JSON.stringify(rect));
    // Retrieve object, note it is not a Rectangle any more.
    // It was parsed into an anonymous object
	var newrect = JSON.parse(localStorage.getItem('rectangle'));
```