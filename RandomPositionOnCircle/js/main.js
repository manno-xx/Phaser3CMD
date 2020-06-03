/**
 * Generate a random position at a specified distance from a given point
 * (= generates a point on the circumference of a circle)
 *
 * In the demo, the new dots will be placed on the circle drawn
 * The most important part of the demo comes from https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Circle.html
 * 
 * 
 *  
 * Use case: when placing enemies around a character, 
 *   this could be used to place them just outside the screen and then let them move in
 *
 */

// variables 'defining' the circle (position and radius)
var circle = { x: 400, y: 300, radius: 300 };

function create() {
    // generate the circle shape, just for visual confirmation
    drawVisualisation(this);

    // generate a random dot within the donut on a click
    this.input.on("pointerdown", randomCirclePosition, this);
}

/**
 * Get a random position on the circumference of a circle and place a dot there
 */
function randomCirclePosition() {
    // create circle based on the variables above. We want a point on its circumference
    var tempCircle = new Phaser.Geom.Circle(circle.x, circle.y, circle.radius);

    // get a point on the cicumference of the circle above
    // the second parameter defines the angle at which to place the point
    // 0 is at the 'start of the circle', 0.5 is halfway, 1 is at the end (or start)
    // Math,random generates a random number between 0 and 1 (standard JavaSript functionality)
    var position = Phaser.Geom.Circle.GetPoint(circle, Math.random());

    // draw a dot at the generated position
    this.add.circle(position.x, position.y, 5, 0xff00ff);
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
    g.strokeCircle(circle.x, circle.y, circle.radius);
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
