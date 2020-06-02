/**
 * Demo of an audiosprite
 * 
 * Pressing the 1, 2 or 3 keys plays a sample from the audio sprite
 * 
 * Pressing up and down arrow keys set the volume.
 * The volume is shown using a health bar kinda construction (general progress bar actually)
 * 
 * Safari has issues with setting the volume...
 */

var volumeBar;
var volumeBarMask;

/**
 * Load the audio
 */
function preload() {
    this.load.audioSprite("sfx", "assets/fx_mixdown.json", [
        "assets/fx_mixdown.mp3",
        "assets/fx_mixdown.ogg",
    ]);

    this.load.image("bar", "assets/healthbar.png");
}

/**
 * On create:
 * - add an instructional text
 * - add audio files (3fx, 1 background music)
 * - instantiate keyboard input for
 *   - volume changes
 *   - 'sound board' functionality
 * - have some (fairly useless) functionality to show the audio level in the console after it is being set
 * - make sure audio plays after player clicks once
 */
function create() {
    cursors = this.input.keyboard.createCursorKeys();

    this.add
        .text(
            400,
            300,
            "Press 1, 2, 3 for samples\nUp and down arrows to change volume\nClick in the window to make sure audio starts",
            {
                font: "bold 32px Arial",
                fill: "#666",
                align: "center",
            }
        )
        .setOrigin(0.5);

    // sounds from the audio sprite
    var one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    one.on("down", playBossHit, this);

    // sounds from the audio sprite
    var two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    two.on("down", playMeow, this);

    // sounds from the audio sprite
    var three = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.THREE
    );
    three.on("down", playPing, this);

    var up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    up.on("down", increaseVolume, this);
    var down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    down.on("down", lowerVolume, this);

    this.sound.on("volume", volumeUpdated, this);
    
    buildVolumeBar(this);
}

/**
 * decrease volume by 0.1
 */
function lowerVolume() {
    this.sound.setVolume(Math.max(0, this.sound.volume - 0.1));
}
/**
 * increase volume by 0.1
 */
function increaseVolume() {
    this.sound.setVolume(Math.min(1, this.sound.volume + 0.1));
}
/**
 * Call back for volume change
 * Outputs to the console and updates the volume bar
 */
function volumeUpdated() {
    console.log(`Volume is now set at ${this.sound.volume}`);
    updateVolumeBar(this);
}

//
// The three functions that play a sample from the Audio Sprite
//
//

function playBossHit() {
    this.sound.playAudioSprite("sfx", "boss hit");
}
function playMeow() {
    this.sound.playAudioSprite("sfx", "meow");
}
function playPing() {
    this.sound.playAudioSprite("sfx", "ping");
}

function update() {}

/**
 * Updates the volume bar to reflect the current volume setting
 * @param {Object} scene The scene for the proper context
 */
function updateVolumeBar(scene){
    console.log(`Volume is: ${scene.sound.volume}`);

    // make the graphic that will serve as a mask of the bar with hearts.
    volumeBarMask.clear();
    volumeBarMask.fillStyle(0xffffff);
    volumeBarMask.beginPath();
    volumeBarMask.fillRect(0, 0, scene.sound.volume * 100, 10);
    volumeBarMask.closePath();
}

/**
 * Builds the volume bar initially (and updates it to reflect the volume properly)
 * 
 * @param {Object} scene The scene for the proper context
 */
function buildVolumeBar(scene) {

    // the image of the 10 hearts
    // origin is set at 0, 0 because the mask used has its origin at 0, 0 too
    volumeBar = scene.add.image(400, 20, "bar");
    volumeBar.setOrigin(0);

    // make the graphic that will serve as a mask of the bar with hearts.
    volumeBarMask = scene.make.graphics({ x: 400, y: 20 });
    
    // create a mask and apply it to the image of the hearts
    var mask = volumeBarMask.createGeometryMask();
    volumeBar.setMask(mask);

    updateVolumeBar(scene);
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
