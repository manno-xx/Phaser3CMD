/**
 * Demo of three camera efects:
 * - Fade in when game loads
 * - flash and shake camera when tank fires (spacebar is pressed)
 * 
 */

var fireButton;
var weapon;
var particles;
var emitter;

function preload() {
    this.load.image("rocket", "assets/tank_bullet3.png");
    this.load.image("tank", "assets/tanks_tankDesert5.png");
}

/**
 * Creates Tank sprite
 * Registers the spacebar
 * Fades in the camera
 */
function create() {
    var tank = this.add.sprite(200, 200, "tank");

    fireButton = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    
    // Fade the camera in for added drama
    this.cameras.main.fadeFrom(2000, 0, 0, 0);
}

/**
 * If player is pressing the space bar, apply fx to camera.
 * The check only happens every 500 millisecond
 */
function update() {
    if (this.input.keyboard.checkDown(fireButton, 500)) {
        this.cameras.main.flash(200, 255, 0, 0, true);
        this.cameras.main.shake(100, 0.01, true);
    }
}

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

var game = new Phaser.Game(config);
