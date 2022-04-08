var database = firebase.database();
var player = database.ref('player/');
var rightBuffer;
var middleBuffer;
var leftBuffer;
var button;
var icecreamButton;
var score;

function setup() {
  createCanvas(1200, 400);
  rightBuffer = createGraphics(400, 400);
  middleBuffer = createGraphics(400, 400);
  leftBuffer = createGraphics(400, 400);

  score = 0;
  
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  var størelse = (windowWidth - width)/ 0.333;
  //cnv.position(x, y);

  button = createButton("database");
  button.mousePressed(databaseTest);

  icecreamButton = createButton("ice cream");
  icecreamButton.mousePressed(increaseScore);
}

function increaseScore(){
  score++;
}

function databaseTest(){
  console.log(score);
  player.push(score);
}


function draw() {
  //background(220);
  
  drawLeftPannel();
  drawMiddlePannel();
  drawRightPannel();

  image(leftBuffer, 0, 0);
  image(middleBuffer, 400, 0);
  image(rightBuffer, 800, 0);
  
}

function drawLeftPannel(){
  leftBuffer.background(100, 255, 255);
  leftBuffer.fill(0, 0, 0);
  leftBuffer.textSize(32);
  leftBuffer.text(score, 50, 50);
}

function drawMiddlePannel() {
  middleBuffer.background(255, 255, 100);
}

function drawRightPannel() {
  rightBuffer.background(255, 100, 255);
  rightBuffer.fill(0, 0, 0);
  rightBuffer.textSize(32);
  rightBuffer.text("This is the right buffer!", 50, 50);
}
