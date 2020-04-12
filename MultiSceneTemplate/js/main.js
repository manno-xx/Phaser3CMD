/**
 * This demonstrates the use of multiple scenes.
 * 
 * In Phaser you can create multiple scenes. 
 * This, for instance, allows you to seperate the code between a menu and the actual game
 * 
 * This is a template for a game with multiple scenes.
 * 
 * There are two objects created. Each with at least a key and a few methods.
 * - The key is there to let Phaser idetify a scene in orde to load it.
 * - The methods are there to create the functionality of the game using the three main functions (preload, create and update)
 * 
 * The game config lists both objects in an array as the available scenes
 *  
 */

 /**
  * The menu scene
  */
var menu = {
    key: "menu",
    preload: function(){
        console.log("menu preload");
        this.load.image("button", "assets/button.png");
    },
    create: function(){
        console.log("menu create");

        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add.image(100, 100, "button")
        button.setInteractive();

        button.on('pointerdown', function(){
            console.log("moving to the game scene");
            this.scene.switch("game");
        }, this);
        
    },
    update: function(){
        console.log("menu update");
    }
};

/**
 * The game scene
 */
var game = {
    key: "game",
    preload: function(){
        console.log("game preload");
    },

    create: function(){
        console.log("game create");
        this.add.text(10, 10, "What a triple-A game this is!");
    },
    update: function(){
        console.log("game update");
    }
};

/**
 * The game config with a reference to both objects defined above.
 * The references to the objects are in an array as the value of the scenes property
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [menu, game]
};

var game = new Phaser.Game(config);
