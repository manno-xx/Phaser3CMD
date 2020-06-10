/**
 * This demonstrates the use of multiple scenes.
 *
 * In Phaser you can create multiple scenes.
 * This, for instance, allows you to seperate the code between a menu and the actual game
 *
 * In this demo you have to imagine the game is spread ouyt over two scenes (a street and inside a building for instance)
 * 
 * From the street, you can go into a building. In that case, the street scene stops.
 * Back on the street, that scene starts anew. If you remove the stop command in the street scene, it will continue where it left off
 * 
 * When on the street and the timer runs out (visualised by the text reaching the bottom), it is game over
 * 
 * From the game over screen, you can get back to the main menu.
 * 
 */

/**
 * The menu scene
 */
var menu = {
    key: "menu",
    preload: function () {
        console.log("menu preload");
        this.load.image("button", "assets/button.png");
    },
    create: function () {
        console.log("menu create");
        this.add.text(400, 300, "Menu!").setOrigin(0.5);

        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add
            .image(100, 100, "button")
            .setInteractive({ useHandCursor: true })
            .on(
                "pointerdown",
                function () {
                    console.log("moving to the game scene");
                    this.scene.switch("game");
                },
                this
            );
    },
};

/**
 * The game scene
 * When you click the button, you go into a room/building
 * When the tween ends (and the text is at the bottom), it is game over and you navigate to that scene
 */
var game = {
    key: "game",
    init: function () {
        console.log("game init");
    },
    preload: function () {
        console.log("game preload");
    },
    create: function () {
        console.log("game create");

        this.levelDuration = 5000;
        this.levelEnd = new Date().getTime() + this.levelDuration;

        this.add.text(400, 200, "You are on the street. Click the button to go into a building\nWhen the time runs out, it is game over for you").setOrigin(0.5).setAlign('center');
        
        this.textField = this.add.text(400, 300, "time counter will appear here").setOrigin(0.5);
        
        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add
            .image(100, 100, "button")
            .setInteractive({ useHandCursor: true })
            .on(
                "pointerdown",
                function () {
                    console.log("moving to the game room scene");
                    this.scene.switch("gameRoom");
                    // this one is important! it makes the tween and timer etc stop
                    // if you don't, the timer continues where it left of before you entered the room
                    // which could mean a very swift game over
                    this.scene.stop();              
                },
                this
            );

        // just to make the text move down
        this.tweens.add({
            targets: this.textField,
            duration: this.levelDuration,
            y: 600,
            ease: "Linear",
        });
    },
    update: function () {
        var timeLeft = (this.levelEnd - new Date().getTime()) / 1000;

        this.textField.text = timeLeft.toFixed(2);

        if (timeLeft <= 0) {
            console.log("moving to the game over scene");
            this.scene.switch("gameOver");
            this.scene.stop();
        }
    },
};


/**
 * The room scene
 * Clicking the button makes you go onto the street again. 
 * The tweening text is just for kicks...
 * 
 */
var gameRoom = {
    key: "gameRoom",
    init: function () {
        console.log("gameRoom init");
    },
    preload: function () {
        console.log("gameRoom preload");
    },
    create: function () {
        console.log("ggameRoomame create");

        this.levelDuration = 5000;
        this.levelEnd = new Date().getTime() + this.levelDuration;

        this.textField = this.add.text(400, 300, "You are in a room. Click the button to go back onto the street").setOrigin(0.5);

        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add
            .image(100, 100, "button")
            .setInteractive({ useHandCursor: true })
            .on(
                "pointerdown",
                function () {
                    console.log("moving to the game over scene");
                    this.scene.switch("game");
                    this.scene.stop();
                },
                this
            );

        // just to make the text move down
        this.tweens.add({
            targets: this.textField,
            duration: this.levelDuration,
            y: 590,
            ease: "Linear",
        });
    },
    update: function () {
        
    },
};

/**
 * The game over scene
 * Clicking the button makes you navigate to the main manu again
 */
var gameOver = {
    key: "gameOver",
    create: function () {
        console.log("game over preload");
        this.add.text(400, 300, "Game Over!").setOrigin(0.5);

        // to be able to respond to input, a sprite or an image must be set to be interactive
        var button = this.add
            .image(100, 100, "button")
            .setInteractive({ useHandCursor: true })
            .on(
                "pointerdown",
                function () {
                    console.log("moving to the menu scene");
                    this.scene.switch("menu");
                },
                this
            );
    },
};

/**
 * The game config with a reference to both objects defined above.
 * The references to the objects are in an array as the value of the scenes property
 */
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
    scene: [menu, game, gameRoom, gameOver],
};

var game = new Phaser.Game(config);
