let catFrames = [];
let frameIndex = 0;

let catX, catY;
let smoothAngle = 0;

let stopTimer = 0; 

function preload() {
  catFrames[0] = loadImage("cat_1.png");
  catFrames[1] = loadImage("cat_2.png");
  catFrames[2] = loadImage("cat_3.png");
  catFrames[3] = loadImage("cat_4.png");
  catFrames[4] = loadImage("cat_5.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  catX = width / 2;
  catY = height / 2;
}

function draw() {
  
  for (let i = 0; i < height; i++) {
    let c = lerpColor(color(255, 240, 245), color(240, 250, 255), i / height);
    stroke(c);
    line(0, i, width, i);
  }

  // laser
  noStroke();
  for (let i = 10; i > 0; i--) {
    fill(255, 0, 0, 20);
    ellipse(mouseX, mouseY, i * 3);
  }

  let movement = dist(mouseX, mouseY, pmouseX, pmouseY);

  let frame;

  // smooth stopping logic
  if (movement > 0.5) {
    stopTimer = 10; // keep moving briefly after stopping
  } else {
    stopTimer--;
  }

  if (stopTimer > 0) {
    //  keep moving & animating
    catX += (mouseX - catX) * 0.05;
    catY += (mouseY - catY) * 0.05;

    let animSequence = [1, 2, 3, 4, 3, 2];
    frameIndex += 0.06;

    frame = catFrames[animSequence[Math.floor(frameIndex) % animSequence.length]];
  } else {
    //  finally sit
    frame = catFrames[0];
  }

  //  direction
  let targetAngle = atan2(mouseY - catY, mouseX - catX);
  smoothAngle = lerp(smoothAngle, targetAngle, 0.15);

  // shadow
  fill(0, 30);
  ellipse(catX, catY + 50, 90, 25);

  // draw cat
  push();
  translate(catX, catY);

  if (mouseX < catX) {
    scale(-1, 1);
  }

  let tilt = constrain(smoothAngle, -PI/4, PI/4);
  rotate(tilt);

  imageMode(CENTER);
  image(frame, 0, 0, 130, 130);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}