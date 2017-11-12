

function Cell(xPos, yPos, cellX, cellY){
    // Hvað er búið að grafa mikið úr cellunni
    this.AmmountDug = {'left': 0,
                       'right': 0,
                       'up': 0,
                       'down': 0};

    // Var grafið upp eða til hliðar?
    this.DirectionDug = null;
    this.IsFullyDug = false;
    this.xPos = xPos;
    this.yPos = yPos;
    this.cellX = cellX; // cell nr x
    this.cellY = cellY; // cell nr Y
}

Cell.prototype.Dig = function(direction){
    if(this.IsFullyDug) return;
    this.AmmountDug++
    if(this.AmmountDug === 10){
        this.IsFullyDug = true;
    }
}


Cell.prototype.Render = function(ctx){
    // ef fyrstu tvær hæðir sleppa að render-a
    //if(this.yPos <= 64) return;  // Eiður; til minnis: ég er að nýtast við pixla stærð héra - jón notaði cellu númer (þ.e. 1)
    g_sprites.fullDugTunnel.drawCentredAt(ctx, this.xPos, this.yPos);




    var cellXRight = false;
    var cellXLeft = false;
    var cellYUp = false;
    var cellYDown = false;
    if(playerPosY < this.yPos + 32 ) cellXRight = true;
    if(playerPosY > this.yPos)       cellXLeft = true;
    if(playerPosX < this.xPos + 32 ) cellYUp = true;
    if(playerPosX > this.xPos)       cellYDown = true;

    if(cellXRight === true && cellXLeft === true){
      if(cellYUp === true && cellYDown === true){
        console.log("CellLeftRight: " + this.cellX + " -- CellUpDown: " + this.cellY);

        console.log("cell X pos: " + this.xPos);
        console.log("cell Y pos: " + this.yPos);
      }
    }
      if(cellYUp === true && cellYDown === true){
        console.log("WDDDDDD");
      }



    /*
    if((playerPosX < this.xPos + 32 && playerPosX > this.xPos)
      && (playerPosY < this.yPos + 32 && playerPosY > this.yPos) )
    { // if player is within the cell
      //console.log("posX: " + playerPosX + " -- posY: " + playerPosY);
      console.log("CellX: " + this.cellX +  " -- CellY: " + this.cellY);
    }
    */

    /*
    if(this.AmmountDug['left'] === 0 &&
        this.AmmountDug['right'] === 0 &&
        this.AmmountDug['up'] === 0 &&
        this.AmmountDug['down'] === 0) return;
    */


}

var playerPosX;
var playerPosY;
Cell.prototype.update = function(){
  playerPosX = entityManager._players[0].cx;
  playerPosY = entityManager._players[0].cy;
  //console.log("PlPosX: " + playerPosX + " -- PlPosY: " + playerPosX);
}


function Grid(xSize, ySize){
    // Fjöldi cella á x og y ás
    this.xSize = xSize;
    this.ySize = ySize;
    // Setjum upp tómt 2d fylki
    this.cells = [];
}

// Setur upp griddið í fyrsta sinn.
Grid.prototype.Initialize = function(){
    //var multiplierX = 1; // verður að byrja á 1 til að margfalda 32
    //var multiplierY = 1; //  -- || --
    var add = 32;
    var xPos = 0;
    var yPos = 0;
    for(var x = 0; x < this.xSize; x++){
        var column = [];
        for(var y = 0; y < this.ySize; y++){
            column.push(new Cell(xPos + 16, yPos + 16, x, y));
            yPos += add;
        }
        xPos +=add;
        yPos = 0; // byrjar á nýjum column
        this.cells.push(column);
    }

}

Grid.prototype.PlayerMoved = function(x, y, direction){
    // Finnna hvaða cellu við eigum að grafa
    var cell = FindCell(x, y);

    if(cell.IsFullyDug) return;

    cell.Dig(direction);
}

Grid.prototype.FindCell = function(x, y){

}

Grid.prototype.RenderGrid = function(ctx){
    for(var x = 0; x < this.xSize; x++){
        for(var y = 0; y < this.ySize; y++){
            this.cells[x][y].Render(ctx);
            this.cells[x][y].update();
        }
    }
}

// Prentar griddið
Grid.prototype.print = function(){
    console.log(this);
}
