/**
 * Demo of using the createCursorKeys convenience function in Phaser
 *
 * The createCursorKeys function allows you to capture the four cursor keys (arrow keys) with less code.
 * Next to the cursor keys, it contains references to space bar (jumping?) ans Shift (running?) too.
 *
 * Documentation
 * https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyboardPlugin.html#createCursorKeys__anchor
 *
 * Phaser example
 * https://phaser.io/examples/v3/view/input/keyboard/cursor-keys
 */

// The phaser logo that will be controlled by the cursorkeys
var phaserLogo;

/**
 * Preload load the single asset used in this demo
 */
function preload() {
    this.load.image("logo", "assets/phaser.png");
}

/**
 * Create places the logo onto the stage/scene
 * and initilizes the cursor keys
 */
function create() {
    phaserLogo = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "logo"
    );

    // this is what the demo is about. Initializing the cursor keys (or arrow keys) so that you can check if they are being pressed or not (see function update())
    cursors = this.input.keyboard.createCursorKeys();
}

/**
 * Update checks the state of the cursor keys and moves the logo accordingly
 */
function update() {


    // here each if statement checks another of the four cursor keys. If it is currently down, the logo is moved by one pixel
    if (cursors.left.isDown) {
        phaserLogo.x--;
    }
    if (cursors.right.isDown) {
        phaserLogo.x++;
    }
    if (cursors.up.isDown) {
        phaserLogo.y--;
    }
    if (cursors.down.isDown) {
        phaserLogo.y++;
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
        update: update
    }
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
