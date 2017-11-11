// ============================= //
//  DIG DUG
// ============================= //

"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");




// =====================
// CREATE Player
// =====================



function createPlayer() {

    entityManager.generatePlayer({
      cx : 220,
      cy : 440
    });

}

function createPooka() {
  entityManager.generatePooka({
  });
}

function createFygar() {
  entityManager.generateFygar({

  });
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

    //processDiagnostics();

    entityManager.update(du);

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}




var grid = new Grid(14, 16);
// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    //if (g_renderSpatialDebug) spatialManager.render(ctx);
    grid.RenderGrid(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        spriteSheet1   : "NES_Dig_Dug_General_Sprites.png",
        spriteSheet2  : "NES_Dig_Dug_Vegetables.png",
        spriteSheet3 : "NES_Dig_Dug_ClearX700Y220.png",
        spriteSheet4 : "NES_Dig_Dug_ClearX700Y220Flipped.png",
        backgroundTexture : "DigDugBackgroundTextureresized448.png",
        protoTunnel: "protoTunnelX32Y32Transp.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
function preloadDone() {

    //g_sprites.spriteSheet1  = new Sprite(g_images.spriteSheet1);
    //g_sprites.spriteSheet2 = new Sprite(g_images.spriteSheet2);

    //g_sprites.player = new Sprite(32,6,32,38,g_images.spriteSheet3);
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
    g_sprites.playerWalkDown1 = new Sprite(604,44,32,38,g_images.spriteSheet4);
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

    // player arrow right
    g_sprites.plArrowRightPl = new Sprite(234,6,38,38, g_images.spriteSheet3);
    g_sprites.plArrowRight1 = new Sprite(580, 44, 10, 38, g_images.spriteSheet3);
    g_sprites.plArrowRight2 = new Sprite(580, 44, 20, 38, g_images.spriteSheet3);
    g_sprites.plArrowRight3 = new Sprite(580, 44, 30, 38, g_images.spriteSheet3);
    g_sprites.plArrowRight4 = new Sprite(580, 44, 40, 38, g_images.spriteSheet3);
    g_sprites.plArrowRight5 = new Sprite(580, 44, 50, 38, g_images.spriteSheet3);
    g_sprites.plArrowRight6 = new Sprite(580, 44, 70, 38, g_images.spriteSheet3);

    // Prototunnel
    g_sprites.fullDugTunnel = new Sprite(0,0,31,31, g_images.protoTunnel);
    //g_sprites.fullDugTunnel = new Sprite(578,158,32,32, g_images.spriteSheet3);


    //g_sprites.pookalabb2 = new Sprite(58,102,28,28,g_images.spriteSheet3);
    entityManager.init();
    //createInitialShips();
    createPlayer();

    //Örugglega betri leið til að búa til marga pookas, mjög primitive
    createPooka();
    createPooka();
    createPooka();
    createFygar();
    createFygar();

    //var grid = new Grid(14, 16);  // set fyrir ofan render: línu 82 fyrir ofan
    grid.Initialize();
    grid.print();

    main.init();
}

// Kick it off
requestPreloads();




// Eiður: Comment-a út: veit ekki hvort við notum sambærileg diagnostics
// GAME-SPECIFIC DIAGNOSTICS
/*
var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,

        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,

        sprite : g_sprites.ship2
        });

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
}
*/


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`
