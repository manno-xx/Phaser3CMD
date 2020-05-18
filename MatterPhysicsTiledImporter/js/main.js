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
        default : "matter",
        matter : {
            gravity : {
                y : 2
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

/** 
 * Phaser preload function, prepare all assets here 
 * */
function preload()
{
    this.load.spritesheet('skeleton', 'assets/BODY_skeleton.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('blocks', 'assets/tileset.png', { frameWidth:64, frameHeight:64});

     // load the json file created in Tiled
     this.load.tilemapTiledJSON("map", "assets/map.json");
}

/** 
 * Create all gameobject here 
 * */
function create()
{
    this.matter.world.setBounds(0, 0, width, height);

    var map = this.make.tilemap({key: "map"});

    //Create player
    //Get all first object from player layer
    const playerObject = map.getObjectLayer('player').objects[0];
    //Offset position (editor sets pivot on corner, physics has pivot in center)
    offsetObjectPosition(playerObject);
    //Add physics sprite
    player = this.matter.add.sprite(playerObject.x, playerObject.y, 'skeleton');

    //Set scale and angle
    player.scaleX = playerObject.width / player.width;
    player.scaleY = playerObject.height / player.height;
    player.angle = playerObject.rotation;

    const blocks = map.getObjectLayer('blocks').objects;
    blocks.forEach(block => {
        //Offset position (editor sets pivot on corner, physics has pivot in center)
        offsetObjectPosition(block);
        //Add physics sprite
        sprite = this.matter.add.sprite(block.x, block.y, 'blocks');
        
        //Set scale and angle
        sprite.scaleX = block.width / sprite.width;
        sprite.scaleY = block.height / sprite.height;
        sprite.angle = block.rotation;

        //Set static, and set the correct frame for visual
        sprite.setStatic(true);
        sprite.setFrame(1);
    })

    player.setBounce(0.7);

    //Register event
    this.matter.world.on('collisionstart', callback);
}

/**
 * Changes the pivot for an object from the Tiled editor.
 * @param {Object} object Object from Tiled editor
 */
function offsetObjectPosition(object){
    const degToRad = Math.PI / 180;
    
    var offsetX = Math.cos(object.rotation * degToRad) * object.width * 0.5;
    var offsetY = Math.sin(object.rotation * degToRad) * object.width * 0.5;
    offsetX += Math.cos((-90 + object.rotation) * degToRad) * object.height * 0.5;
    offsetY += Math.sin((-90 + object.rotation) * degToRad) * object.height * 0.5;
    object.x += offsetX;
    object.y += offsetY;
}

/**
 * Event callback for the Collision Start Event
 * @param {Phaser.Physics.Matter.Events.CollisionStartEvent} event Information about the collision event
 * @param {MatterJS.BodyType} body1 First body in collision
 * @param {MatterJS.BodyType} body2 Second body in collison
 */
function callback(event, body1, body2){
    if(body1.gameObject == player)
        body2.gameObject.tint = 0xff0000;

    if(body2.gameObject == player.body)
        body1.gameObjec.tint = 0xff0000;
}

/**
 * 
 * @param {Number} time Current running time
 * @param {Number} deltaTimeMs Delta time since last frame
 */
function update(time, deltaTimeMs)
{

}