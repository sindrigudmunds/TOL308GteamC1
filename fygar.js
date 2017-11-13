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

//Player.prototype.cx = 480;
//Player.prototype.cy = 480;

 
Fygar.prototype.getDirectionToPlayer = function(){
  
  var next = grid.GetNextEnemyPosition();
  var direction

};

Fygar.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
};

Fygar.prototype.update = function (du) {
  if (this.cx > g_canvas.width || this.cx < 0) {
    this.vel = -this.vel;
  }
  if (this.cy > g_canvas.height || this.cy < 0) {
    this.vel = -this.vel;
  }

  this.cx += this.vel * du; // spruning að hafa * du

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
