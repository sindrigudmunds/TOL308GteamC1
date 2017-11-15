// LEVELS
//HUGMYND UM HVERNIG MEGI GEYMA UPPLÝSINGAR UM LEVEL, AUÐVELT AÐ BÆTA VIÐ
// yrði aðeins kallað á í upphafi hvers level til að sækja byrjunarstöður
function Levels(descr){
  for (var property in descr) {
    this[property] = descr[property];
  }
}

/* ==================
1 - grid already dug
2 - player location
3 - fygar location
4 - pooka location
5 - rock location
====================*/
//ath engin aðferð notar player location því hún er alltaf sú sama.

Levels.prototype.levelsArray = [
//level1
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,4,0,0,0,0,1,0,0,1,1,4,1,0],
  [0,1,0,0,5,0,1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,5,0,0,0],
  [0,0,1,3,1,1,0,0,0,1,0,0,0,0],
  [0,0,0,5,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,4,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
],
//level2
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,5,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,5,0,3,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,1,1,4,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,2,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,5,0],
  [0,4,0,0,0,0,4,1,1,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,5,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
],
//level3
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,5,0,0,0,1,0,0,0,1,1,3,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0],
  [0,4,1,1,0,0,1,0,4,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,5,0,0],
  [0,0,0,0,0,1,2,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,4,0,0,0,0,0,0,5,0],
  [0,0,0,0,0,0,0,0,1,1,3,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
];

Levels.prototype.currentLevel = 1;

//returns list [x,y,z] where x = number of fygars in current level,
// y = number of pookas and z = number of rocks
Levels.prototype.getEntityNumber = function(){
  var noFygars = 0;
  var noPookas = 0;
  var noRocks = 0;

  var level = this.levelsArray[this.currentLevel];
  for(var i = 0; i < level.length; i++) {
     var line = level[i];
     for(var j = 0; j < line.length; j++) {
        if (line[j] === 3) noFygars += 1;
        if (line[j] === 4) noPookas += 1;
        if (line[j] === 5) noRocks += 1;
     }
   }
   return [noFygars,noPookas,noRocks];

};
//returns x and y coordinates of all fygars in level as a list of tuples
Levels.prototype.getFygarLocation = function(){
  var fygarLocations = [];

  var level = this.levelsArray[this.currentLevel];
  for(var i = 0; i < level.length; i++) {
     var line = level[i];
     for(var j = 0; j < line.length; j++) {
          if (line[j] === 3){
            //convert i and j to x and y coordinates
            coordinates = [i*32+16,j*32+16];
            // add them to array
            fygarLocations.push(coordinates);
          }
      }
    }
    return fygarLocations;

};
//returns x and y coordinates of all pooaks in level as a list of tuples
Levels.prototype.getPookaLocation = function(){
  var pookaLocations = [];

  var level = this.levelsArray[this.currentLevel];
  for(var i = 0; i < level.length; i++) {
     var line = level[i];
     for(var j = 0; j < line.length; j++) {
          if (line[j] === 4){
            //convert i and j to x and y coordinates
            coordinates = [i*32+16,j*32+16];
            // add them to array
            pookaLocations.push(coordinates);
          }
      }
    }
    return pookaLocations;
};
//returns x and y coordinates of all rocks in level as a list of tuples
Levels.prototype.getRockLocation = function(){
  var rockLocations = [];

  var level = this.levelsArray[this.currentLevel];
  for(var i = 0; i < level.length; i++) {
     var line = level[i];
     for(var j = 0; j < line.length; j++) {
          if (line[j] === 5){
            //convert i and j to x and y coordinates
            coordinates = [i*32+16,j*32+16];
            // add them to array
            rockLocations.push(coordinates);
          }
      }
    }
    return rockLocations;
};