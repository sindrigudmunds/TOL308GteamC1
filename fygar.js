//=======//
// FYGAR //
//=======//

function Fygar(descr){
  this.setup(descr);
  this.vel = 0.5;

};

Fygar.prototype = new Entity();

Fygar.prototype.type = 'fygar';
Fygar.prototype.animCounter = 0;
Fygar.prototype.lastCx = this.cx;
Fygar.prototype.lastCy = this.cy;
Fygar.prototype.gridX = Math.floor(this.cx / 32);
Fygar.prototype.gridY = Math.floor(this.cy / 32);
Fygar.prototype.yOffset = 12;
Fygar.prototype.direction = 'right';
Fygar.prototype.pathToPlayer = [];
Fygar.prototype.isMoving = true;

Fygar.prototype.GetNextDirection = function(){

  var currPosition = [Math.floor(this.cx/32), Math.floor(this.cy/32)];
  var path = findPath(grid.cells, currPosition, grid.playerPosition);
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

Fygar.prototype.update = function (du) {
  // if dead, quit the update immediately
  if (this._isDeadNow) {
    return;
  }
  var oldGridX = this.gridX;
  var oldGridY = this.gridY;

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

};

Fygar.prototype.rightAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarRight1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter >= 8
    g_sprites.fygarRight2.drawAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.leftAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter >= 8
    g_sprites.fygarLeft2.drawAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.upAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter >= 8
    g_sprites.fygarLeft2.drawAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.downAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter >= 8
    g_sprites.fygarLeft2.drawAt(ctx,this.cx,this.cy);
  }
}
