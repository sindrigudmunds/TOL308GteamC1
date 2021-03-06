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

Player.prototype.MIN_Y = 42;
Player.prototype.MAX_Y = 492;
Player.prototype.MIN_X = 14; // ekki 0 til að sprite fari ekki út fyrir rammann
Player.prototype.MAX_X = 502;// 448 - 10 (kall er 32 px á breidd)


Player.prototype.UP = keyCode('W');
Player.prototype.LEFT = keyCode('A');
Player.prototype.RIGHT = keyCode('D');
Player.prototype.DOWN = keyCode('S');
Player.prototype.SHOOT = keyCode('M');

Player.prototype.lastDirLeftRight = 'Left';  // player byrjar að stefna til vinstri
Player.prototype.lastDirUpDown = 'Down';  // player byrjar að stefna niður
Player.prototype.speed = 2;
Player.prototype.lastAnimation = 1; // 1-4 eins og er - væri hægt að hafa 1-8
Player.prototype.animCounter = 0;
Player.prototype.shooting = false;
Player.prototype.shootCounter = 0;
Player.prototype.currentDirection = null;
Player.prototype.gunCoords = {};

Player.prototype.update = function (du) {
		var nextcy = this.cy;
    var nextcx = this.cx;
  //  var this.currentDirection = null;

    if (keys[this.SHOOT]) {
      this.shooting = true;
      this.shootCounter = 0;
      console.log("SHOOOT")
      if(this.shootCounter > 15){
        eatKey(keyCode('M'));
      }
    } else
    if (keys[this.UP]) {

      this.lastDirUpDown = 'up';
      var canGo = util.checkUpDown(nextcx);
      if(canGo !== false){
        nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
        nextcy -= this.speed*du;
        this.currentDirection = 'up';
      } else{
        if(this.lastDirLeftRight === 'left'){
          nextcx -= this.speed*du;
        } else if (this.lastDirLeftRight === 'right') {
          nextcx += this.speed*du;
        }
        this.currentDirection = this.lastDirLeftRight;
      }
    } else

    if (keys[this.DOWN]) {
        this.lastDirUpDown = 'down';
        var canGo = util.checkUpDown(nextcx);
        if(canGo !== false){
          nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
          nextcy += this.speed*du;
          this.currentDirection = 'down';
        } else{
          if(this.lastDirLeftRight === 'left'){
            nextcx -= this.speed*du;
          } else if (this.lastDirLeftRight === 'right') {
            nextcx += this.speed*du;
          }
          this.currentDirection = this.lastDirLeftRight;
        }
    } else
    if (keys[this.LEFT]) {
        this.lastDirLeftRight = 'left';
        var canGo = util.checkLeftRight(nextcy);
        if(canGo !== false){
          nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
          nextcx -= this.speed*du;
          this.currentDirection = 'left';
        } else{
          if(this.lastDirUpDown === 'down'){
            nextcy += this.speed*du;
          } else if (this.lastDirUpDown === 'up') {
            nextcy -= this.speed*du;
          }
          this.currentDirection = this.lastDirUpDown;
        }
    } else
    if (keys[this.RIGHT]) {
        this.lastDirLeftRight = 'right';
        var canGo = util.checkLeftRight(nextcy);
        if(canGo !== false){
          nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
          nextcx += this.speed*du;
          this.currentDirection = 'right';
        } else{
          if(this.lastDirUpDown === 'down'){
            nextcy += this.speed*du;
          } else if (this.lastDirUpDown === 'up') {
            nextcy -= this.speed*du;
          }
          // var lastDirLeftRight -- grunar að það sé rangt - breyti í lastDirUpDown
          this.currentDirection = this.lastDirUpDown;
        }
    }
    // notað í grid til að staðsetja hvaða cellu player er í
    if(this.cy !== nextcy || this.cx !== nextcx){
      grid.PlayerMoved(this.cx, this.cy, this.currentDirection);
    }
    // don't go further than borders
    if(nextcy <= this.MAX_Y && nextcy >= this.MIN_Y){
    	this.cy = nextcy;
    }
    if(nextcx <= this.MAX_X && nextcx >= this.MIN_X){
    	this.cx = nextcx;
    }
};

var g_playerLastCx = this.cx;
var g_playerLastCy = this.cy;

Player.prototype.render = function (ctx) {
  var newCx = this.cx;
  var newCy = this.cy;
  this.animCounter += 1;
  // check for reset of animCounter
  if(this.animCounter > 16) this.animCounter = 0;

  // walk right anim cycle
  if(this.shooting === true){
    this.shootingAnim2(ctx);
    this.shooting = false;

  } else
  if(g_playerLastCx < newCx){
    this.rightAnim(ctx);
  }
  // walk left anim cycle
  else if (g_playerLastCx > newCx) {
    this.leftAnim(ctx);
  }
  // walk up anim cycle
  else if (g_playerLastCy > newCy){
    this.upAnim(ctx);
  }
  // walk down anim cycle
  else if(g_playerLastCy < newCy){
    this.downAnim(ctx);
  } else {
    this.lastAnim(ctx);
  }

  g_playerLastCx = newCx;
  g_playerLastCy = newCy;
};

// g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);

Player.prototype.shootingAnim2 = function (ctx){
  var delta = 0;
  var frame;
  while(delta < 600){
    if(delta < 100) frame = 0;
    if(delta < 200) frame = 1;
    if(delta < 300) frame = 2;
    if(delta < 400) frame = 3;
    if(delta < 500) frame = 4;
    if(delta < 600) frame = 5;
    if(this.currentDirection === 'right' ){
      this.gunCoords = {x: this.cx+25, y: this.cy - 6, height: 32, width: 67};
      playerShootingArr[frame].drawCentredAt(ctx,this.cx+52,this.cy + 18 );
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.currentDirection === 'up' ){
      this.gunCoords = {x: this.cx - 18, y: this.cy - 80, height: 67, width: 32};
      playerShootingArr[frame +6].drawCentredAt(ctx,this.cx,this.cy - 44 );
      g_sprites.plArrowUpPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.currentDirection === 'left'){
      this.gunCoords = {x: this.cx-80, y: this.cy-6, height: 32, width: 67};
      playerShootingArr[frame +12].drawCentredAt(ctx,this.cx - 46,this.cy + 6 );
      g_sprites.plArrowLeftPl.drawCentredAt(ctx,this.cx,this.cy +6);
    }
    if(this.currentDirection === 'down'){
      this.gunCoords = {x: this.cx - 12, y: this.cy+25, height: 67, width: 32};
      playerShootingArr[frame +18].drawCentredAt(ctx,this.cx,this.cy + 62 );
      g_sprites.plArrowDownPl.drawCentredAt(ctx,this.cx,this.cy + 6);
    }
    //util.fillBox(ctx, this.gunCoords.x, this.gunCoords.y, this.gunCoords.width, this.gunCoords.height, 'black')
    delta +=1;
  }
}



Player.prototype.shootingAnim = function (ctx, direction){
  console.log(playerShootingArr[0]);
  if(this.shootCounter < 19){
    if(this.animCounter < 3){
      
      playerShootingArr[0].drawCentredAt(ctx,this.cx+50,this.cy + 20 );
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.animCounter < 6){
      
      g_sprites.plArrowRight2.drawCentredAt(ctx,this.cx+50,this.cy + 20);
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.animCounter < 9){
      g_sprites.plArrowRight3.drawCentredAt(ctx,this.cx+50,this.cy + 20);
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.animCounter < 12){
       g_sprites.plArrowRight4.drawCentredAt(ctx,this.cx+50,this.cy + 20);
       g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.animCounter < 15){
      g_sprites.plArrowRight5.drawCentredAt(ctx,this.cx+50,this.cy + 20);
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    if(this.animCounter < 18){
      g_sprites.plArrowRight6.drawCentredAt(ctx,this.cx+50,this.cy + 20);
      g_sprites.plArrowRightPl.drawCentredAt(ctx,this.cx,this.cy);
    }
    this.shooting = false;
    this.shootCounter += 1;
  }
}


Player.prototype.rightAnim = function (ctx){
  this.lastAnimation = 1;
  if(this.animCounter < 8){
    g_sprites.playerWalkRight1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkRight2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.leftAnim = function (ctx){
  this.lastAnimation = 2;
  if(this.animCounter < 8){
    g_sprites.playerWalkLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.upAnim = function (ctx){
  this.lastAnimation = 3;
  if(this.animCounter < 8){
    g_sprites.playerWalkUp1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkUp2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Player.prototype.downAnim = function (ctx){
  this.lastAnimation = 4;
  if(this.animCounter < 8){
    g_sprites.playerWalkDown1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.playerWalkDown2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

// For if player is standing still
Player.prototype.lastAnim = function(ctx){
  if(this.lastAnimation === 1) g_sprites.playerWalkRight1.drawCentredAt(ctx,this.cx,this.cy);
  if(this.lastAnimation === 2) g_sprites.playerWalkLeft1.drawCentredAt(ctx,this.cx,this.cy);
  if(this.lastAnimation === 3) g_sprites.playerWalkUp1.drawCentredAt(ctx,this.cx,this.cy);
  if(this.lastAnimation === 4) g_sprites.playerWalkDown1.drawCentredAt(ctx,this.cx,this.cy);
}
