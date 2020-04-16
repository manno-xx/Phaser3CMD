/**
 * This demo shows basic smooth animation using the sine function
 *
 * Just a nice and easy way to make something move smoothly
 *
 * logo is the sprite of the phaser logo
 * logoY stores the initial y position of the logo. This is used to make the logo move relative to that point.
 *
 */

var logo;
var logoY;

function preload() {
    this.load.image("logo", "assets/phaser.png");
}

function create() {
    logoY = this.cameras.main.centerY;

    logo = this.add.image(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        "logo"
    );
}

function update() {
    // change this to make it move higher and lower (or less)
    var amplitude = 30;
    // this.time.now is the time in milliseconds since the scene started.
    var sine = Math.sin(this.time.now / 1000);
    var displacement = sine * amplitude;
    logo.y = logoY + displacement;
}

/**
 * The game config referencing the three functions above in its scene property
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 200,
            },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
