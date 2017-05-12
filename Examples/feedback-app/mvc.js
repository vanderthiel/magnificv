var FeedbackModule = (function(){
    // de view
    function View(){ }
    View.prototype.SetStars = function(cijfer){
        $(".star").css("background-color", "white");

        for(var i = 1; i <= cijfer; i++){
            $(".star[data-value = " + i + "]").css("background-color", "yellow");
        }
    }
    View.prototype.GetForm = function(rating){
        return {
            naam: $("#naam").val(),
            rating: rating,
            omschrijving: $("#terugkoppeling").val()
        };
    }
    View.prototype.AddResult = function(item){
        $("#resultaten").append("<div>" + "<div>" + item.naam + "</div>" + "<div>" + item.rating + "</div>" + "<div>" + item.omschrijving + "</div>" + "</div>");
    }

    function Service(){ }
    Service.prototype.Create = function(item){
        var prom = $.Deferred();

		setTimeout(function(){
			prom.resolve(item);
		}, 300);

		return prom;

    }

    function HomeController(view, service){
        this.view = view;
        this.service = service;
        this.rating = 0;
    }
    HomeController.prototype.Rate = function(cijfer){
        this.rating = cijfer;
        this.view.SetStars(cijfer);
    };
    HomeController.prototype.Save = function(){
        var result = this.view.GetForm(this.rating);

        var self = this;
        this.service.Create(result).then(
            function(item){ self.view.AddResult(item); }
        );
    }

    return {
        newView: function(){ return new View(); },
        newService: function(){ return new Service(); },
        newHomeController: function(v,s){ return new HomeController(v,s); }
    };
})();