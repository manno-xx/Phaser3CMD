/**
 * Example project for Parallax effect
 * Uses TileSPrites from phaser.
 *
 * TileSprites can
 * - contain repeating graphics / tileable patterns
 * - change the position of that graphic within the sprite as to make it appear to move
 *
 */

var gameWidth = 758;
var gameHeight = 567;

var speed = 1;

var background;
var mountains;

function preload() {
    this.load.image("mountains", "assets/mountains-tile.png");
    this.load.image("nebula", "assets/nebula.jpg");
}

/**
 * Adding the tileSprites
 * A tileSprite can be of any width or height. 
 * It is filled from top to bottom, left to right with the the image indicated by the last parameter
 * Therefore the image must be 'tilable' its bottom should fit to the top and its right to its left
 * 
 */
function create() {
    background = this.add.tileSprite(gameWidth * 0.5, gameHeight * 0.5, gameWidth, gameHeight, "nebula");

    var mountainRangeHeight = 307;

    mountains = this.add.tileSprite(
        gameWidth * 0.5,
        gameHeight - mountainRangeHeight * 0.5,
        gameWidth,
        mountainRangeHeight,
        "mountains"
    );
}

/**
 * Changing the tilePositionX depending on a variable (speed)
 * The background moves at a tenth of the speed of the maountain range
 * Tadaaaaaa: Parallax!
 */
function update() {
    background.tilePositionX += speed * 0.1;
    mountains.tilePositionX += speed;
}

/**
 * The game config...
 */
var config = {
    type: Phaser.AUTO,
    scale: {
        width: gameWidth,
        height: gameHeight,
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
