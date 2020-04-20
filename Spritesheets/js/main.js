/**
 * Demo of basic animated sprites
 *
 * In this demo two Sprites are created that run an animation from a sprite sheet
 *
 * The sprites are created using the Game Object Factory (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html)
 *
 * Animations are stored in the scene by the Aniation Manager (https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html)
 *   You can refer to the animations of a scene through the anims property of the scene (or 'this')
 *   See the lines with: this.anima.create(...) 
 *   They create a new animation and store it in the Animations Manager of the scene 
 *
 * A sprite can refer to an animation stored in the scene in order to play it by means of its animation controller (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html).
 *   The animations controller can be addressed through the anims property of the sprite
 *   See the lines with: dude.anims.play(...)
 *   They make the sprite play an animation stored in the scene's Animation Manager
 *
 */

var monster;
var dude;

function preload() {
    this.load.image("logo", "images/phaser3-logo.png");

    this.load.spritesheet("monster", "images/metalslug_monster39x40.png", {
        frameWidth: 39,
        frameHeight: 40,
    });

    this.load.spritesheet("dude", "images/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
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
    
    // the monster first.
    // its spritesheet is just one long animation
    var monsterAnimationConfig = {
        key: "walk",
        frames: this.anims.generateFrameNumbers("monster"),
        frameRate: 12,
        repeat: -1,
    };
    var walkAnimation = this.anims.create(monsterAnimationConfig);

    monster = this.add.sprite(400, 200, "monster");
    monster.anims.play("walk");

    // now that phaser dude
    // its spritesheet contains multiple animations
    // the code below is not very optimized, but this makes it more clear what happens
    // First three animations are created based on frames in the spritesheet
    var dudeWalkLeftAnimationConfig = {
        key: "dude-walk-left",
        frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
        frameRate: 12,
        repeat: -1,
    };
    this.anims.create(dudeWalkLeftAnimationConfig);

    var dudeWalkRightAnimationConfig = {
        key: "dude-walk-right",
        frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
        frameRate: 12,
        repeat: -1,
    };
    this.anims.create(dudeWalkRightAnimationConfig);

    var dudeIdleAnimationConfig = {
        key: "dude-idle",
        frames: this.anims.generateFrameNumbers("dude", {start: 4, end: 4}),
        frameRate: 0,
        repeat: 0,
    };
    this.anims.create(dudeIdleAnimationConfig);
    
    // then the sprite is created and told to play one of the created animations
    dude = this.add.sprite(450, 200, "dude");
    dude.anims.play("dude-walk-right");
}

function update(){
    /* 
        See if you can make the sprite in the variable 'dude' play another animation 
          based on certain key presses
        So: if the right cursor key is pressed, play animation 'dude-walk-right'
            if the left cursor key is pressed, play animation 'dude-walk-left'
    */

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
        update: update
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
