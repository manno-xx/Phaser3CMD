/**
 * Demo of using the isDown property of keys
 *
 * If you have the need to check if a certain key is being pressed, you can add a key to monitor. Of that key you can check the status (down or not)
 * It is a simplified version of createCursorKeys
 *
 * Documentation
 * https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.Key.html#isDown__anchor
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
 * Otherwise, the logo moves down
 * 
 * It is the basic mechanics of copter games of which Flappy Bird is the most recent popular incarnation
 */
function update() {
    // the isDown property of a key is true if it is indeed pressed, it is false otherwise
    if (spaceBar.isDown) {
        phaserLogo.y--;
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
