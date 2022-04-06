var database = firebase.database();
var player = database.ref('player/');
var cnv1;
var cnv2;
var cnv3;
var button;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  cnv1 = createGraphics(350, windowHeight);
  cnv2 = createGraphics(350, windowHeight);
  cnv3 = createGraphics(350, windowHeight);
  
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  var størelse = (windowWidth - width)/ 0.333;
  //cnv.position(x, y);

  button = createButton("test");
  button.mousePressed(databaseTest);
}

function databaseTest(){
  var Data = {
    navn: "test",
    score: 69
  }

  console.log(Data);

  player.push(Data);
}


function draw() {
  //background(220);
  
  drawLeftPannel();
  drawMiddlePannel();
  drawRightPannel();

  image(cnv1, 0, 0);
  image(cnv2, 400, 0);
  image(cnv3, 800, 0);
  
}

function drawLeftPannel(){
  cnv1.background("lightblue");
}

function drawMiddlePannel() {
  cnv2.background("red");
}

function drawRightPannel() {
  cnv3.background("gray")
}
