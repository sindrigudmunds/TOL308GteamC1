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
Player.prototype.MAX_X = 438;// 448 - 10 (kall er 32 px á breidd)


Player.prototype.UP = keyCode('W');
Player.prototype.LEFT = keyCode('A');
Player.prototype.RIGHT = keyCode('D');
Player.prototype.DOWN = keyCode('S');

Player.prototype.lastDirLeftRight = 'Left';  // player byrjar að stefna til vinstri
Player.prototype.lastDirUpDown = 'Down';  
Player.prototype.speed = 2;

Player.prototype.update = function (du) {
		var nextcy = this.cy;
    var nextcx = this.cx;

    if (keys[this.UP]) {
      this.lastDirUpDown = 'Up';
      var canGo = util.checkUpDown(nextcx);
      console.log("chkUpDwn return value: " + canGo);
      if(canGo !== false){
        nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
        nextcy -= this.speed*du;
      } else{
        if(this.lastDirLeftRight === 'Left'){
          nextcx -= this.speed*du;
        } else if (this.lastDirLeftRight === 'Right') {
          nextcx += this.speed*du;
        }
      }
    }

    if (keys[this.DOWN]) {
        this.lastDirUpDown = 'Down';
        var canGo = util.checkUpDown(nextcx);
        if(canGo !== false){
          nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
          nextcy += this.speed*du;
        } else{
          if(this.lastDirLeftRight === 'Left'){
            nextcx -= this.speed*du;
          } else if (this.lastDirLeftRight === 'Right') {
            nextcx += this.speed*du;
          }
        }
    }
    if (keys[this.LEFT]) {
        this.lastDirLeftRight = 'Left';
        var canGo = util.checkLeftRight(nextcy);
        if(canGo !== false){
          nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
          nextcx -= this.speed*du;
        } else{
          if(this.lastDirUpDown === 'Down'){
            nextcy += this.speed*du;
          } else if (this.lastDirUpDown === 'Up') {
            nextcy -= this.speed*du;
          }
        }
    }
    if (keys[this.RIGHT]) {
        this.lastDirLeftRight = 'Right';
        var canGo = util.checkLeftRight(nextcy);
        if(canGo !== false){
          nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
          nextcx += this.speed*du;
        } else{
          if(this.lastDirUpDown === 'Down'){
            nextcy += this.speed*du;
          } else if (this.lastDirUpDown === 'Up') {
            nextcy -= this.speed*du;
          }
        }


        //nextcx += 3*du;
    }

    // don't go further than borders
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
