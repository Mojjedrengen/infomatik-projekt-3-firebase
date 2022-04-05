var database = firebase.database();
var button;

function setup() {
  var cnv = createCanvas(400, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  button = createButton("lol");
  button.position(x, y);
}

function draw() {
  background(220);
}
