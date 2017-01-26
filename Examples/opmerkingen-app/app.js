$(document).ready(function(){

    // Storage object
    var Storage = function(){
        this.counter = localStorage.getItem('counter');
        if(!$.isNumeric(this.counter)){
            this.counter = 0;
            localStorage.setItem('counter', 0);
        }
    };
    Storage.prototype.listOpmerkingen = function(){
        var result = [];
        for(var i = 1; i <= this.counter; i++){
            result.push(localStorage.getItem('opmerking.' + i));
        }
        return result;
    };
    Storage.prototype.slaOpmerkingOp = function(opmerking){
        this.counter++;
        localStorage.setItem('opmerking.' + this.counter, opmerking);
        localStorage.setItem('counter', this.counter);
    };


// localStorage.setItem(key, value);
// localStorage.getItem(key);
// localStorage.removeItem(key);

// JSON.parse(string);
// JSON.stringify(object);
    

    // View object
    var View = function(){
        // lege constructor, hoeft niets te weten
    };
    View.prototype.getOpmerking = function(){
        return $('#opmerking').val();
    };
    View.prototype.clearOpmerking = function(){
        $('#opmerking').val('');
    };
    View.prototype.plaatsOpmerking = function(opmerking){
        $('.opmerking.empty').hide();

        var clone = $('#templates > .opmerking').clone();
        clone.html(opmerking);
        $('#overzicht').append(clone);
    };

    // Controller object
    var Controller = function(view, storage){
        this.view = view;
        this.storage = storage;
    };
    Controller.prototype.vastleggen = function(){
        this.storage.slaOpmerkingOp(this.view.getOpmerking());
        this.view.plaatsOpmerking(this.view.getOpmerking());
        this.view.clearOpmerking();
    };
    Controller.prototype.laden = function(){
        var items = this.storage.listOpmerkingen();
        for(ctr in items){
            this.view.plaatsOpmerking(items[ctr]);
        }
    };

    // Initialisatie
    var controller = new Controller(new View(), new Storage());
    controller.laden();

    // Wanneer de vastleggen knop geklikt wordt
    $('#vastleggen').click(function(){
        controller.vastleggen();
    });
    // Ook vastleggen bij keypress
    $('#opmerking').keypress(function( event ){
        if(event.which == 13){
            controller.vastleggen();
        }
    });

});