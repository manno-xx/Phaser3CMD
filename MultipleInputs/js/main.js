/**
 * demo using multiple input sources (mouse and keyboard) to control a tank
 * 
 * controls:
 * 
 * [W] - forward
 * [S] - backward
 * [mouse] - turn
 * [left mouse button] - shoot
 * 
 */

const TANK_SPEED = 100;
const BULLET_SPEED = 350;
const KNOCKBACK = -1000;

var tank, bullets, rotationToPointer;

/**
 * preload graphics (source: https://kenney.nl/assets/topdown-tanks-redux)
 */
function preload() {
    this.load.image("tank", "assets/tank_green.png");
    this.load.image("bullet", "assets/bulletDark1_outline.png")
}

/**
 * initialize input to be used
 * initialize player
 */
function create() {
    setupInput(this);
    setupPlayer(this);
}

/**
 * respond to user input by moving the tank
 */
function update() {
    handleInput(this);
}

/**
 * bind the keys used in this application
 * @param {*} context 
 */
function setupInput(context) {
    // W key to move forward and S key to move backward
    cursors = context.input.keyboard.addKeys({  up: Phaser.Input.Keyboard.KeyCodes.W,
                                                down: Phaser.Input.Keyboard.KeyCodes.S});

    // left mouse button for shooting
    context.input.on("pointerdown", shoot, context);
}

/**
 * shoot bullets towards the mouse pointer
 * @param {*} e 
 */
function shoot(e) {

    var bullet = bullets.getFirstDead();
    
    if (bullet) {
        // enable bullet on the position of the tank
        bullet.enableBody(true, tank.x, tank.y, true, true);
        // circle collider
        bullet.body.setCircle(15, -8, 0);
        // rotate the graphic so it faces the mouse pointer when firing
        bullet.setRotation(rotationToPointer + Math.PI/2);
        // move the bullet in the direction of the mouse pointer when firing
        this.physics.moveTo(bullet, game.input.mousePointer.x, game.input.mousePointer.y, BULLET_SPEED);
    }

    //knockback effect
    this.physics.moveTo(tank, game.input.mousePointer.x, game.input.mousePointer.y, KNOCKBACK);
}

/**
 * create the tank 
 * @param {*} context 
 */
function setupPlayer(context) {
    // player sprite
    tank = context.physics.add.sprite(300, 300, "tank");
    // circle collider
    tank.body.setCircle(45, -8, 0);
    // create the bullets the player can fire
    setupBullets(context);
}

/**
 * create the initial group of bullets used when firing with the tank
 * @param {*} context 
 */
function setupBullets(context) {
    // create group with bullets
    bullets = context.physics.add.group({
        active: false,
        key: "bullet",
        quantity: 50,
        collideWorldBounds: true,
        setXY: {
            x: 0,
            y: 0,
        },
    });

    // disable all bullets by default
    bullets.getChildren().forEach(function (bullet) {
        bullet.body.onWorldBounds = true;
        bullet.disableBody(true, true);
    });

    // tell phaser that the function clearBullet() needs to be called when a collision with the world bounds takes place
    context.physics.world.on("worldbounds", clearBullet, context);
}

/**
 * disable bullets when they are no longer needed
 * @param {*} bullet 
 */
function clearBullet(bullet) {
    if (bullets.contains(bullet.gameObject)) {
        bullet.gameObject.disableBody(true, true);
    }

    //flash and screen shake when bullets hit world bounds
    cameraEffects(this);
}

/**
 * flash and screen shake
 */
function cameraEffects(context) {
    context.cameras.main.flash(100, 255, 255, 255, true);
    context.cameras.main.shake(200, 0.005, true);
}

/**
 * handle mouse and keyboard input
 * @param {*} context 
 */
function handleInput(context) {
    // calculate rotation to face mouse pointer
    rotationToPointer = Phaser.Math.Angle.Between(tank.x, tank.y, game.input.mousePointer.x, game.input.mousePointer.y);
    // set tank sprite to face mouse pointer
    tank.setRotation(rotationToPointer - Math.PI/2);

    // handle keyboard input
    if (cursors.up.isDown) {
        context.physics.moveTo(tank, game.input.mousePointer.x, game.input.mousePointer.y, TANK_SPEED);
    } else if (cursors.down.isDown) {
        context.physics.moveTo(tank, game.input.mousePointer.x, game.input.mousePointer.y, -TANK_SPEED);
    } else {
        tank.setVelocity(0);
    }
}

// configuration of the game
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y:0 },
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0xff00ff,
            debugStaticBodyColor: 0xffffff,
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