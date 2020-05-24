/**
 * Demo of drawing lives and using groups
 */

var lives;

function preload()
{
    this.load.image("dude", "images/phaser-dude.png");
}


function create() 
{
    // Create a group
    lives = this.add.group();
    // Add 9 sprites of type 'dude'. So 9 is the max we can show
    lives.createMultiple({ key: 'dude', frame: [0], quantity: 9 });
    // Set the position of the lives sprites. 16 is their x step.
    Phaser.Actions.SetXY(lives.getChildren(), 40, 40, 16);

    // Set up some testing keys
    key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);
    key9 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NINE);

    // Set initial lives
	setLives(3);
}

function update ()
{
    // Check for key presses
    if(key1.isDown) setLives(1);
    if(key5.isDown) setLives(5);
    if(key9.isDown) setLives(9);
}

/**
 * Set the amount of lives
 * @param {int} size The amount of lives to set to
 */
function setLives (size)
{
    // Loop through the group and set elements visible up to size, and invisible after that
    for(i = 0; i < lives.getLength(); i++){
        lives.setVisible(i<size, i);
    }
}

/**
 * The configuration of the game
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);
