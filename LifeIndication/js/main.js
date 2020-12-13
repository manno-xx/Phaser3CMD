/**
 * Demo of 
 *
 */

var dude;

var healthText;
var heartsBar;
var heartsMaskGraphic;

var healthBar;
var healthBarMaskGraphic;

/**
 * Loading assets
 */
function preload() {
    this.load.image("dude", "assets/phaser-dude.png");
    this.load.image("lives", "assets/zelda-hearts.png");
    this.load.image("bar", "assets/healthbar.png");
}

/**
 * Set up the world's graphics etc.
 */
function create() {
    healthText = this.add.text(400, 200, "");

    // set up the dude
    setUpDude(this);

    buildHeartsDisplay(this);

    buildHealthBarDisplay(this);

    updateHealthStatsDisplay(dude);
}

/**
 * Set up the dude and its health
 * Also makes the dude respond to clicks
 * 
 * @param {Scene} scene The scene to add elements to
 */
function setUpDude(scene) {
    dude = scene.add
        .sprite(50, 550, "dude")
        .setInteractive({ useHandCursor: true });
    // Whenever you click on the dude, he loses a life. function loseLife() takes care of that
    // the amount of lifes is stored in the dude's data (so, no seperate variable needed for that)
    dude.on("pointerdown", loseLife, scene);

    // add the data that belongs to the dude (health and maxHealth)
    dude.setData("lives", 10);
    dude.setData("maxLives", 10);
    // make sure that, when the lives data value changes, the function updataHealthStats() is called
    dude.on("changedata-lives", updateHealthStatsDisplay, scene);
}

/**
 * Builds the hearts bar indicating lifes remaining
 * 
 * @param {Scene} scene The scene to add elements to
 */
function buildHeartsDisplay(scene){
    // the image of the 10 hearts
    // origin is set at 0, 0 because the mask used has its origin at 0, 0 too (and cannot change that)
    heartsBar = scene.add.image(400, 20, "lives");
    heartsBar.setOrigin(0);

    // make the graphic that will serve as a mask of the bar with hearts. It is just a white rectangle
    heartsMaskGraphic = scene.add.graphics({ x: 400, y: 20 });
    heartsMaskGraphic.fillStyle(0xffffff);

    // create a mask and apply it to the image of the hearts
    var mask = heartsMaskGraphic.createGeometryMask();
    heartsBar.setMask(mask);
}

/**
 * 
 * 
 * @param {Scene} scene The scene to add elements to
 */
function buildHealthBarDisplay(scene){
    healthBar = scene.add.image(400, 100, "bar");
    healthBar.setOrigin(0);

    healthBarMaskGraphic = scene.add.graphics({ x: 400, y: 100 });
    healthBarMaskGraphic.fillStyle(0xFF00FF);

    // create a mask and apply it to the image of the hearts
    var mask = healthBarMaskGraphic.createGeometryMask();
    healthBar.setMask(mask);
}

/**
 * " ... like tears in the rain"
 *  - Roy Batty
 */
function loseLife(t) {
    dude.data.values.lives--;
}

/**
 * Updates the health displays
 * Called when the lives property of the data of the dude is updated.
 * @param {Sprite} target The objject that had its data changed
 */
function updateHealthStatsDisplay(target) {
    // update the plain text 
    healthText.text = `Lives left: ${target.data.values.lives}`;

    // the width of one heart in the bar of hearts
    var oneHeartWidth = (158 / target.data.values.maxLives);
    
    // refresh the mask on the bar with hearts. A bit cumbersome but hey, if it looks good...
    heartsMaskGraphic.clear();
    heartsMaskGraphic.beginPath();
    heartsMaskGraphic.fillRect(0, 0, oneHeartWidth * target.data.values.lives, 14);
    heartsMaskGraphic.closePath();

    // update the healthbar
    healthBarMaskGraphic.clear();
    healthBarMaskGraphic.beginPath();
    healthBarMaskGraphic.fillRect(0, 0, 100 * (target.data.values.lives / target.data.values.maxLives), 10);
    healthBarMaskGraphic.closePath();
}

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
                y: 200,
            },
            debug: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
