/**
 * Demo that demonstrates the use of object layers in Tiled and their transfer to Phaser
 * 
 * Object layers can be used to add elements to the map that are not part of the tilamap
 *   Think of:
 *   - objects to pick up (health, ammo), 
 *   - enemies that roam the world or
 *   - a spawnpoint of the player
 * 
 * In this demo the "objects to pick up" is demonstrated using coins
 * A demo of a spawnpoint of a player is in the "platformer" project on Github
 * 
 */


/**
 * Load the needed assets
 */
function preload(){
    this.load.spritesheet("coinSpritesheet", "assets/coin_rot_anim.png", {
        frameWidth: 32,
        frameHeight: 32
    });

    // load the tileset. Make sure its key (here 'tileset') matches the name it had in the Tiled UI
    this.load.image("tileset", "assets/tileset.png");

    // Load the map definition as exported from Tiled. It is assigned the key 'map'
    this.load.tilemapTiledJSON("map", "assets/Level.json");
}

/**
 * 
 */
function create(){

    var config = {
        key: "coin-rotate",
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers("coinSpritesheet", {start: 0, end: 5})
    };
    this.anims.create(config);

    // create the map based on the map loaded above. 
    // That map was assigned the key 'map', so use that here as a reference
    var map = this.make.tilemap({
        key: "map"
    });

    // add the loaded tileset to the map. Make sure that the key matches the one used above
    var tileset = map.addTilesetImage("tileset");

    // create the layer as it was drawn in Tiled
    var platformLayer = map.createStaticLayer("platforms", tileset, 0, 0);

    // Get a reference to all the objects from the object layer called 'coins'
    // The objects to look for have the name 'coin'.
    // THe sprites that are generated will use the spritesheet loaded using the key: coinSpritesheet (see function preload)
    // the generated sprites will be stored in an array (here the variable coinsArray)
    var coinsArray = map.createFromObjects("coins", "coin", {key: "coinSpritesheet"});

    // tell Phaser to add all the coins to the Physics simulation
    this.physics.world.enable(coinsArray);

    // following are two options for the 'behaviour of the coins

    // OPTION 1: coins are not under influence of gravity or other forces that make it move. (the coins.body.moves = false part) 
    //           This allows to use tweens to move the coins. So, a tween is added for each coin
    coinsArray.forEach(function(coin){
        coin.play("coin-rotate");
        coin.body.moves = false;
        this.tweens.add({
            targets: coin,
            duration: 1000,
            repeat: -1,
            yoyo: true,
            props:{
                y: {value: coin.y + 10}
            }
        });
    }, this);

    // OPTION 2: The coins only play the rotation animation, 
    //           but instead of a tween they fall under the influence of gravity and are exposed to other possible forces
    // coinsArray.forEach(function(coin){
    //     coin.play("coin-rotate");
    // });

    // indicate which tiles in the platformLayer can be collided with
    // this is based on a property of the tiles as set in Tiled (see that project)
    platformLayer.setCollisionByProperty({collidable: true});

    // let Phaser check for collisions between the array of coins and the platform layer's content
    this.physics.add.collider(coinsArray, platformLayer);
}

/**
 * Nothing to see here, keep moving please
 */
function update(){

}

/**
 * The game's configuration
 * Also adding some visulisation of the physics elements for debuggin purposes
 */
var gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
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
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(gameConfig);