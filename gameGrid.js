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
 // ---------------------------------

    this.x = x;
    this.y = y;
    this.size = size;

    this.currentDigDirection = null;
}

Cell.prototype.Dig = function(direction){
    this.currentDigDirection = direction;
    this.AmmountDug[direction]++
//---------------------------------------------
if(this.AmmountDug['left'] === 6) this.dugLeftFully = true;
if(this.AmmountDug['right'] === 6) this.dugRightFully = true;
if(this.AmmountDug['up'] === 6) this.dugUpFully = true;
if(this.AmmountDug['down'] === 6) this.dugDownFully = true;
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
}

function Grid(xSize, ySize, cellSize){
    // Fjöldi cella á x og y ás
    this.xSize = xSize;
    this.ySize = ySize;
    // Setjum upp tómt 2d fylki
    this.cells = [];
    this.cellSize = cellSize;

    for(var x = 0; x < this.xSize; x++){
        var column = []
        for(var y = 0; y < this.ySize; y++){
            column.push(new Cell(x, y, this.cellSize));
        }
        this.cells.push(column);
    }
}

Grid.prototype.PlayerMoved = function(x, y, direction){
    xIndex = Math.floor(x / 32);
    yIndex = Math.floor(y / 32);

    //-- prufa að bæta við 10 px í þá átt sem player er að fara, til að fá
    //-- staðsetningu odd spjótsins hans, sem á að keyra niður veggina
    if(direction === 'right') xIndex = Math.floor((x+10) / 32);
    if(direction === 'left') xIndex = Math.floor((x-10) / 32);
    if(direction === 'up') yIndex = Math.floor((y-10) / 32);
    if(direction === 'down') yIndex = Math.floor((y+10) / 32);
    // console.log("xIndex: " + xIndex + " -- yIndex: " + yIndex + " -- Dir: " + direction


    //Viljum ekki grafa fyrir ofan yfirborðið
    if(yIndex <= 1) return;

    cell = this.cells[xIndex][yIndex];

    //--------------------------------------------------------
    //if(cell.IsFullyDug) return;
    if(direction === 'right') if(cell.dugRightFully) return;
    if(direction === 'left') if(cell.dugLeftFully) return;
    if(direction === 'up') if(cell.dugUpFully) return;
    if(direction === 'down') if(cell.dugDownFully) return;
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
}

// Prentar griddið
Grid.prototype.print = function(){
    console.log(this);
}
