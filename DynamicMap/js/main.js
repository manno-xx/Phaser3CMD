/**
 * Demo of a dynamic tilemap layer
 * 
 * In this demo the spike tile is removed when the dude hits it.
 * The removal is done with an animation (rememeber it is better to make it clear things are changing?)
 * The animation is a tween that yoyos a few times and when the tween is done, the tile is really removed
 * 
 * The distinction if the tile can be removed is made using one of the properties set in Tiled. in this case 'fadable'
 * There is another property, 'isFading', that is set when it starts fading. Just so to not start the animation if it is already running.
 * 
 *  
 */
var dude;
var cursors;

function preload(){
    this.load.image("dude", "assets/phaser-dude.png");
    this.load.image("tileset", "assets/tileset.png");

    this.load.tilemapTiledJSON("mapdata", "assets/examplemap.json");
}

function create(){

    cursors = this.input.keyboard.createCursorKeys();
    
    var map = this.make.tilemap({key: "mapdata"});
    var tileset = map.addTilesetImage("tileset");

    var platforms = map.createStaticLayer("baselayer", tileset);
    platforms.setCollisionByProperty({collidable: true});

    var spikes = map.createDynamicLayer("spikes", tileset);

    dude = this.physics.add.sprite(100, 100, "dude");

    this.physics.add.collider(dude, platforms);
    this.physics.add.overlap(dude, spikes, touchSpike, checkProperties, this);
}

/**
 * check if tile:
 * 1. is a tile from a tileset (not -1 as an index),
 * 2. and has the fadable property set to true
 * 
 * @param {*} dude The dude
 * @param {*} tile THe tile
 */
function checkProperties(dude, tile){
    return tile.index > -1 && tile.properties.fadable;
}

/**
 * Callback for the overlap between dude and a layer from the Tilemap
 * 
 * @param {Sprite} dude The dude
 * @param {Tile} spikeTile The tile the dude walked onto
 */
function touchSpike(dude, spikeTile){
    // if the tile is not already fading, set things in motion to make it fade and disappear
    if(!spikeTile.properties.isFading){

        // set that it is currently fading
        spikeTile.properties.isFading = true;

        // start the tween, calling 'removeTile' when tween is complete
        this.tweens.add({
            targets: spikeTile,
            duration: 80,
            repeat: 3,
            yoyo: true,
            props: {
                alpha: {
                    value: 0
                }
            }
        }).on('complete', removeTile);
    }
}

/**
 * Call back for the 'complete' event of the tween
 * 
 * @param {tween} tween The tween that triggered this call back
 * @param {ARray} targets The tweened objects
 */
function removeTile(tween, targets){
    targets[0].index = -1;
}


function update(){

    dude.setVelocityX(0);

    if(cursors.left.isDown){
        dude.setVelocityX(-60);
    }
    if(cursors.right.isDown){
        dude.setVelocityX(60);
    }
    if(cursors.space.isDown && dude.body.onFloor()){
        dude.setVelocityY(-300);
    }
}

/**
 * The game config referencing the three functions above in its scene property
 */
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 200 
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
