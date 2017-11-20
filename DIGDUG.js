// ============================= //
//  DIG DUG
// ============================= //

"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
g_ctx.font="bold 22px Courier ";

var levels = new Levels();
var currentLevel = levels.currentLevelArray();

var grid = new Grid(16, 16, 32, currentLevel);


// =====================
// CREATE Player
// =====================

function createPlayer() {

    entityManager.generatePlayer({
      cx : 240,
      cy : 266,
    });

}

function initLevel(){

  var fygars = levels.getFygarLocation();
  var pookas = levels.getPookaLocation();
  var rocks = levels.getRockLocation();

  for(var i=0; i<rocks.length; i++){
		entityManager.generateRock({cx:rocks[i][0], cy: rocks[i][1]});
	}

	for(var i=0; i<fygars.length; i++){
		entityManager.generateFygar({cx:fygars[i][0], cy: fygars[i][1]});
	}

	for(var i=0; i<pookas.length; i++){
		entityManager.generatePooka({cx:pookas[i][0], cy: pookas[i][1]});
	}
  createPlayer();
}

// =====================
// GATHER INPUTS
// =====================


function gatherInputs(){
  // Nothing to do here!
  // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    entityManager.update(du);
}

// GAME-SPECIFIC RENDERING
function renderSimulation(ctx) {
    entityManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============
var g_images = {};

function requestPreloads() {

    var requiredImages = {
        spriteSheet1   : "https://notendur.hi.is/~ots4/DigDugImages/NES_Dig_Dug_General_Sprites.png",
        spriteSheet2  : "https://notendur.hi.is/~ots4/DigDugImages/NES_Dig_Dug_Vegetables.png",
        spriteSheet3 : "https://notendur.hi.is/~ots4/DigDugImages/NES_Dig_Dug_ClearX700Y220.png",
        spriteSheet4 : "https://notendur.hi.is/~ots4/DigDugImages/NES_Dig_Dug_ClearX700Y220Flipped.png",
        spriteSheet5 : "https://notendur.hi.is/~ots4/DigDugImages/NES_Dig_Dug_ClearX700Y220VertFlipped.png",
        backgroundTexture : "https://notendur.hi.is/~ots4/DigDugImages/DigDugBackgroundTextureresized448.png",
        blom : "https://notendur.hi.is/~ots4/DigDugImages/Blom.png",
    };
    imagesPreload(requiredImages, g_images, preloadDone);
}

var playerShootingArr = [];
var playerDeathAnim = [];

var g_sprites = {};
function preloadDone() {

    // flower
    g_sprites.blom = new Sprite(0,0,32,32, g_images.blom);
    // player right
    g_sprites.playerWalkRight1 = new Sprite(32,6,32,38,g_images.spriteSheet3);
    g_sprites.playerWalkRight2 = new Sprite(64,6,32,38,g_images.spriteSheet3);
    // player left
    g_sprites.playerWalkLeft1 = new Sprite(604,6,32,38,g_images.spriteSheet4);
    g_sprites.playerWalkLeft2 = new Sprite(636,6,32,38,g_images.spriteSheet4);
    // player up
    g_sprites.playerWalkUp1 = new Sprite(32,44,32,38,g_images.spriteSheet3);
    g_sprites.playerWalkUp2 = new Sprite(64,44,32,38,g_images.spriteSheet3);
    // player down
    g_sprites.playerWalkDown1 = new Sprite(604,44,32,40,g_images.spriteSheet4);
    g_sprites.playerWalkDown2 = new Sprite(636,44,32,38,g_images.spriteSheet4);

    // Pooka right
    g_sprites.pookaRight1 = new Sprite(20,107,30,27,g_images.spriteSheet3);
    g_sprites.pookaRight2 = new Sprite(52,107,30,27,g_images.spriteSheet3);
    // Pooka left
    g_sprites.pookaLeft1 = new Sprite(616,107,30,27,g_images.spriteSheet4);
    g_sprites.pookaLeft2 = new Sprite(648,107,30,27,g_images.spriteSheet4);

    //  Fygar right
    g_sprites.fygarRight1 = new Sprite(28,162,28,28,g_images.spriteSheet3);
    g_sprites.fygarRight2 = new Sprite(60,162,28,28,g_images.spriteSheet3);
    // Fygar left
    g_sprites.fygarLeft1 = new Sprite(616,162,28,28,g_images.spriteSheet4);
    g_sprites.fygarLeft2 = new Sprite(648,162,28,28,g_images.spriteSheet4);

    // Rock
    g_sprites.rock = new Sprite(420, 100, 32, 32, g_images.spriteSheet3);
    g_sprites.rock2= new Sprite(460, 100, 32, 32, g_images.spriteSheet3);


    // player arrow right
    g_sprites.plArrowRightPl = new Sprite(234,6,38,38, g_images.spriteSheet3); // The player
     // the arrow
    playerShootingArr.push(g_sprites.plArrowRight1 = new Sprite(580, 44, 10, 38, g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowRight2 = new Sprite(580, 44, 20, 38, g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowRight3 = new Sprite(580, 44, 30, 38, g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowRight4 = new Sprite(580, 44, 40, 38, g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowRight5 = new Sprite(580, 44, 50, 38, g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowRight6 = new Sprite(580, 44, 70, 38, g_images.spriteSheet3));

    g_sprites.plArrowUpPl = new Sprite(234,45,38,38, g_images.spriteSheet3); // The player
    playerShootingArr.push(g_sprites.plArrowUp1 = new Sprite(8, 68, 18, 80,  g_images.spriteSheet3)); // The Arrow
    playerShootingArr.push(g_sprites.plArrowUp2 = new Sprite(8, 56, 18, 80,  g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowUp3 = new Sprite(8, 44, 18, 80,  g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowUp4 = new Sprite(8, 32, 18, 80,  g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowUp5 = new Sprite(8, 20, 18, 80,  g_images.spriteSheet3));
    playerShootingArr.push(g_sprites.plArrowUp6 = new Sprite(8, 12, 18, 80,  g_images.spriteSheet3));

    g_sprites.plArrowLeftPl = new Sprite(428,18,38,28, g_images.spriteSheet4); // The player
    playerShootingArr.push(g_sprites.plArrowLeft1 = new Sprite(88, 46, 84, 14,  g_images.spriteSheet4)); // The Arrow
    playerShootingArr.push(g_sprites.plArrowLeft2 = new Sprite(88, 46, 84, 14,  g_images.spriteSheet4));
    playerShootingArr.push(g_sprites.plArrowLeft3 = new Sprite(88, 46, 84, 14,  g_images.spriteSheet4));
    playerShootingArr.push(g_sprites.plArrowLeft4 = new Sprite(76, 46, 84, 14,  g_images.spriteSheet4));
    playerShootingArr.push(g_sprites.plArrowLeft5 = new Sprite(64, 46, 84, 14,  g_images.spriteSheet4));
    playerShootingArr.push(g_sprites.plArrowLeft6 = new Sprite(52, 46, 84, 14,  g_images.spriteSheet4));

    g_sprites.plArrowDownPl = new Sprite(432,56,28,34, g_images.spriteSheet4); // The player
    playerShootingArr.push(g_sprites.plArrowDown1 = new Sprite(678, 142, 14, 11,  g_images.spriteSheet5)); // The Arrow
    playerShootingArr.push(g_sprites.plArrowDown2 = new Sprite(678, 142, 14, 24,  g_images.spriteSheet5));
    playerShootingArr.push(g_sprites.plArrowDown3 = new Sprite(678, 142, 14, 35,  g_images.spriteSheet5));
    playerShootingArr.push(g_sprites.plArrowDown4 = new Sprite(678, 142, 14, 47,  g_images.spriteSheet5));
    playerShootingArr.push(g_sprites.plArrowDown5 = new Sprite(678, 142, 14, 59,  g_images.spriteSheet5));
    playerShootingArr.push(g_sprites.plArrowDown6 = new Sprite(678, 142, 14, 80,  g_images.spriteSheet5));

    for (var i = 0; i < 4; i++) {
        playerDeathAnim.push(new Sprite((i*40)+280,14,32,32,g_images.spriteSheet3))
    }
    entityManager.init();

    initLevel();
    grid.print();
    main.init();
}

// Kick it off
requestPreloads();
