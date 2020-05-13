/** Width of Phaser canvas */
let width = 800;
/** Height of Phaser canvas */
let height = 600;

/** Configuration for Phaser */
let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    physics: {
        default : "arcade",
        arcade : {
            gravity : {
                y : 200
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

/** Create new Phaser game object */
let game = new Phaser.Game(config);

/**Create object that we want to use in multiple functions */
let player = null;
let healthBar = null;
let cursors = null;
let deltaTime = 0;

/** 
 * Phaser preload function, prepare all assets here 
 * */
function preload()
{
    this.load.spritesheet('skeleton', 'assets/BODY_skeleton.png', { frameWidth: 64, frameHeight: 64 });

     // load the tileset
     // Must be same name as tileset in map
     this.load.image("base", "assets/tileset.png"); 

     // load the json file created in Tiled
     this.load.tilemapTiledJSON("map", "assets/map.json");
}

/** 
 * Create all gameobject here 
 * */
function create()
{
    //Create map (including tilesets, layers and collisions)
    var map = this.make.tilemap({key: "map"});
    var tileset = map.addTilesetImage("base");

    //Same name as layer in map
    var mainLayer = map.createStaticLayer("world", tileset);
    var spikeLayer = map.createStaticLayer("spikes", tileset);

    mainLayer.setCollisionByProperty({collider : true});
    spikeLayer.setCollisionByProperty({collider : true});

    //Create player
    //Get first element from player layer.
    const playerObjects = map.getObjectLayer('player').objects;
    let playerObject = playerObjects[0];

    //Create sprite on the information from the object
    player = this.physics.add.sprite(playerObject.x + playerObject.width * 0.5, playerObject.y - playerObject.height * 0.5, 'skeleton');
    player.setCollideWorldBounds(true);

    //add health to player based on properties on editor
    const playerProperties = map.getObjectLayer('player').properties;
    playerProperties.forEach(property => {
        player.setData(property.name, property.value);
    });

    player.on("changedata-health", updateHealth);
    healthBar = this.add.text(10, 10, "Health: " + player.data.values.health);

    //Create cursors keys
    cursors = this.input.keyboard.createCursorKeys();

    //Setup physics
    this.physics.add.collider(player, mainLayer, tileCollide, null, null, this);
    this.physics.add.overlap(player, spikeLayer, spikeOverlap, null, null, this);
}

function updateHealth(parent, value, previousValue){
    healthBar.text = "Health: " + player.data.values.health;
}

function tileCollide(gameObject, tile, body){
}

function spikeOverlap(gameObject, tile, body){
    if(tile.properties.damage)
        player.data.values.health -= tile.properties.damage * deltaTime;
    if(player.data.values.health < 0)
        game.scene.scenes[0].scene.restart();
}

/** 
 * Update function for Phaser. Normal way of updating 
 * */
function update(time, deltaTimeMs)
{
    deltaTime = deltaTimeMs / 1000;

    player.setVelocityX(0);

    if(cursors.left.isDown){
        player.setVelocityX(-100);
    }

    if(cursors.right.isDown){
        player.setVelocityX(100);
    }
}