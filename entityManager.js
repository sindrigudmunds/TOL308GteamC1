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
       
    },

    init: function() {
      
    },

    update: function(du) {
        
    },

    render: function(ctx) {

    }
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
