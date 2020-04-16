/**
 * Demo of basic animated sprites
 *
 * In this demo a Sprite is created that runs an animation from a sprite sheet
 *
 * The sprite is created using the Game Object Factory (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html)
 *
 * Animations are stored in the scene by the Aniation Manager (https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html)
 *   The animations of a scene can be refferred to through the anims property of the scene
 *
 * A sprite can refer to an animation stored in the scene in order to play it by means of its animation controller (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html).
 *   The animations controller can be addressed through the anims property of the sprite
 *
 */

var monster;

function preload() {
    this.load.image("logo", "images/phaser3-logo.png");
    this.load.spritesheet("monster", "images/metalslug_monster39x40.png", {
        frameWidth: 39,
        frameHeight: 40,
    });
}

/**
 * Creates one Image (the logo) and one Sprite (the monster)
 *
 * The animation is created
 *
 */
function create() {
    this.add.image(400, 100, "logo");

    var walkAnimationConfig = {
        key: "walk",
        frames: this.anims.generateFrameNumbers("monster"),
        frameRate: 12,
        repeat: -1,
    };
    var walkAnimation = this.anims.create(walkAnimationConfig);

    monster = this.add.sprite(400, 200, "monster");
    monster.anims.play("walk");
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xcccccc,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: {
        preload: preload,
        create: create,
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
