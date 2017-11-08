/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

    // "PRIVATE" DATA

    _players   : [],
    _pookas : [],
    _fygars   : [],
    _rocks : [],

    // "PRIVATE" METHODS

    _forEachOf: function(aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    // PUBLIC METHODS

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
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

    generateFygar : function(descr){
      this._fygars.push(new Fygar(descr));
    },

    update: function(du) {
      for (var c = 0; c < this._categories.length; ++c) {

          var aCategory = this._categories[c];
          var i = 0;

          while (i < aCategory.length) {

              var status = aCategory[i].update(du);
              ++i;

          }
      }
    },

    render: function(ctx) {

      for (var c = 0; c < this._categories.length; ++c) {

          var aCategory = this._categories[c];
          for (var i = 0; i < aCategory.length; ++i) {

              aCategory[i].render(ctx);

          }

      }
    }
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
