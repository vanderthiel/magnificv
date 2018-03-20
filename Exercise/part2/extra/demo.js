$(document).ready(function(){
    // Defining the application logic
    function OpdrachtenRepository(){
        this.Data = [];
        this.Counter = 0;
    }
    OpdrachtenRepository.prototype.Add = function(opdracht){
        opdracht.Id = ++this.Counter;
        this.Data.push(opdracht);
    }
    OpdrachtenRepository.prototype.Delete = function(id){
        var idx = this.Data.findIndex(el => { return el.Id === id; });
        if(idx >= 0) {
            this.Data.splice(idx, 1);
            return true;
        }
        return false;
    }

    function Opdracht(klant, beschrijving, cijfer){
        this.Id = -1;
        this.Klant = klant;
        this.Beschrijving = beschrijving;
        this.Cijfer = cijfer;
    }

    function invullen(el, op) {
        el.find(".klant").text(op.Klant);
        el.find(".beschrijving").text(op.Beschrijving);
        el.find(".cijfer").text(op.Cijfer);
        el.attr('data-id', op.Id);
    }
    function reset() {
        $("#klant").val();
        $("#beschrijving").val();
        $("#cijfer").val();
    }

    // Initialize
    var repo = new OpdrachtenRepository();

    $('#save').click(function(){
        var newOpdracht = new Opdracht(
            $("#klant").val(),
            $("#beschrijving").val(),
            $("#cijfer").val()
        );
        repo.Add(newOpdracht);

        // And now update the page
        var element = $("#templates .opdracht").clone();
        invullen(element, newOpdracht);
        $("#resultaten").append(element);

        // And bind the delete button
        element.find(".delete").click(function(){
            var id = Number($(this).parent().attr('data-id'));
            if(repo.Delete(id)) {
                $(this).parent().remove();
            }
        });

        reset();
    });

    $('#reset').click(function(){
        reset();
    });
});
