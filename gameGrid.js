function Cell(x, y, size){
    // Hvað er búið að grafa mikið úr cellunni
    // út hvorri átt.
    this.AmmountDug = {'left': 0,
                       'right': 0,
                       'up': 0,
                       'down': 0};

    //this.IsFullyDug = false;
//---------------------------------------------
  // í staðin fyrir this.IsFullyDug
    // prufa að bæta við úr hvaða áttum fullyDug
    this.dugLeftFully = false;
    this.dugRightFully = false;
    this.dugUpFully = false;
    this.dugDownFully = false;
    this.pointsGivem = false;

    //this.fullyDug = {'horizontal': false,
    //                 'vertical': false}
 // ---------------------------------

    this.x = x;
    this.y = y;
    this.size = size;

    this.currentDigDirection = null;
}

Cell.prototype.IsDug = function(direction){
  // kóði fyrir neðan er tilrun til að láta enemy fara eingöngu í gegnum göng
  // en hann framkallar bögg - þessvegan bara alltaf true
  // -- þ.e. að allar cellur eru álitnar opnar - svipað og þegar kallarnir
  // eru draugar í original Dig Dug
    return true;
    /*
    if(direction === 'd') return this.dugDownFully;
    if(direction === 'u') return this.dugUpFully;
    if(direction === 'l') return this.dugLeftFully;
    if(direction === 'r') return this.dugRightFully;
    */
    //return false;

    /*
    if(direction === 'vertical'){
        return this.dugDownFully || this.dugUpFully;
    } else {
        return this.dugLeftFully || this.dugRightFully
    }
    */
}

Cell.prototype.Dig = function(direction){
    this.currentDigDirection = direction;
    this.AmmountDug[direction]++
    if(!this.pointsGiven) scoreManager.addToScore(1);

    if(this.AmmountDug[direction] > 8) this.AmmountDug[direction] = 8;
    //console.log("Digging ", direction)
    //---------------------------------------------
    if(this.AmmountDug['left'] === 8) {
        this.dugLeftFully = true;
        this.pointsGiven = true;
    }
    if(this.AmmountDug['right'] === 8){
        this.dugRightFully = true;
        this.pointsGiven = true;
    }
    if(this.AmmountDug['up'] === 8){
         this.dugUpFully = true;
         this.pointsGiven = true;
    }
    if(this.AmmountDug['down'] === 8){
         this.dugDownFully = true;
         this.pointsGiven = true;
    }



    // Búið að grafa í gegnum alla celluna
    //  this.IsFullyDug = true;
    // ----------------------------------------

    /*
    if(this.AmmountDug['left'] === 6 ||
       this.AmmountDug['right'] === 6 ||
       this.AmmountDug['up'] === 6 ||
       this.AmmountDug['down'] === 6){
        // Búið að grafa í gegnum alla celluna
        this.IsFullyDug = true;
    }
    */
}

Cell.prototype.Render = function(ctx)
{
  if(this.y <= 1) return;

  if(this.AmmountDug['left'] === 0 &&
      this.AmmountDug['right'] === 0 &&
      this.AmmountDug['up'] === 0 &&
      this.AmmountDug['down'] === 0) return;

// ------------------------------------------------------------------------
  util.fillBox(ctx, ((this.x+1)*this.size) - this.AmmountDug['left']*4,
                    this.y*this.size, this.AmmountDug['left']*4, 28, "Black");

  util.fillBox(ctx, this.x*this.size, this.y*this.size,
                      this.AmmountDug['right']*4, 28, "Black");

  util.fillBox(ctx, this.x*this.size, (this.y+1)*this.size -
                this.AmmountDug['up']*4,28, this.AmmountDug['up']*4, "Black");

  util.fillBox(ctx, this.x*this.size, this.y*this.size,
                28, this.AmmountDug['down']*4, "Black");
// ----------------------------------------------------------------------
  /*
    switch(this.currentDigDirection){
        case 'left':
            util.fillBox(ctx, ((this.x+1)*this.size) - this.AmmountDug['left']*6,
                         this.y*this.size, this.AmmountDug['left']*6, 28, "Black");
            break;
        case 'right':
            util.fillBox(ctx, this.x*this.size, this.y*this.size,
                         this.AmmountDug['right']*6, 28, "Black");
            break;
        case 'up':
            util.fillBox(ctx, this.x*this.size,
                         (this.y+1)*this.size - this.AmmountDug['up']*6,
                         28, this.AmmountDug['up']*6, "Black");
            break;
        case 'down':
            util.fillBox(ctx, this.x*this.size, this.y*this.size,
                         28, this.AmmountDug['down']*6, "Black");
            break;
    }
    */
}

var level2 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // fyrstu tvær línur skipta ekki máli
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -------- || -----------
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
];

var level3 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // fyrstu tvær línur skipta ekki máli
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -------- || -----------
  [0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
];

var level4 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // fyrstu tvær línur skipta ekki máli
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -------- || -----------
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1],
  [0,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1],
  [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
  [0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,1],
];

var level = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // fyrstu tvær línur skipta ekki máli
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // -------- || -----------
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];


Cell.prototype.makeFullyDugInDir = function(x, y, direction){
   var cellObj = grid.FindCell(x,y);
   if(direction === 'left' ) cellObj.AmmountDug['left'] = 8;
   if(direction === 'right') cellObj.AmmountDug['right'] = 8
   if(direction === 'up') cellObj.AmmountDug['up'] = 8
   if(direction === 'down') cellObj.AmmountDug['down'] = 8
}

function Grid(xSize, ySize, cellSize, level){
    // Fjöldi cella á x og y ás
    this.xSize = xSize;
    this.ySize = ySize;
    // Setjum upp tómt 2d fylki
    this.cells = [];
    this.cellSize = cellSize;
    this.playerPosition = [7, 5];

    for(var x = 0; x < this.xSize; x++){
        var column = []
        for(var y = 0; y < this.ySize; y++){
            var newCell = new Cell(x, y, this.cellSize);
            if(level[y][x] !== 0){  // þægilegara að hugsa sem y x miðað við level grid
              if(x !== 15){ // viljum ekki skoða x+1 :: sem er stærra en borðið
                if(level[y][x+1] !== 0){
                    newCell.AmmountDug['right'] = 8;
                    newCell.pointsGivem = true;
                }
              }
              if(y !== 0){ // viljum ekki skoða x-1: minna en borðið
                if(level[y][x-1] !== 0){
                     newCell.AmmountDug['left'] = 8;
                     newCell.pointsGiven = true;
                }
              }
              if(y !== 15){ // -- || --
                if(level[y+1][x] !== 0) {
                    newCell.AmmountDug['up'] = 8;
                    newCell.pintsGiven = true;
                }

              }
              if(y !== 0){ // -- || --
                if(level[y-1][x] !== 0) {
                    newCell.AmmountDug['down'] = 8;
                    this.pointsGiven = true;
                }
              }
            }
            column.push(newCell);
        }
        this.cells.push(column);
    }
}

Grid.prototype.PlayerMoved = function(x, y, direction){
    xIndex = Math.floor(x / 32);
    yIndex = Math.floor(y / 32);
    //console.log(this);
    this.playerPosition = [xIndex, yIndex];

    //-- prufa að bæta við 10 px í þá átt sem player er að fara, til að fá
    //-- staðsetningu odd spjótsins hans, sem á að keyra niður veggina
    if(direction === 'right') xIndex = Math.floor(x / 32);
    if(direction === 'left') xIndex = Math.floor(x / 32);
    if(direction === 'up') yIndex = Math.floor(y / 32);
    if(direction === 'down') yIndex = Math.floor(y / 32);
    // console.log("xIndex: " + xIndex + " -- yIndex: " + yIndex + " -- Dir: " + direction


    //Viljum ekki grafa fyrir ofan yfirborðið
    if(yIndex <= 1) return;

    cell = this.cells[xIndex][yIndex];

    //--------------------------------------------------------
    //if(cell.IsFullyDug) return;
    //if(direction === 'right') if(cell.dugRightFully) return;
    //if(direction === 'left') if(cell.dugLeftFully) return;
    //if(direction === 'up') if(cell.dugUpFully) return;
    //if(direction === 'down') if(cell.dugDownFully) return;
    // --------------------------------------------------------
    cell.Dig(direction);

}

Grid.prototype.FindCell = function(x, y, direction){



    //if(direction === 'down') yIndex++;
    //if(direction === 'right') xIndex++;
    // Viljum vita í hvaða cellu playerinn er
    //console.log('x ' + xIndex);
    //console.log('y ' + yIndex);
    return this.cells[xIndex][yIndex];
}

Grid.prototype.RenderGrid = function(ctx){
    for(var x = 0; x < this.xSize; x++){
        for(var y = 0; y < this.ySize; y++){
            this.cells[x][y].Render(ctx);
        }
    }
    g_sprites.blom.drawCentredAt(ctx,470, 51);
}

Grid.prototype.GetPlayerCoords = function(){
    return this.playerPosition;
}

// Prentar griddið
Grid.prototype.print = function(){
    console.log(this);
}
