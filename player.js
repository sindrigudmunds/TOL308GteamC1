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

Player.prototype.MIN_Y = 200;
Player.prototype.MAX_Y = 1726;
Player.prototype.MIN_X = 10; // ekki 0 til að sprite fari ekki út fyrir rammann
Player.prototype.MAX_X = 438;// 448 - 10 (er 32 px á breidd)


Player.prototype.UP = keyCode('W');
Player.prototype.LEFT = keyCode('A');
Player.prototype.RIGHT = keyCode('D');
Player.prototype.DOWN = keyCode('S');


Player.prototype.update = function (du) {
		var nextcy = this.cy;
    var nextcx = this.cx;

    if (keys[this.UP]) {
        nextcy -= 4*du;
    }
    if (keys[this.DOWN]) {
        nextcy += 4*du;
    }
    if (keys[this.LEFT]) {
        nextcx -= 4*du;
    }
    if (keys[this.RIGHT]) {
        nextcx += 4*du;
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
