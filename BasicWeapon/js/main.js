/**
 * Demo of a weapon kind of object firing bullets.
 * Phaser had an built-in feature for this, Phaser 3 not yet...
 * 
 * A click fires a bullet from the center of the screen in the direction of the mouse
 * When a bullet leaves the screen (or collides with the world bounds), it is deactivated
 * 
 * For a game you would add an overlap check with object in the game to check if they get hit
 * 
 * The bullets are in a so-called group:
 * https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
 * Groups manage multiple similar elements and can be consideres as advandced arrays
 * 
 * In this case, the group is asked for the first available bullet.
 * This happens by using the, maybe counterintuitive, .getFirstDead() method.
 * The .getFirstDead() method returns the first element that is not active in the game (hence 'dead')
 * If there _is_ one available, that bullet is used to fire at the target location (here the mouse)
 * If there is _not_ one available, null is returned and the code checks for that and does not do anything ("... gun goes 'click'"")
 * In the end, when the bullet is done with its task, it is deactivated again for future use
 * This resembles/is what they call an object pool: A set of objects to teke one from when needed instead of creating and destroying every time you need and discard one
 * 
 * 
 * The project uses so-called vector math to determine the direction the bullet should move in
 * https://www.youtube.com/user/codingmath/search?query=vector 
 * 
 */

 // the clip with bullets (a bit explicit maybe. oh, the violence...)
var clip;

// the poor dude
var poorDude;

function preload() {
    this.load.image("bullet", "assets/bullet7.png");
}

/**
 * Initialize the game:
 * - create a physics group with bullet sprites
 * - prepare the sprites to behave well (remove when they leave the screen, disable by default)
 * - tell phaser to trigger function shoot() when the stage is clicked
 */
function create() {
    this.add.text(10, 10, "What a triple-A game this is!");

    // this creates a group of (physics based) sprites
    clip = this.physics.add.group({
        active: false,
        key: "bullet",
        quantity: 5,
        collideWorldBounds: true,
        setXY: {
            x: 400,
            y: 300,
        },
    });

    // tells each bullet to:
    // - emit the worldbounds event when they hit the ... worldbounds
    // - disable the physics body for now (deactivating it)
    clip.getChildren().forEach(function (bullet) {
        bullet.body.onWorldBounds = true;
        bullet.disableBody(true, true);
    });

    // tell phaser that the function clearBullet() needs to be called when a collision with the world bounds takes place
    this.physics.world.on("worldbounds", clearBullet, this);

    // tell phaser that the function shoot() should be called when a click/mousedown/tap happens
    this.input.on("pointerdown", shoot, this);
}

/**
 * Fires a bullet from the clip (if there is a bullet ready)
 *
 * @param {pointer} pointer The information on where was clicked
 */
function shoot(pointer) {
    var bullet = clip.getFirstDead();
    if (bullet) {
        bullet.enableBody(true, 400, 300, true, true);
        var vector = new Phaser.Math.Vector2(pointer.x - 400, pointer.y - 300)
            .normalize()
            .scale(600);
        bullet.setVelocity(vector.x, vector.y);
    }
}

/**
 * When objects het the world bounds.
 * If the body belongs to a bullet (or: if the body's gameObject belongs to the group 'clip'), 
 *   put it back in the clip
 *
 * @param {body} bullet The body of the gameobject that just left the screen
 */
function clearBullet(bullet) {
    if (clip.contains(bullet.gameObject)) {
        bullet.gameObject.disableBody(true, true);
    }
}

/**
 * Nothing to see here, move along now
 */
function update() {}

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
                x: 0,
                y: 0
            },
            debug: true
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
