function Pooka(descr){
  this.setup(descr);
  this.randomisePosition();
  this.vel = 3;
};

Pooka.prototype = new Entity();

//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);

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

  this.cx += this.vel;

};

Pooka.prototype.render = function (ctx) {

  g_sprites.pooka.drawCentredAt(ctx,this.cx,this.cy);
};
