/**
 * Generate a position (a vector2) at a range away from a given point
 *
 * In the demo, the new dots will never be placed outside the donut shape
 * 
 * Use case: when placing enemies around a character, 
 *   you don't want to place them so close it is (almost) an instant kill
 *
 */

// variables 'defining' the donut (position and radiuses)
var donutCenter = { x: 400, y: 300 };
var donutInner = 100;
var donutOuter = 300;

function create() {
    // generate the donut shape for visual confirmation
    drawVisualisation(this);

    // generate a random dot within the donut on a click
    this.input.on("pointerdown", randomDonutPosition, this);
}

/**
 * 
 */
function randomDonutPosition() {
    // create 'empty' vector
    var v = new Phaser.Math.Vector2(0, 0);

    // use Phaser's functionality to give it a random angle and scale (length)
    Phaser.Math.RandomXY(v, Phaser.Math.Between(donutInner, donutOuter));

    // move the vector to the screen's center
    v.add(new Phaser.Math.Vector2(donutCenter.x, donutCenter.y));

    // draw a dot at that position
    this.add.circle(v.x, v.y, 5, 0xff00ff);
}

/**
 * Just draws a donut shape to confirm correct placement of random dots
 * 
 * @param {Object} scene The scene to draw onto
 */
function drawVisualisation(scene) {
    var g = scene.add.graphics();
    g.lineStyle(1, 0xff0000);
    g.beginPath();
    g.strokeCircle(donutCenter.x, donutCenter.y, donutInner);
    g.closePath();
    g.beginPath();
    g.strokeCircle(donutCenter.x, donutCenter.y, donutOuter);
    g.closePath();
}

/**
 * The game config referencing the three functions above in its scene property
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        create: create
    },
};

var game = new Phaser.Game(config);
