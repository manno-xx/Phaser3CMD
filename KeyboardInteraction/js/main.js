/**
 * Demo of implementing a one-shot key event
 * 
 * When you do not want Phaser to respond 60 times per second as long as a key is being held down but only respond once, you could use the setup in this demo.
 * 
 */

var fire;

/**
 * the create function sets up the space bar and the function to be called as a result of its press
 *
 */
function create() {
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // A little bit of 'theory':
    // 'this' here refer to the Phaser scene
    // in the function shoot (referred to below) 'this' by default refers to something else if you write the event handler like: fire.on('down', shoot);
    // Meaning: it is a bit hard to refer to the Phaser scene from that function.
    // Phaser fixes that by means of the third parameter: one that specifies the context for the listener
    // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.Key.html#on__anchor

    // first: bind the shoot function to this context
    fire.on('down', shoot, this);
}

/**
 * Handler for the space bar press.
 * Just changes the background color
 */
function shoot(e) {

    // just to have something to see...
    var color = Phaser.Display.Color.RGBToString(
        Phaser.Math.Between(0, 256),
        Phaser.Math.Between(0, 256),
        Phaser.Math.Between(0, 256),
        "#"
    );
    
    this.cameras.main.setBackgroundColor(color);
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        create: create
    }
};

// create the game based on the configuration above
var game = new Phaser.Game(config);
