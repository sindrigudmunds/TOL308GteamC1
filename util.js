// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	    value = lowBound;
    } else if (value > highBound) {
	    value = highBound;
    }
    return value;
},

wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
	    value += (highBound - lowBound);
    }
    while (value > highBound) {
	    value -= (highBound - lowBound);
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},


// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},


// MISC
// ====

square: function(x) {
    return x*x;
},


// DIRECTIONS
// ==========
directionVector: function(x1, y1, x2, y2){
    return {x: x2-x1, y: y2-y1};
},

// DISTANCES
// =========
distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	    dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	    dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
},


// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var img = new Image();
    img.src = 'DigDugBackgroundTextureresized448.png';
    var pattern = ctx.createPattern(img, 'repeat');
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

checkUpDown: function (nextcx) {
  var upDownCoords = [16, 48, 80, 112, 144, 176, 208, 240, 272, 304, 336, 368, 400, 432];

  for(var i=0; i < upDownCoords.length; i++){
      var val = upDownCoords[i];
      if(Math.abs(nextcx - val) < 2){
        return val;
      }
  }
  return false;
},

checkLeftRight: function (nextcy){
  //var leftRightCoords = [32,64,96,128,160,192,224,256,288,320,352,384,416,448,490];
  var leftRightCoords = [42,74,106,138,170,202,234,266,298,330,362,394,426,458,490];

  for(var i=0; i < leftRightCoords.length; i++){
    var val = leftRightCoords[i];
    if(Math.abs(nextcy - val) < 2){
      return val;
    }
  }
  return false;
}


};
