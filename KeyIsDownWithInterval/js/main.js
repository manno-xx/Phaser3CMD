/**
 * Demo of using the checkDown property of the keyboard
 *
 * If you have the need to check if a certain key is being pressed, 
 *   BUT only want Phaser to respond every n milliseconds, then this is for you
 * 
 * You create a reference to a key
 * Then in update check if it is down, providing the interval for the check as well.
 * 
 * Documentation
 * https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyboardPlugin.html#checkDown__anchor
 *
 */

// The phaser logo that will be controlled by the space bar
var phaserLogo;
// the reference to the space bar key
var spaceBar;

/**
 * Preload load the single asset used in this demo
 */
function preload() {
    this.load.image("logo", "assets/phaser.png");
}

/**
 * Create places the logo onto the stage/scene
 * and initilizes the space bar key
 */
function create() {
    phaserLogo = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "logo"
    );

    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/**
 * Update checks the state of the space bar and moves the logo up if it is pressed / down
 *   The check only returns true if the key is pressed AND the indicated time has passed
 * Otherwise, the logo moves down
 * 
 */
function update() {
    
    if (this.input.keyboard.checkDown(spaceBar, 500)) {
        phaserLogo.y -= 40;
    } else {
        phaserLogo.y = Math.min(600, ++phaserLogo.y);
    }
}

/**
 * The configuration of the game
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

// create the game based on the configuration above
var game = new Phaser.Game(config);
