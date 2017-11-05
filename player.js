//========
// PLAYER
//========


function Player(descr){
  this.setup(descr);

};

Player.prototype = new Entity();

//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);

//Player.prototype.cx = 480;
//Player.prototype.cy = 480;

Player.prototype.MIN_Y = 0;
Player.prototype.MAX_Y = 960;
Player.prototype.MIN_X = 0;
Player.prototype.MAX_X = 960;

Player.prototype.UP = keyCode('W');
Player.prototype.LEFT = keyCode('A');
Player.prototype.RIGHT = keyCode('D');
Player.prototype.DOWN = keyCode('S');


Player.prototype.update = function (du) {
		var nextcy = this.cy;
    var nextcx = this.cx;

    if (keys[this.UP]) {
        nextcy -= 10*du;
    }
    if (keys[this.DOWN]) {
        nextcy += 10*du;
    }
    if (keys[this.LEFT]) {
        nextcx -= 10*du;
    }
    if (keys[this.RIGHT]) {
        nextcx += 10*du;
    }
    if(nextcy <= this.MAX_Y && nextcy >= this.MIN_Y){
    	this.cy = nextcy;
    }

    if(nextcx <= this.MAX_X && nextcx >= this.MIN_X){
    	this.cx = nextcx;
    }



};

Player.prototype.render = function (ctx) {

  g_sprites.player.drawCentredAt(ctx,this.cx,this.cy);
};
