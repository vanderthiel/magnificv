/*
Schuifpuzzel

- vaste plaatjes kiezen uit collectie
- instellen aantal stukjes
- 1 zwart stukje, click to slide
- bijhouden high score - local storage

- bepalen wanneer klaar
- initialisatie
- timer laten lopen
- deadline?

Aanpak:
- plaatjes zoeken
1. plaatjes selector
2. opknippen, initialisatie van het bord
3. start spel, timer starten
4. X keer: schuiven, check of gewonnen
5. als gewonnen, timer stoppen
6. als high score, invullen (met naam) en opslaan
*/

$(document).ready(function() {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }

    function Puzzle(image, width, height) {
        this.Image = image;
        this.Width = width;
        this.Height = height;
        this.Elements = [];
    }
    Puzzle.prototype.Initialize = function(){
        var locations = [];
        
        // Create some locations
        for(var ctrh = 0; ctrh < this.Height; ctrh++) {
            for(var ctrw = 0; ctrw < this.Width; ctrw++) {
                locations.push(new Point(ctrw, ctrh));
            }
        }
        
        // Create the elements, init with random location
        var items = this.Width * this.Height;
        for(var ctrh = 0; ctrh < this.Height; ctrh++) {
            for(var ctrw = 0; ctrw < this.Width; ctrw++) {
                var item = Math.floor(Math.random() * items--);
                var loc = locations[item];
                locations.splice(item, 1);
                this.Elements.push(new Piece(
                    loc,
                    new Point(ctrw, ctrh),
                    new Point(500/this.Width, 500/this.Height),
                    this.Image,
                    false));
            }
        }

        var pos;
        this.Elements.forEach(element => {
            element.Draw(pos++);
        });
    };

    function Piece(location, destination, size, image, isBlack) {
        this.Location = location;
        this.Destination = destination;
        this.Size = size;
        this.Image = image;
        this.IsBlack = isBlack;
    }
    Piece.prototype.Draw = function(position){
        var domElement = $('<div class="piece"></div>');

        domElement.css('width', this.Size.X);
        domElement.css('height', this.Size.Y);
        domElement.css('top', this.Size.Y * this.Location.Y);
        domElement.css('left', this.Size.X * this.Location.X);

        domElement.css('background-image', "url('img/" + this.Image + "')");
        domElement.css('background-position-x', -this.Size.X * this.Destination.X);
        domElement.css('background-position-y', -this.Size.Y * this.Destination.Y);
        
        $("#puzzle").append(domElement);
    };

    // variables
    var puzzle;

    // Bind the events
    $("#start").click(function(){
        // Create new puzzle
        puzzle = new Puzzle(
            $("#image").val(),
            $("#dimx").val(),
            $("#dimy").val());
        // initialize puzzle
        puzzle.Initialize();

        // todo: start the timer
    });
});