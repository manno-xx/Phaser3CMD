/** Width of Phaser canvas */
let width = 800;
/** Height of Phaser canvas */
let height = 600;

/** Configuration for Phaser */
let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

/** Create new Phaser game object */
let game = new Phaser.Game(config);

/**
 * Nothing to preload
 */
function preload(){
}

/**
 * Create a button and a UI score.
 * Create the UI score in such a way that the button doesn't need to know
 * about the UI. This is called Separation of Concerns. The button shouldn't
 * need to worry about the UI.
 */
function create(){
    const button = createButton(this);
    createUI(this, button);
}

/**
 * Create a simple button, that tracks how often it is clicked.
 * In a game this could be a kill counter, or health.
 * @param {Object} scene Scene to create button in. 
 * @returns Created Text object, that track clickCount in data.
 */
function createButton(scene){
    //Create button and set start data at 0
    const clickButton = scene.add.text(100, 100, 'Click me!', { fill: '#0f0' });
    clickButton.setData('clickCount', 0);

    //Create a hover style for the button
    clickButton.on("pointerover", () => {
        clickButton.setStyle({ fill: '#ff0'});
    })

    clickButton.on("pointerout", () => {
        clickButton.setStyle({ fill: '#0f0'});
    })

    //Increase clickCount in data when we click on text.
    //This uses the shorthand for accessing data.
    clickButton.setInteractive().on('pointerdown', () => {
        clickButton.data.values.clickCount++;
    });

    //Return button, so we can use this to connect UI.
    return clickButton;
}

/**
 * This makes the UI element. It is 'connected' to target. In this case
 * the Text object, but could be any gameObject as long as it uses clickCount
 * to track data.
 * @param {Object} scene Scene to create UI element in. 
 * @param {Object} target GameObject to connect UI element to. 
 */
function createUI(scene, target){
    const scoreText = scene.add.text(100, 20, 'Score: ' + target.data.values.clickCount);
    target.on("changedata-clickCount", function(origin){
        scoreText.text = "Score: " + origin.data.values.clickCount;
    });
}

/**
 * Everything is event driven. This means there isn't a need to do anything in
 * update.
 */
function update(){
}