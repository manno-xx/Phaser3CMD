/**
 * This demonstrates the following:
 * - how to build a world based on a tilemap with multiple layers
 * - how to make sure certain parts of the tilemap can be collided with
 * - how to make the camera follow a sprite
 *  
 */
var dude;
var cursors;
var speed = 80;

function preload(){

    // the dude (duder, el duderino, his dudeness)
    this.load.image("dude", "assets/phaser-dude.png");
    // load the tileset
    this.load.image("world", "assets/mapPack_tilesheet.png");
    // load the json file created in Tiled
    this.load.tilemapTiledJSON("level", "assets/CameraFollow.json");
}

function create(){

    // the basic input
    cursors = this.input.keyboard.createCursorKeys();

    // Tilemap
    // 1. make the tilemap
    // 2. add tileset to map (after all, it needs to know what tileset to use for drawing)
    // 3. create the layers (here static layers because they do not update during the game)
    var map = this.make.tilemap({key: "level"});
    
    var tileset = map.addTilesetImage("world");

    var surfaceLayer = map.createStaticLayer("surface", tileset, 0, 0);
    var treeLayer = map.createStaticLayer("trees", tileset, 0, 0);
    
    // Physics:
    // 1. let the physics system create a sprite
    // 2. let the layer of trees be 'collidable' for the tiles that have that property set to true
    // 3. tell phaser to watch out for collisions between the character sprite and the collidable parts of the tree layer
    dude = this.physics.add.sprite(800, 600, "dude");
    treeLayer.setCollisionByProperty({collidable: true});
    this.physics.add.collider(dude, treeLayer);


    console.log(this.cameras.main.scrollX);

    // Camera:
    // 1. limit its movements to the map's boundaries
    // 2. Tell the camera to ignore the character's movement if it is in the center of the screen (deadzone)
    // 3. tell the camera which sprite to follow with a certain drag
    this.cameras.main.setBounds(0, 0, map.width * map.tileWidth, map.height * map.tileHeight);
    this.cameras.main.setDeadzone(200, 150);
    this.cameras.main.startFollow(dude, false, 0.1, 0.1);

    console.log(this.cameras.main.scrollX, this.cameras.main.centerX);

    // Tween
    // add text, fade out using tween, remove from scene after fade is done
    var text = this.add.text(dude.x, dude.y - 50, "use space bar and arrow keys").setOrigin(0.5, 0.5);
    var tween = this.tweens.add({
        delay: 5000,
        targets: text,
        alpha: 0,
        ease: 'Power1',
        duration: 1000
    });
    tween.on('complete', fadeDone); 
}

/**
 * Removes the tweened game object
 * @param {Twween} tween The tween that triggered this event handler
 * @param {Array} targets The targets that were tweened by the tween
 */
function fadeDone(tween, targets){
    targets[0].destroy();
}

function update(){

    // reset the velocity
    dude.body.setVelocity(0, 0);

    // set the velocity depending on which keys are pressed
    if(cursors.right.isDown){
        dude.body.setVelocityX(1);
    }
    if(cursors.left.isDown){
        dude.body.setVelocityX(-1);
    }
    if(cursors.down.isDown){
        dude.body.setVelocityY(1);
    }
    if(cursors.up.isDown){
        dude.body.setVelocityY(-1);
    }

    // make sure diagonal movement is at same speed as straight
    dude.body.velocity.normalize();
    dude.body.velocity.scale(speed);

    // get an overview of the map by pressing space
    if(cursors.space.isDown){
        this.cameras.main.setZoom(0.3);
    }
    else{
        this.cameras.main.setZoom(1);
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
            debug: true,
            debugShowBody: true,
            debugShowVelocity: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
