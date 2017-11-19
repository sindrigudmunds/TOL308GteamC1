"use strict";

/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

    // "PRIVATE" DATA
    _players   : [],
    _pookas : [],
    _fygars   : [],
    _rocks : [],

    showRoundScreen : true,
    roundScreenLifespan : 72,
    playerDying : false,
    deathAnimDuration : 0,

    // "PRIVATE" METHODS

    _forEachOf: function(aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },
    // PUBLIC METHODS

    deferredSetup : function () {
         this._categories = [this._players, this._pookas,
                            this._fygars,this._rocks];
    },

    init: function() {

    },


    generatePlayer : function(descr){
      this._players.push(new Player(descr));
    },

    generatePooka : function(descr){
      this._pookas.push(new Pooka(descr));
    },

    generatePooka : function(descr){
      this._pookas.push(new Pooka(descr));
    },

    generateFygar : function(descr){
      this._fygars.push(new Fygar(descr));
    },

    generateRock : function (descr) {
      this._rocks.push(new Rock(descr));
    },

    allDead : function(enemies){
        var allDead = true;
        for (var i = 0; i < enemies.length; i++) {
          if (!enemies[i]._isDeadNow) allDead = false;
        }
        return allDead;
    },

    clearLevel : function(){
      while (this._fygars.length > 0) {
        this._fygars.pop();
      }

      while (this._pookas.length > 0) {
        this._pookas.pop();
      }
      while (this._rocks.length > 0) {
        this._rocks.pop();
      }

      this._players.pop();
    },

    roundScreen : function(ctx){
      ctx.save();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 512, 512);
      ctx.textAlign="center";
      ctx.fillStyle = "white";
      ctx.fillText("Round " + (levels.currentLevel+1),
                    256,256);

      ctx.restore();

    },

    update: function(du) {
      if(!this.showRoundScreen && !this.playerDying){
        for (var c = 0; c < this._categories.length; ++c) {
            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {
                if(!aCategory[i].isDeadNow){
                  var status = aCategory[i].update(du);
                  ++i;
                }
              }
            }
      }

      if (this.roundScreenLifespan > 0) {
        this.showRoundScreen = true;
        this.roundScreenLifespan -= du;
      }
      else {
        this.showRoundScreen = false;
      }

      if (this.deathAnimDuration > 0) {
        this.playerDying = true;
        this.deathAnimDuration -= du;
      }
      if(this.deathAnimDuration < 0){
        this.playerDying = false;
        this.roundScreenLifespan = 72;
        this._players[0].reset();
        this.deathAnimDuration = 0;
      }

      var player = this._players[0];
      var enemies = this._fygars.concat(this._pookas);
      if(player.shooting){
          // Player is shooting,  lets check if enemies collide with the gun
          var enemy = collisionManager.checkGunCollisions(player.gunCoords, enemies);
          if(enemy !== false){
            enemy.kill();
            scoreManager.addToScore(200);
            console.log("enemy killed");
              // We hit an enemy, kill it.
          }
      }

      if(this.allDead(enemies)){
        //console.log("allirdauðir");
        scoreManager.addToScore(500);
        this.clearLevel();
        //console.log(levels.currentLevel);
        levels.nextLevel();
        this.roundScreenLifespan = 72;
        //console.log(levels.currentLevel);

        grid = new Grid(16, 16, 32, levels.currentLevelArray());
        player.reset();
        initLevel();
      }

      var collisionObject = collisionManager.checkCollisions(player, enemies);
      if(collisionObject){
        if(collisionObject.type === 'pooka' || collisionObject.type === 'fygar'){

            for(var i = 0; i < enemies.length; i++){
                enemies[i].reset();
            }
            // Kill player
            this.deathAnimDuration = 72;
            scoreManager.livesRemaining--;
            console.log(scoreManager.livesRemaining);
            if(scoreManager.livesRemaining < 0){
                // Game over
                scoreManager.reset();
                this.clearLevel();
                levels.resetLevel();
                player.reset();
                initLevel();
                //Todo - Game over screen, "menu" fyrir restart
                grid = new Grid(16, 16, 32, currentLevel);
            }
        }
        /*if(collisionObject.type === 'rock'){
        collison for rocks
        }*/
      }
    },

    render: function(ctx) {
      grid.RenderGrid(ctx);
      scoreManager.renderScores(ctx);
      if(!this.playerDying){
      for (var c = 0; c < this._categories.length; ++c) {

          var aCategory = this._categories[c];
          for (var i = 0; i < aCategory.length; ++i) {
              if(!aCategory[i].isDeadNow){
                aCategory[i].render(ctx);
              }
          }
      }
    }
    if(this.playerDying) this._players[0].deathAnim(ctx,this.deathAnimDuration);
    if(this.showRoundScreen) this.roundScreen(ctx);
    }
}
entityManager.deferredSetup();
