/**
 * Demo of a basic drawing of tile maps:
 *
 * It involves:
 * - a tileset (png file with tiles, see assets folder)
 * - a tilemap (JSON created using Tiled (https://www.mapeditor.org))
 *   Download the (free) application and open the .tmx file from the assets folder.
 * - the created tilemap was exported as a JSON file that Phaser can understand
 *
 * The tileset was created using TexturePacker (https://www.codeandweb.com/texturepacker)
 *
 * No fancy features used of either application or Phaser itself
 */

/**
 * load the assets needed to display the map
 */
function preload() {
    // load it just like any other image
    // BUT!: the key (here 'tileset') MUST match the name of the tileset in Tiled
    this.load.image("tileset", "assets/tileset.png");
    // load the JSON file that contains the definition of the tilemap. Its format is defined by Tiled
    this.load.tilemapTiledJSON("map", "assets/examplemap.json");
}

/**
 * The building of the world:
 * 1. create the tilemap,
 * 2. add the image (tileset) to use for drawing the map
 * 3. and have the map build the layer contained within
 */
function create() {
    // create the tilemap. It is not done by .add, but .make.
    // .make is used for elements that are not visualised (the tilemap itself is not visualised, its layers are)
    var map = this.make.tilemap({
        key: "map",                 // refers to the loaded JSON file (see above)
        tileWidth: 64,              // the width of an individual tile
        tileHeight: 64,             // the height of an individual tile
        width: 16,                  // the columns in the map
        height: 8,                  // the rows in the map
    });

    // the map is given a reference to the tileset to use ("tileset" is the key used in preload)
    var tileset = map.addTilesetImage("tileset");

    // this actually generated the visible map.
    // a map can contain multiple layers (these are created in Tiled)
    // creating the layer can be done by index or by name. I'd recommend by name
    // Parameters: The layer name, reference to the Phaser tileset as defined above, the x- and y- coordinates
    var layer = map.createStaticLayer("baselayer", tileset, 0, 0);
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
    },
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
