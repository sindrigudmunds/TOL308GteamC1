function Pooka(descr){
  this.setup(descr);
  this.randomisePosition();
  this.vel = 2;
};

Pooka.prototype = new Entity();

//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);
Pooka.prototype.animCounter = 0;
Pooka.prototype.lastCx = this.cx;
Pooka.prototype.lastCy = this.cy;
Pooka.prototype.type = 'pooka';


//Set default directions to left and Down

Pooka.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
};



Pooka.prototype.update = function (du) {

  if (this.cx > g_canvas.width || this.cx < 0) {
    this.vel = -this.vel;
  }
  if (this.cy > g_canvas.height || this.cy < 0) {
    this.vel = -this.vel;
  }

  this.cx += this.vel *du;

};


Pooka.prototype.render = function (ctx) {
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

  //g_sprites.pookaRight1.drawCentredAt(ctx,this.cx,this.cy);

  this.lastCx = newCx;
  this.lastCy = newCy;
};


Pooka.prototype.rightAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaRight1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaRight2.drawCentredAt(ctx,this.cx,this.cy);
  }
}

Pooka.prototype.leftAnim = function (ctx){
  if(this.animCounter < 8){
    g_sprites.pookaLeft1.drawCentredAt(ctx,this.cx,this.cy);
  } else { // if playerAnimCounter > 8
    g_sprites.pookaLeft2.drawCentredAt(ctx,this.cx,this.cy);
  }
}
