/**
 * Parallax demo using a tileSprite combined with tilemap (from Tiled) and moving camera
 * For parallax:
 * With a tileSprite without moving camera, 
 *      the tileSprite's tilePosition can be changed based on (a fraction) of the speed (or in the end: position) of the player
 * 
 * With a moving camera (this demo), the tileSprite's tilePosition becomes dependent on the camera's position (in the world)
 * 
 * The variable background contains the tilesSprite it contains the repeating image and is as wide and high as the Tile map
 *   (placing it is a bit awkward because)
 * 
 */

var dude;
var cursors;

// the tilesprite
var background;
// the factor by which it moves
var backgroundScrollFactor = -0.3;

function preload() {
    this.load.image("dude", "assets/phaser-dude.png");
    this.load.image("tiles", "assets/tileset.png");
    this.load.tilemapTiledJSON("map", "assets/examplemap.json");

    // https://opengameart.org/content/seamless-space-stars
    this.load.image("sky", "assets/seamless space.PNG");
}

function create() {
    // the keyboard
    cursors = this.input.keyboard.createCursorKeys();

    // the map
    var map = this.make.tilemap({key: "map"});
    var tileset = map.addTilesetImage("tiles");

    // the tile sprite containing the bg
    // first get the center of the tileMap
    var mapWidthInPixels = map.width * map.tileWidth;
    var mapHeightInPixels = map.height * map.tileHeight;
    // then place the tileSprite there at the width and height of the map
    background = this.add.tileSprite(map.width * map.tileWidth * 0.5, map.height * map.tileHeight * 0.5, map.width * map.tileWidth, map.height * map.tileHeight, "sky");
    
    // the layer of the tilemap
    var tileLayer = map.createStaticLayer("baselayer", tileset, 0, 0);
    tileLayer.setCollisionByProperty({collidable: true});

    // the dude and the following camera
    dude = this.physics.add.sprite(400, 100, "dude");
    this.cameras.main.setBounds(0, 0, map.width * map.tileWidth, map.height * map.tileHeight);
    this.cameras.main.setDeadzone(200, 150);
    this.cameras.main.startFollow(dude, true, 0.02, 0.02);

    // let the character stand on platforms
    this.physics.add.collider(dude, tileLayer);
}

function update() {

    // moving the dude
    // making sure he cannot change direction mid air and cannot double jump
    if(dude.body.onFloor())
        dude.body.velocity.x = 0;

    if (cursors.left.isDown && dude.body.onFloor()) {
        dude.body.velocity.x = -100;
    }
    if (cursors.right.isDown && dude.body.onFloor()) {
        dude.body.velocity.x = 100;
    }
    if (cursors.space.isDown && dude.body.onFloor()) {
        dude.body.velocity.y = -300;
    }

    // make the tile sprite move in the opposite direction of the camera
    // get the camera's position and apply it to the tilesprite with a choosen factor
    background.tilePositionX = this.cameras.main.scrollX * backgroundScrollFactor;
    background.tilePositionY = this.cameras.main.scrollY * backgroundScrollFactor;
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 100,
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