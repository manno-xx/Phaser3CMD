/**
 * (this is as complete a game the examles will become)
 * 
 * Continuation of the project Tilemap (https://github.com/manno-xx/Phaser3CMD/tree/master/Tilemap)
 *
 * Shout out to Mike Hadley for his excellent tutorials:
 * https://www.mikewesthad.com/blog.html
 * This demo relates is partly based on https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
 *
 * It involves:
 * - a tileset (png file with tiles, see assets folder)
 * - a tilemap (JSON created using Tiled (https://www.mapeditor.org))
 *   Download the (free) application and open the .tmx file from the assets folder.
 *   The tilemap uses multiple layers:
 *   * one for walls/platforms
 *   * one for the spikes
 *   The tileset has custom properties to make it easier to check collisions with individual tiles
 *
 * - the created tilemap was exported as a JSON file that Phaser can understand
 *
 * The tileset was created using TexturePacker (https://www.codeandweb.com/texturepacker)
 *
 * No fancy features used of either application or Phaser itself
 */

var dude;
var cursors;

/**
 * load the assets needed to display the map
 */
function preload() {
    // load it just like any other image
    // BUT!: the key (here 'tileset') MUST match the name of the tileset in Tiled
    this.load.image("tileset", "assets/tileset.png");
    // load the JSON file that contains the definition of the tilemap. Its format is defined by Tiled
    this.load.tilemapTiledJSON("map", "assets/examplemap.json");

    this.load.image("dude", "assets/phaser-dude.png");
}

/**
 * The building of the world:
 * 1. create the tilemap,
 * 2. add the image (tileset) to use for drawing the map
 * 3. have the map build the layers contained within
 * 4. tell Phaser which tiles are 'collidable'
 * 5. add collider for the tiles to collide with (platforms, walls)
 * 6. add overlap for tiles that'll hurt (spikes)
 *
 */
function create() {
    cursors = this.input.keyboard.createCursorKeys();

    // create the tilemap. It is not done by .add, but .make.
    // .make is used for elements that are not visualised (the tilemap itself is not visualised, its layers are)
    var map = this.make.tilemap({
        key: "map", // refers to the loaded JSON file (see above)
        tileWidth: 64, // the width of an individual tile
        tileHeight: 64, // the height of an individual tile
        width: 16, // the columns in the map
        height: 8, // the rows in the map
    });

    // the map is given a reference to the tileset to use ("tileset" is the key used in preload)
    var tileset = map.addTilesetImage("tileset");

    // this actually generated the visible map.
    // a map can contain multiple layers (these are created in Tiled)
    // creating the layer can be done by index or by name. I'd recommend by name
    // Parameters: The layer name, reference to the Phaser tileset as defined above, the x- and y- coordinates
    var platforms = map.createStaticLayer("baselayer", tileset, 0, 0);
    var trapLayer = map.createStaticLayer("death", tileset, 0, 0);

    platforms.setCollisionByProperty({ collidable: true });
    trapLayer.setCollisionByProperty({ damage: true });

    // let phaser find the object named "spawn-point" in the spawn point layer
    var spawnPoint = map.findObject("spawn point", finder, this);
    // spawn the dude there
    dude = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    // add the collider and overlap objects (they monitor the collisions and overlaps and act accordingly)
    this.physics.add.collider(dude, platforms);
    // the overlop object has the call backs set. They will execure when an overlap occurs
    this.physics.add.overlap(dude, trapLayer, doDamage, process, this);
}

/**
 * This function returns true if the tile under scruteny its name matches "Spawn-point"
 * 
 * @param {Game object} object The tile under scruteny
 * @param {Number} index The index of the item currently under scruteny
 * @param {Array} all The array of all objects to check
 */
function finder(object, index, all) {
    return object.name === "Spawn-point";
}

/**
 * Returns the value of the damage property of the tile
 * 
 * @param {Sprite} player The sprite of the player
 * @param {tile} tile The tile the player collides with
 */
function process(player, tile) {
    return tile.properties.damage;
}

/**
 * Executes if the player collides with a tile with the damage property set to true
 * @param {Sprite} player The player
 * @param {Game Object} tile The tile the player collides with
 */
function doDamage(player, tile) {
    console.log("player hits spike");
}

/**
 * Updates the game
 */
function update() {
    if (cursors.right.isDown) {
        dude.x++;
    }
    if (cursors.left.isDown) {
        dude.x--;
    }
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
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

// create the game based on the configuration above
var game = new Phaser.Game(config);
