function Pooka(descr){
  this.setup(descr);
  //this.randomisePosition();
  this.vel = 2;
};

Pooka.prototype = new Entity();

//Player.prototype.sprite = new Sprite(16,6,16,16,g_images.spriteSheet3);
Pooka.prototype.animCounter = 0;
Pooka.prototype.lastCx = this.cx;
Pooka.prototype.lastCy = this.cy;
Pooka.prototype.lastDirLeftRight; // Þarf mögulega að setja þannig að hann velji sér átt í byrjun eftir hvað er opið
Pooka.prototype.lastDirUpDown;  //  -- || --
// fyrir PickDirectionAndMove function
Pooka.prototype.oldCell;
Pooka.prototype.oldDirection = 2;

Pooka.prototype.MIN_Y = 42;
Pooka.prototype.MAX_Y = 492;
Pooka.prototype.MIN_X = 14; // ekki 0 til að sprite fari ekki út fyrir rammann
Pooka.prototype.MAX_X = 434;// 448 - 10 (kall er 32 px á breidd)

//Set default directions to left and Down
/*
Pooka.prototype.randomisePosition = function () {
    // Rock randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
};
*/



Pooka.prototype.update = function (du) {
  //this.PickDirectionAndMove();

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


/*
// Pooka: pick semi random direction
Pooka.prototype.PickDirectionAndMove = function(){
  // finna cell-u sem pooka er í
  var cell = grid.FindCell(this.cx, this.cy); // IMPLIMENTA DIRECTION OG X Y
  // ef hann er ennþá að hreyfast í sömu celluni -> halda áfram
  if(cell === oldCell){
    this.vel += oldDirection; // heldur áfram í sömu átt
    return;
  } else {// kominn í nýja cellu - finna allar opnar áttir -> velja random átt
    // ef tómur array -> fara í öfuga átt (semsgt:klessir á vegg)
    if (grid.dirDugArray === undefined || grid.dirDugArray.length == 0) {
       this.vel *= -oldDirection;
    }
    else
    {
        var size = grid.dirDugArray.length;
        var chooseDirection = grid.dirDugArray[util.getRandomInt(0, size)];
        this.Move(chooseDirection);
    }

  }
  oldCell = cell; // geyma til samanburðar
}


Pooka.prototype.Move = function(direction){
  var nextcy = this.cy;
  var nextcx = this.cx;

  if (direction === 'up') {
    this.lastDirUpDown = 'up';
    var canGo = util.checkUpDown(nextcx);
    if(canGo !== false){
      nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
      nextcy -= this.speed*du;
      currentDirection = 'up';
    } else{
      if(this.lastDirLeftRight === 'left'){
        nextcx -= this.speed*du;
      } else if (this.lastDirLeftRight === 'right') {
        nextcx += this.speed*du;
      }
      currentDirection = this.lastDirLeftRight;
    }
  } else

  if (direction === 'down' ) {
      this.lastDirUpDown = 'down';
      var canGo = util.checkUpDown(nextcx);
      if(canGo !== false){
        nextcx = canGo; // locks player in place on x axis (i.e. in tunnel)
        nextcy += this.speed*du;
        currentDirection = 'down';
      } else{
        if(this.lastDirLeftRight === 'left'){
          nextcx -= this.speed*du;
        } else if (this.lastDirLeftRight === 'right') {
          nextcx += this.speed*du;
        }
        currentDirection = this.lastDirLeftRight;
      }
  } else
  if (direction === 'left' ) {
      this.lastDirLeftRight = 'left';
      var canGo = util.checkLeftRight(nextcy);
      if(canGo !== false){
        nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
        nextcx -= this.speed*du;
        currentDirection = 'left';
      } else{
        if(this.lastDirUpDown === 'down'){
          nextcy += this.speed*du;
        } else if (this.lastDirUpDown === 'up') {
          nextcy -= this.speed*du;
        }
        currentDirection = this.lastDirUpDown;
      }
  } else
  if (direction === 'right' ) {
      this.lastDirLeftRight = 'right';
      var canGo = util.checkLeftRight(nextcy);
      if(canGo !== false){
        nextcy = canGo; // locks player in place on y axis (i.e. in tunnel)
        nextcx += this.speed*du;
        currentDirection = 'right';
      } else{
        if(this.lastDirUpDown === 'down'){
          nextcy += this.speed*du;
        } else if (this.lastDirUpDown === 'up') {
          nextcy -= this.speed*du;
        }
        // var lastDirLeftRight -- grunar að það sé rangt - breyti í lastDirUpDown
        currentDirection = this.lastDirUpDown;
      }
  }
  // don't go further than borders
  if(nextcy <= this.MAX_Y && nextcy >= this.MIN_Y){
    this.cy = nextcy;
  }
  if(nextcx <= this.MAX_X && nextcx >= this.MIN_X){
    this.cx = nextcx;
  }
}
*/
