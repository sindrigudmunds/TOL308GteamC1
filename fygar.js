function Fygar(descr){
  this.setup(descr);
  this.randomisePosition();
  this.vel = 2;
};

Fygar.prototype = new Entity();

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
 
Fygar.prototype.GetDirectionToPlayer = function(){
  

};

Fygar.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = 64;
    this.cy = 64 + this.yOffset;
};

Fygar.prototype.update = function (du) {
  var oldGridX = this.gridX;
  var oldGridY = this.gridY;

  if (this.cx >= g_canvas.width || this.cx <= 0) {
    this.vel = -this.vel;
  }
  if (this.cy >= g_canvas.height || this.cy <= 0) {
    this.vel = -this.vel;
  }

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

  // Check if fygar has entered a new cell
  // then it will need to ask where to go next.
  var i = 0;
  if(this.gridX !== oldGridX || this.gridY !== oldGridY){
    this.direction = this.GetDirectionToPlayer();
  }
   // spruning að hafa * du

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
    g_sprites.fygarRight1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarRight2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.leftAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.upAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Fygar.prototype.downAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.fygarLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.fygarLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}
