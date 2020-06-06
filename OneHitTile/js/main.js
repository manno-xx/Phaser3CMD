/**
 * Demo of hitting a tile in a tilemap and only registering it once
 * Kinda similar to Unity's OnTriggerEnter2D, you register the start of the overlap
 *
 * Uses the this.physics.overlap() instead of this.physics.add.overlap().
 * The former can be used in update to check for an overlap and use its return value (true: yes, there is an overlap or false: no overlap)
 *
 *
 */
var dude;
var cursors;

// the layer with the spikes, a global variable so it is accessible from update too
var spikes;

// to keep track of the overlapping or not
var wasOverlapping = false;

function preload() {
    this.load.image("dude", "assets/phaser-dude.png");
    this.load.image("tileset", "assets/tileset.png");

    this.load.tilemapTiledJSON("mapdata", "assets/examplemap.json");

    // audio sprite. The mp3 and ogg file are in the json already, no need to refer to them here
    this.load.audioSprite("sfx", "assets/fx_mixdown.json");
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    var map = this.make.tilemap({ key: "mapdata" });
    var tileset = map.addTilesetImage("tileset");

    var platforms = map.createStaticLayer("baselayer", tileset);
    platforms.setCollisionByProperty({ collidable: true });

    spikes = map.createStaticLayer("spikes", tileset);

    dude = this.physics.add.sprite(100, 100, "dude");

    this.physics.add.collider(dude, platforms);
}

function update() {
    // the check for the overlap. The last parameter is a function to be called
    // that function can check the tile and tell phaser to not bother any further processing. When it returns false, Phaser registers no overlap
    var isOverlapping = this.physics.overlap(dude, spikes, null, checkTileType);

    // if no overlap is registered, remember that for the next frame/next check if there is an overlap
    if (!isOverlapping && wasOverlapping) {
        wasOverlapping = false;
    }

    // else, if there _is_ an overlap, AND there was none before, it is the first time the overlap was registered:
    // 1. remember that there is an overlap for the next frame/next check if there is an overlap
    // 2. take action! (here a sound and the dude flashing red)
    else if (isOverlapping && !wasOverlapping) {
        wasOverlapping = true;

        // play a sound
        this.sound.playAudioSprite("sfx", "squit");

        // make the character flash red indicating the severe pain the spikes deliver 🤕
        // not sure if this is the most optimal way to do this...
        // a tween that only tweens numbers, not properties of a game object
        // in the end, with the yoyo, it interpolates between two colors, white and red
        // the result is applied to the dude sprite as a tint
        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 60,
            onUpdate: function (tween) {
                var tint = Phaser.Display.Color.Interpolate.ColorWithColor(
                    Phaser.Display.Color.HexStringToColor("#FFFFFF"),
                    Phaser.Display.Color.HexStringToColor("#FF0000"),
                    100,
                    tween.getValue()
                );

                dude.setTint(Phaser.Display.Color.ObjectToColor(tint).color);
            },
            yoyo: true,
            repeat: 2,
        });
    }

    // the basic controls of the character moving and jumping (yes, the tile spikes are impossible to avoid at the top floor)
    dude.setVelocityX(0);

    if (cursors.left.isDown) {
        dude.setVelocityX(-90);
    }
    if (cursors.right.isDown) {
        dude.setVelocityX(90);
    }
    if ((cursors.up.isDown || cursors.space.isDown) && dude.body.onFloor()) {
        dude.setVelocityY(-300);
    }
}

/**
 * Process callback for the overlap check.
 * Checks if tile has a specific property of interest set.
 * Returns true if it does. Actually, it returns the value of the property since it is a boolean anyway.
 *
 * @param {Sprite} dude The dude overlapping with a tile
 * @param {Tile} tile The tile the overlap is registered with
 */
function checkTileType(dude, tile) {
    return tile.properties.hurtful;
}

/**
 * The game config referencing the three functions above in its scene property
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

var game = new Phaser.Game(config);
