function Pooka2(descr){
  this.setup(descr);
  this.vel = 0.5;

};

Pooka2.prototype = new Entity();

Pooka2.prototype.type = 'pooka';
//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);
Pooka2.prototype.animCounter = 0;
Pooka2.prototype.lastCx = this.cx;
Pooka2.prototype.lastCy = this.cy;
Pooka2.prototype.gridX = Math.floor(this.cx / 32);
Pooka2.prototype.gridY = Math.floor(this.cy / 32);
// Smá offset til að hann passi betur inn í göngin.
// Annars stendur hann alltaf smá uppúr.
Pooka2.prototype.yOffset = 12;
//Player.prototype.cx = 480;
//Player.prototype.cy = 480;
Pooka2.prototype.direction = 'right';
Pooka2.prototype.pathToPlayer = [];
Pooka2.prototype.isMoving = true;

Pooka2.prototype.GetNextDirection = function(){

  var currPosition = [Math.floor(this.cx/32), Math.floor(this.cy/32)];
  var path = findPath(grid.cells, currPosition, grid.playerPosition);
  //var path = [[1, 2],[1, 3],[1, 4],[1, 5],]
  path.reverse();
  path.pop();
  var nextCoords = path.pop();
  if(!nextCoords){
    console.log('enemy has nowhere to go!');
    return;
  }

  var nextX = nextCoords[0];
  var nextY = nextCoords[1];

  if(nextX > this.gridX){
    return 'right';
  }
  else if(nextX < this.gridX){
    return 'left';
  }
  if(nextY > this.gridY){
    return 'down';
  }
  else if(nextY < this.gridY){
    return 'up';
  }
};

Pooka2.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
};

Pooka2.prototype.update = function (du) {
  var oldGridX = this.gridX;
  var oldGridY = this.gridY;

  if (this._isDeadNow) {
    return;
  }

  //console.log(this.pathToPlayer);

  if (this.cx >= g_canvas.width-5 || this.cx <= 5) {
    //this.vel = -this.vel;
  }
  if (this.cy >= g_canvas.height || this.cy <= 0) {
    //this.vel = -this.vel;
  }

  if(this.isMoving){


    switch(this.direction){
      case 'left': this.cx -= this.vel * du;
        break;
      case 'right': this.cx += this.vel * du;
        break;
      case 'up': this.cy -= this.vel * du;
        break;
      case 'down': this.cy += this.vel * du;
        break;
    }

    this.gridX = Math.floor(this.cx / 32);
    this.gridY = Math.floor(this.cy / 32);
  }


  // Check if Pooka2 has entered a new cell
  // then it will need to ask where to go next.
  var i = 0;
  if(this.gridX !== oldGridX || this.gridY !== oldGridY){
     this.isMoving = false;
     this.direction = this.GetNextDirection();
     this.isMoving = true;
  }
   // spruning að hafa * du

};

Pooka2.prototype.render = function (ctx) {
  var newCx = this.cx;
  var newCy = this.cy;

  this.animCounter += 1;
  if(this.animCounter > 16) this.animCounter = 0;

  if(this.lastCx < newCx){
    this.rightAnim(ctx);
  }
  if(this.lastCx > newCx){
    this.leftAnim(ctx);
  }
  if(this.lastCy > newCy){
    this.downAnim(ctx);
  }
  if(this.lastCy < newCy){
    this.upAnim(ctx);
  }


  this.lastCx = newCx;
  this.lastCy = newCy;

  //g_sprites.pooka.drawCentredAt(ctx,this.cx,this.cy);
};

Pooka2.prototype.rightAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaRight1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaRight2.drawAt(ctx,this.cx,this.cy);
  }
}

Pooka2.prototype.leftAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaLeft2.drawAt(ctx,this.cx,this.cy);
  }
}

Pooka2.prototype.upAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaLeft2.drawAt(ctx,this.cx,this.cy);
  }
}

Pooka2.prototype.downAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaLeft2.drawAt(ctx,this.cx,this.cy);
  }
}
