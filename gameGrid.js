function Cell(xPos, yPos){
    // Hvað er búið að grafa mikið úr cellunni
    this.AmmountDug = 0;
    // Var grafið upp eða til hliðar?
    this.DirectionDug = null;
    this.IsFullyDug = false;
    this.xPos = xPos;
    this.yPos = yPos;
}

Cell.prototype.Dig = function(direction){
    if(this.IsFullyDug) return;
    this.AmmountDug++
    if(this.AmmountDug === 10){
        this.IsFullyDug = true;
    }
}


Cell.prototype.Render = function(ctx){
    g_sprites.fullDugTunnel.drawCentredAt(ctx, this.xPos, this.yPos);

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
    var xPos = 0
    var yPos = 0
    for(var x = 0; x < this.xSize; x++){
        var column = [];
        for(var y = 0; y < this.ySize; y++){
            column.push(new Cell(xPos + 16, yPos + 16));
            yPos += add;
        }
        xPos +=add;
        yPos = 0;
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
        }
    }
}

// Prentar griddið
Grid.prototype.print = function(){
    console.log(this);
}
