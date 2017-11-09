function Cell(){
    // Hvað er búið að grafa mikið úr cellunni
    this.AmmountDug = 0;
    // Var grafið upp eða til hliðar?
    this.DirectionDug = null;
    this.IsFullyDug = false;
}

Cell.prototype.Dig = function(direction){
    if(this.IsFullyDug) return;
    this.AmmountDug++
    if(this.AmmountDug === 10){
        this.IsFullyDug = true;
    }
}

Cell.prototype.Render = function(ctx){
    
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
    for(var x = 0; x < this.xSize; x++){
        var column = []
        for(var y = 0; y < this.ySize; y++){
            column.push(new Cell());
        }
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
