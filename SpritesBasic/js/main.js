/**
 * Demo of basic sprite use
 *
 * In this demo a few ways of creating Images and Sprites are demonstrated.
 * 
 * Easiest way is to use the so-called factories. 
 * Factories create things and in this case objects for the game, or Game Objects
 * 
 * The two main factories are:
 * The Game Object Factory which can create any game object:
 *  - images
 *  - sprites
 *  - text
 *  - particles
 *  - groups
 *  - ...
 * 
 * More info on that: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html
 * 
 * 
 * The other factory is the Physics Factory which can create some objects that will be part of the physics system:
 *  - sprites
 *  - images
 * 
 * More info on that: https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Factory.html
 * 
 * 
 */

function preload(){
    this.load.image("dude", "images/phaser-dude.png");
    this.load.image("logo", "images/phaser3-logo.png");
    this.load.image("logo", "images/metalslug_monster39x40.png");
}

/**
 * The two images are created here. 
 * 
 * Images? Yes. Actual Sprites, as Phaser defines them, can play animations.
 * As this demo does not use that feature, the more lightweight Image is used (less strain on your poor CPU)
 * 
 * The two images are created the two ways possible/intended:
 *   - One using the 'normal' Game Objects Factory
 *   - One using the Physics Game Object Factory
 * 
 * Technically, in this example you can replace 'image' with 'sprite' and it would work just the same.
 * 
 * As the images are created and then nothing is being done to them anymore,
 *   there is no need for variables outside this function
 */
function create() {
    this.add.image(400, 100, "logo");

    var dude = this.physics.add.image(400, 150, "dude");
    dude.body.collideWorldBounds = true;
}

/**
 * 
 */
function update() {
    // nothing to see here, now move along
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
