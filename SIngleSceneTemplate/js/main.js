/**
 * This is a template for a game in just one scene.
 * 
 * The three main functions (preload, create and update) are created 
 *   and the game config lists them to be executed when Phaser sees fit
 *  
 */

function preload(){
    console.log("game preload");
}

function create(){
    console.log("game create");
    this.add.text(10, 10, "What a triple-A game this is!");
}

function update(){
    console.log("game update");
}

/**
 * The game config referencing the three functions above in its scene property
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 200 
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
