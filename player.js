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

Player.prototype.MIN_Y = 50;
Player.prototype.MAX_Y = 512;
Player.prototype.MIN_X = 10; // ekki 0 til að sprite fari ekki út fyrir rammann
Player.prototype.MAX_X = 438;// 448 - 10 (kall er 32 px á breidd)


Player.prototype.UP = keyCode('W');
Player.prototype.LEFT = keyCode('A');
Player.prototype.RIGHT = keyCode('D');
Player.prototype.DOWN = keyCode('S');

Player.prototype.lastDirLeftRight = 'Left';  // player byrjar að stefna til vinstri
Player.prototype.lastDirUpDown = 'Down';  // player byrjar að stefna niður
Player.prototype.speed = 2;

Player.prototype.update = function (du) {
		var nextcy = this.cy;
    var nextcx = this.cx;

    if (keys[this.UP]) {
      this.lastDirUpDown = 'Up';
      var canGo = util.checkUpDown(nextcx);
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
    } else

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
    } else
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
    } else
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


var g_playerAnimCounter = 0; // counter fyrir animation
var lastCx = this.cx;
var lastCy = this.cy;

Player.prototype.render = function (ctx) {
  var newCx = this.cx;
  var newCy = this.cy;

  g_playerAnimCounter += 1;
  // check for reset of animCounter
  if(g_playerAnimCounter > 16) g_playerAnimCounter = 0;

  // walk right anim cycle
  if(lastCx < newCx){
    this.rightAnim(ctx);
  }
  // walk left anim cycle
  else if (lastCx > newCx) {
    this.leftAnim(ctx);
  }
  // walk up anim cycle
  else if (lastCy > newCy){
    this.upAnim(ctx);
  }
  // walk down anim cycle
  else if(lastCy < newCy){
    this.downAnim(ctx);
  } else {
    this.lastAnim(ctx);
  }


  //walk left anim cycle

  // stay still anim
  //g_sprites.playerWalk1.drawCentredAt(ctx,this.cx,this.cy);
  lastCx = newCx;
  lastCy = newCy;
};

var lastAnimation = 1;

Player.prototype.rightAnim = function (ctx){
  lastAnimation = 1;
  if(g_playerAnimCounter < 8){
    g_sprites.playerWalkRight1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkRight2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.leftAnim = function (ctx){
  lastAnimation = 2;
  if(g_playerAnimCounter < 8){
    g_sprites.playerWalkLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.upAnim = function (ctx){
  lastAnimation = 3;
  if(g_playerAnimCounter < 8){
    g_sprites.playerWalkUp1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkUp2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.downAnim = function (ctx){
  lastAnimation = 4;
  if(g_playerAnimCounter < 8){
    g_sprites.playerWalkDown1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkDown2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.lastAnim = function(ctx){
  if(lastAnimation === 1) g_sprites.playerWalkRight1.drawCentredAt(ctx,this.cx,this.cy);
  if(lastAnimation === 2) g_sprites.playerWalkLeft1.drawCentredAt(ctx,this.cx,this.cy);
  if(lastAnimation === 3) g_sprites.playerWalkUp1.drawCentredAt(ctx,this.cx,this.cy);
  if(lastAnimation === 4) g_sprites.playerWalkDown1.drawCentredAt(ctx,this.cx,this.cy);
}
