
/**
 * A demo of how to create a button that changes when you roll over it
 * The changes here are:
 * - it shows a different image
 * - it shows the 'pointer cursor'. The hand with extended index finger
 * 
 */

 /**
  * Load the sprite sheet containing the two images/frames of the button
  */
function preload() {
    this.load.spritesheet("new-game", "assets/button.png", {
        frameWidth: 64,
        frameHeight: 16,
    });
}

/**
 * Creates a sprite based on the loaded sprite sheet
 * Sets the sprite to be interactive (including a change of cursor)
 * then adds the event listeners for moving the mouse over and out of the button
 * and... one for pressing the button
 * 
 */
function create() {
    var button = this.add.sprite(400, 300, "new-game");
    button.setInteractive({ useHandCursor: true });

    button.on("pointerover", function () {
        this.setFrame(1);
    });
    button.on("pointerout", function () {
        this.setFrame(0);
    });

    button.on("pointerdown", function(){
        console.log("Start the new game already!");
    });
}

/**
 * Nothing here to see, now move along
 */
function update() {}

/*
 * Pretty basic configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

// create the game based on the configuration
var game = new Phaser.Game(config);
