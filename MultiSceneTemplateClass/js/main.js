/**
 * This demonstrates the use of multiple scenes.
 * 
 * In Phaser you can create multiple scenes. 
 * This, for instance, allows you to seperate the code between a menu and the actual game
 * 
 * This is a template for a game with multiple scenes.
 * 
 * There are two classes defined. Each with at a key (see the super("key") call) and a few methods.
 * - The key is there to let Phaser idetify a scene in orde to load it.
 * - The methods are there to create the functionality of the game using the three main functions (preload, create and update)
 * 
 * The game config lists both classes in an array as the available scenes
 *  
 */

/**
 * The class defining the menu scene
 */
class menuScene extends Phaser.Scene {
    constructor(){
        super("menu");
    }
    preload(){
        console.log("menu preload");
        this.load.image("button", "assets/button.png");
    }
    create(){
        console.log("menu create");

        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add.image(100, 100, "button")
        button.setInteractive();

        button.on('pointerdown', function(){
            console.log("moving to the game scene");
            this.scene.switch("game");
        }, this);
    }
    update(){
        console.log("menu update");
    }
}

/**
 * The class defining the game scene
 */
class gameScene extends Phaser.Scene {
    constructor(){
        super("game");
    }
    preload(){
        console.log("game preload");
    }
    create(){
        console.log("game create");
        this.add.text(10, 10, "What a triple-A game this is!");
    }
    update(){
        console.log("game update");
    }
}

/**
 * The game config with a reference to both classed defined above.
 * The references to the classes are in an array as the value of the scenes property
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
    scene: [menuScene, gameScene]
};

var game = new Phaser.Game(config);
