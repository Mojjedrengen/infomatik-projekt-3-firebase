var database = firebase.database();
var player = database.ref('player/');
var rightBuffer;
var middleBuffer;
var leftBuffer;
var button;
var icecreamButton;
var score;
var inputIni;
var inputIniFelt;

function setup() {
  createCanvas(windowWidth, windowHeight/1.05);  
  rightBuffer = createGraphics(windowWidth, 400);
  middleBuffer = createGraphics(windowWidth, 400);
  leftBuffer = createGraphics(windowWidth, 400);

  score = 0;
  
  // var x = (windowWidth - width) / 2;
  // var y = (windowHeight - height) / 2;
  // var størelse = (windowWidth - width)/ 0.333;
  //cnv.position(x, y);

  BtnSendData = createButton("database");
  BtnSendData.mousePressed(SendData);

  icecreamButton = createButton("ice cream");
  icecreamButton.mousePressed(increaseScore);
  icecreamButton.style('background-color', color(59, 212, 147))

  inputIniFelt = createInput();
}

function increaseScore(){
  score++;
}

function SendData(){

  var setInitals = database.ref('player/'+inputIni+'/');
  var playerKey;
  var playerScoreInDatabase;
  var exsist = false;
  
  if (score > 0) {
    inputIni = inputIniFelt.value();

    player.orderByKey().on("child_added", function(data) {
      playerKey = data.key
      if (playerKey == inputIni) {
        exsist = true;
      }

    }, function (error) {
      console.log("Error: " + error.code);
    });

    if (exsist == false)
    {
      var dataToConsole ={
        navn: inputIni,
        score: score
      } 

      console.log(dataToConsole);
      database.ref('player/'+inputIni+'/').set(score);
      alert('Sendt "' + score + '" til databasen, med navnet "' + inputIni + '"');
      score = 0;
      return;
    }

    player.orderByKey().on("child_added", function(data) {
      playerKey = data.key;
      if (playerKey == inputIni) {
        
          playerScoreInDatabase = data.val();
          
          var totalscore = playerScoreInDatabase + score

          var dataToConsole ={
            navn: inputIni,
            score: totalscore
          } 

          console.log(dataToConsole);
          database.ref('player/'+inputIni+'/').set(totalscore);
          alert('Sendt "' + totalscore + '" til databasen, med navnet "' + inputIni + '"');
          score = 0;
          return;
       }
  }
    
    

    
  , function (error) {
      console.log("Error: " + error.code);
  });

  
console.log(inputIni + " "+ playerKey);
    
    }
    
    
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
