$(document).ready(function(){
	function Tile(X, Y, targetX, targetY){
        this.xpos = X;
        this.ypos = Y;
        this.txpos = targetX;
        this.typos = targetY;
    }
    Tile.prototype.Move = function(x,y){
        this.xpos = x;
        this.ypos = y;
    }
    Tile.prototype.OnTarget = function(){
        // todo
    }

    function Board(W, H){
        // standard size: 480px
        this.tileWidth = 480 / W;
        this.tileHeight = 480 / H;

        this.Width = W;
        this.Height = H;
        this.tiles = [W*H];

        var arrayPos = 0;
        for(var y = 0; y < H; y++){
            for(var x = 0; x < W; x++){
                this.tiles[arrayPos++] = new Tile(x,y,W-1-x,H-1-y);
            }
        }
    }
    Board.prototype.Draw = function(){
        $('.canvas').empty();

        var ctr = 0;
        this.tiles.forEach(function(tile) {
            var temp = $('.templates .tile').clone();
            temp.html(tile.xpos + ',' + tile.ypos + '<br>' + tile.txpos + ',' + tile.typos);
            temp.attr('data-pos', ctr++);

            temp.css('top', tile.ypos * this.tileHeight);
            temp.css('left', tile.xpos * this.tileWidth);
            temp.css('height', this.tileHeight);
            temp.css('width', this.tileWidth);
            temp.css('background-position-y', -tile.typos * this.tileHeight);
            temp.css('background-position-x', -tile.txpos * this.tileWidth);

            var self = this;
            temp.click(function(){
                if(self.memTile instanceof Tile){
                    var toTile = self.tiles[$(this).attr('data-pos')]
                    // switch tiles
                    var tempx = toTile.xpos;
                    var tempy = toTile.ypos;

                    toTile.Move(self.memTile.xpos, self.memTile.ypos);
                    self.memTile.Move(tempx, tempy);

                    self.memTile = null;
                    self.Draw();
                } else {
                    self.memTile = self.tiles[$(this).attr('data-pos')];
                }
            });

            $('.canvas').append(temp);
        }, this);
    }

    var board = new Board(4,4);
    board.Draw();
});