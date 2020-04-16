/**
 * This is a demo of tweening.
 *
 * It is (as most demos) only scratching the surface. 
 * The following links dive deeper and deeper into the rabbithole of tweens
 * 
 * Official API
 * https://photonstorm.github.io/phaser3-docs/Phaser.Tweens.TweenManager.html
 * 
 * Options for when creating a single tween:
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Tweens.html#.TweenBuilderConfig
 * 
 * List of all easing types
 * https://photonstorm.github.io/phaser3-docs/Phaser.Math.Easing.html
 * 
 * options per property of a tween:
 * https://photonstorm.github.io/phaser3-docs/Phaser.Types.Tweens.html#.TweenPropConfig
 * 
 * 'unofficial API'
 * https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tween/
 * 
 * Official examples:
 * https://phaser.io/examples/v3/category/tweens
 * Of which the most basic one:
 * https://phaser.io/examples/v3/view/tweens/single-property
 * 
 */

var logo;

function preload() {
    this.load.image("logo", "assets/phaser.png");
    this.load.image("phaser3", "assets/phaser3-logo.png");
}

function create() {
    this.add.image(this.cameras.main.centerX, 100, "phaser3");

    var logo = this.add.image(200, 400, "logo");

    // the tween is created and works/starts immediately. No more interfering needed
    // here the logo is tweened, over 2000 milliseconds, with said ease. Repeats forever and moves like a yoyo
    // only the x property is tweened from where it starts to 600
    // when it moves back (bc the yoyo setting) it flips in the vertical axis
    this.tweens.add({
        targets: logo,
        duration: 2000,
        ease: "Quad.easeInOut",
        repeat: -1,
        yoyo: true,
        props: { 
            x: { 
                value: 600, 
                flipX: true 
            } 
        },
    });
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
        create: create
    },
};

var game = new Phaser.Game(config);
