function Fygar(descr){
  this.setup(descr);
  this.randomisePosition();
  this.velX = 3;
};

Fygar.prototype = new Entity();

//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);

//Player.prototype.cx = 480;
//Player.prototype.cy = 480;


Fygar.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
};

Fygar.prototype.update = function (du) {


  if (this.cx > g_canvas.width || this.cx < 0) {
    this.velX = -this.velX;
  }

  this.cx += this.velX*du;

};

Fygar.prototype.render = function (ctx) {

  g_sprites.fygar.drawCentredAt(ctx,this.cx,this.cy);
};
