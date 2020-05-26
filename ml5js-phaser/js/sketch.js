/**
 * Demo of combining ml5js machine learning library and phaser 3
 * Tested with chrome, not working in safari, other browsers not tested
 * 
 * ml5js tracks a face with the webcam and sets some global variables for the position of the face
 * phaser reads the global variables and use them to position a sprite;
 * 
 * https://https://ml5js.org/
 */


// global vars
//for phaser
var logo;

//for m5js
let faceapi;
let video;
let detections;

//to communicate between phaser and m5js
let loopCount = 0;
let xface = 0;
let yface = 0;
let mouthOpen = 1;


/**
 * Load the single asset used
 */
function preload_phaser() {
  this.load.image("logo", "assets/phaser.png");
}

/**
 * places the logo onto the stage 
 */
function create() {
  logo = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, "logo");

  this.add.text(50,500,"Move your head to move the logo, open and close your mouth to scale");
}

/**
 * Reads the global vars xface and yface and positions the logo with them
 */
function update() {
  //get width and height of the camera view
  gameWidth = this.cameras.main.width;
  gameHeight = this.cameras.main.height;

  //scale -1 to 1 values for x and y to camerasize and place the sprite on that position
  logo.x = (-xface * gameWidth) + gameWidth / 2;
  logo.y = (yface * gameHeight) + gameHeight / 2;

  //set scale according to openness of the mouth
  logo.setScale(mouthOpen);
}

/**
* Init the game
*/
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      }
    }
  },
  scene: {
    preload: preload_phaser,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);


/**
 * ml5js part
*/

//print version of ml5js
console.log('ml5 version:', ml5.version);



// by default all options are set to true for face detection
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}


function setup() {
  //make the canvas small to reduce computation power needed by the detection algoritm.  
  createCanvas(180, 140);
  
  // create a capure object from the webcam
  video = createCapture(VIDEO);
  video.size(width, height);
 
  //start the face detection, the function modelReady when detection is ready to start
  faceapi = ml5.faceApi(video, detection_options, modelReady)

}

/**
 * function modelReady is called when detection is ready to start
 */
function modelReady() {
  //log some info
  console.log('ready!')
  console.log(faceapi)

  //start detection on current frame
  faceapi.detect(gotResults)

}

/**
 * 
 * @param {error} err parameter telling if an error occurred
 * @param {object} result information about the faces detected
 */
function gotResults(err, result) {
  //if an error occurred, show it
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
  detections = result;

  //update video image shown
  image(video, 0, 0, width, height);

  //draw detection in the image
  if (detections) {
    if (detections.length > 0) {
      //draw box around the face
      drawBox(detections)
      //draw moputh, nose etc
      drawLandmarks(detections)
      //set the global var for communication to phaser 
      setFaceXY(detections)
    }

  }
  //start new detection oni the next frame
  faceapi.detect(gotResults)
}

/**
 * set the global vars xface and yface for communication to phaser 
 * 
 * @param {object} detections object with all detected face params
 */
function setFaceXY(detections) {
  
  //calculate x and y position face
  const alignedRect = detections[0].alignedRect;
  const x = alignedRect._box._x
  const y = alignedRect._box._y
  const boxWidth = alignedRect._box._width
  const boxHeight = alignedRect._box._height
  const nx = x + boxWidth / 2;
  const ny = y + boxHeight / 2;
  xface = (nx / width * 2) - 1;
  yface = (ny / height * 2) - 1;

  //calculate how open the mouth is
  const mouth = detections[0].parts.mouth;

  let maxX=0;
  let maxY=0;
  let minX=width;
  let minY=height;
  for (let i = 0; i < mouth.length; i++) {
    let x = mouth[i]._x
    let y = mouth[i]._y
    if (x>maxX) maxX=x;
    if (y>maxY) maxY=y;
    if (x<minX) minX=x;
    if (y<minY) minY=y;
  }

  const deltaX = maxX-minX;
  const deltaY = maxY-minY;

  mouthOpen = deltaY/deltaX;
  
  console.log("xfaceP5=" + xface + " yfacep5=" + yface + " openenness=" + mouthOpen);

}
/**
 * draw a bounding box around the face
 * 
 * @param {object} detections object with all detected face params
 */
function drawBox(detections) {
  for (let i = 0; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x
    const y = alignedRect._box._y
    const boxWidth = alignedRect._box._width
    const boxHeight = alignedRect._box._height

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }

}

/**
 * draw all detected face landmarks
 * 
 * @param {object} detections object with all detected face params
 */
function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)

  for (let i = 0; i < detections.length; i++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);

  }

}
/**
 * Draw a shape from an object with points
 * 
 * @param {object} feature object with points of a shape
 * @param {bool} closed is the shape closewd or not
 */
function drawPart(feature, closed) {

  beginShape();
  for (let i = 0; i < feature.length; i++) {
    const x = feature[i]._x
    const y = feature[i]._y
    vertex(x, y)
  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }

}
