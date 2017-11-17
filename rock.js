function Rock(descr){
  this.setup(descr);
  this.vel = 0;
}

Rock.prototype = new Entity();

Rock.prototype.type = 'rock';

Rock.prototype.render = function(ctx){
  g_sprites.rock.drawCentredAt(ctx,this.cx,this.cy);
}

Rock.prototype.update = function(du){

}
