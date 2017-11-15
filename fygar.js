function Fygar(descr){
  this.setup(descr);
  this.vel = 0.5;

};

Fygar.prototype = new Entity();

Fygar.prototype.type = 'fygar';
//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);
Fygar.prototype.animCounter = 0;
Fygar.prototype.lastCx = this.cx;
Fygar.prototype.lastCy = this.cy;
Fygar.prototype.gridX = Math.floor(this.cx / 32);
Fygar.prototype.gridY = Math.floor(this.cy / 32);
// Smá offset til að hann passi betur inn í göngin.
// Annars stendur hann alltaf smá uppúr.
Fygar.prototype.yOffset = 12;
//Player.prototype.cx = 480;
//Player.prototype.cy = 480;
Fygar.prototype.direction = 'right';
//Fygar.prototype.pathToPlayer = [];
Fygar.prototype.isMoving = true;
Fygar.prototype.lastDir = 'right';

Fygar.prototype.GetNextDirection = function(){

  var currPosition = [Math.floor(this.cx/32), Math.floor((this.cy+32)/32)];
  console.log("CURRPOS: " + currPosition);
  // spurning hvort ef currPossition er sama og síðasta að þá deyji handling
  if(currPosition === nextCoords ){
    console.log("CURRPOS === NEXTCOORDS");
  }

  var path = findPath(grid.cells, currPosition, grid.playerPosition);
  //var path = [[1, 2],[1, 3],[1, 4],[1, 5],]
  var pathRev = path.reverse();
  console.log("PathBeforePop: " + path);
  pathRev.pop();
  console.log("PathAfterPop: " + path);
  var nextCoords = pathRev.pop();
  console.log("NextCoords After pop: "+ nextCoords);
  if(!nextCoords){
    console.log('enemy has nowhere to go!');
    path = findPath(grid.cells, currPosition, grid.playerPosition);
    var nextCoords = pathRev.pop();
    //return;
  }

  var nextX = nextCoords[0];
  var nextY = nextCoords[1];
  //console.log("NextX: " + nextX + " -- NextY: " + nextY);

  if(nextX > this.gridX){
    this.lastdir = 'right';
    return 'right';
  }
  else if(nextX < this.gridX){
    this.lastdir = 'left';
    return 'left';
  }
  if(nextY > this.gridY){
    this.lastdir = 'down';
    return 'down';
  }
  else if(nextY < this.gridY){
    this.lastdir = 'up';
    return 'up';
  } else if(nextY ===this.gridY && nextX ===this.gridX){
    return this.lastdir;
  }
};

Fygar.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
};

Fygar.prototype.update = function (du) {
  var oldGridX = this.gridX;
  var oldGridY = this.gridY;


  //console.log(this.pathToPlayer);

  if (this.cx >= g_canvas.width-20 || this.cx <= -1) {
    this.vel = -this.vel;
  }
  if (this.cy >= g_canvas.height -32 || this.cy <= 30) {
    this.vel = -this.vel;
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


  // Check if fygar has entered a new cell
  // then it will need to ask where to go next.
  var i = 0;
  if(this.gridX !== oldGridX || this.gridY !== oldGridY){
     this.isMoving = false;
     this.direction = this.GetNextDirection();
     this.isMoving = true;
  }

};

Fygar.prototype.render = function (ctx) {
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

  //g_sprites.fygar.drawCentredAt(ctx,this.cx,this.cy);
};

Fygar.prototype.rightAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarRight1.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarRight2.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  }
}

Fygar.prototype.leftAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  }
}

Fygar.prototype.upAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  }
}

Fygar.prototype.downAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx + 16,this.cy + 16);
  }
}
