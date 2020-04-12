/**
 * Demo of basic physics
 *
 * In this demo there are no loaded graphics.
 * Instead of a sprite, a graphics object is used. Graphics objects can be drawn onto (in this case a circle and a rectangle).
 *
 */

var ball;
var floor;

function preload(){
    this.load.image("ball", "images/240px-Soccerball.svg.png");
    this.load.image("shroom", "images/shroomRedMid.png");
}

/**
 * Create the graphic objects and initialise physics
 *
 * Because the anchor point of the objects are not in the top-left,
 *    the bodies for the objects need to be offset manually (here using setCircle() and setSize())
 */
function create() {

    // Adding sprites and images to the physics world can be done using the PHysics Factory
    ball = this.physics.add.image(400, 0, "ball");
    ball.body.collideWorldBounds = true;
    ball.body.bounce.y = 0.8;

    // Because the Physics Factory does not create tiled sprites, it needs to be created through the GameObjects Factory
    // create a tiled sprite object (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html#tileSprite__anchor)
    // measurements are a maybe bit weird as the image used for the tiledsprite had a transparent area in the bottom half
    floor = this.add.tileSprite(400, this.cameras.main.height - 20, 800, 40, "shroom");

    // enable physics for the floor and set some physics properties
    this.physics.world.enable(floor);
    floor.body.allowGravity = false;
    floor.body.immovable = true;
}

/**
 * Let Phaser do the collision check between ball and floor
 * Phaser deals with the collision according to physics laws and settings (like gravity and bouncyness)
 */
function update() {
    this.physics.collide([ball, ball], floor);
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
            gravity: { y: 200 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0xff00ff,
            debugStaticBodyColor: 0xffffff
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
