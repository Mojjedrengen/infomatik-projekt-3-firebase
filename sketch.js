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
var retriveDataButton;
var totalscore = 0;
var icecreamScoopButton;
var icecreamScoops = 0;
var scoopPrice = 5;
var retrivedData = false;

function setup() {
  createCanvas(windowWidth, windowHeight / 1.35);
  rightBuffer = createGraphics(windowWidth, 400);
  middleBuffer = createGraphics(windowWidth, 400);
  leftBuffer = createGraphics(windowWidth, 400);

  score = 0;

  player.orderByKey().on("value", function (data) {
    retriveData();
  }, function (error) {
    console.log("Error: " + error.code);
  });

  BtnSendData = createButton("database");
  BtnSendData.mousePressed(SendData);

  icecreamButton = createButton("ice cream");
  icecreamButton.mousePressed(increaseScore);
  icecreamButton.style('background-color', color(59, 212, 147))

  inputIniFelt = createInput();

  retriveDataButton = createButton("retrive score from database");
  retriveDataButton.mousePressed(retriveData);
}

function increaseScore() {
  if (icecreamScoops > 0) {
    score += 1 + icecreamScoops;
  }
  else {
    score++
  }
  console.log(icecreamScoops);
}

function buyIcecreamScoops() {
  if (score > scoopPrice) {
    scoopPrice;
    icecreamScoops++;
    score -= scoopPrice;
    scoopPrice = scoopPrice * 1.25;

    console.log(scoopPrice);
  }
}

function retriveData() {
  var playerKey;
  var playerScoreInDatabase;

  inputIni = inputIniFelt.value();

  player.orderByKey().on("child_added", function (data) {
    playerKey = data.key
    if (playerKey == inputIni) {
      var setInitals = database.ref('player/' + inputIni + '/');
      setInitals.orderByKey().on("child_added", function (data) {
        if (data.key == "score") {
            console.log(data.val());
            playerScoreInDatabase = data.val();
    
            totalscore = playerScoreInDatabase;
    
            if (retrivedData == false) {
              score = playerScoreInDatabase + score;
              retrivedData = true
              console.log("player score: "+playerScoreInDatabase)
            }
            else if (retrivedData == true) {
              score = playerScoreInDatabase;
            }
          }
          if (data.key == "icecreamScoopPrice") {
            playerScoopPriceInDatabase = data.val();

            scoopPrice = playerScoopPriceInDatabase;
            console.log("Scoop price: "+ playerScoopPriceInDatabase)
          }
          if (data.key == "icecreamScoops") {
            playerScoopsInDatabase = data.val();

            icecreamScoops = playerScoopsInDatabase
            console.log("total amount of icecram scoops: "+ playerScoopsInDatabase)
          }
        }, function (error) {
          console.log("Error: " + error.code);
      });      
    }
  }, function (error) {
    console.log("Error: " + error.code);
  });
}

function SendData() {
  var playerKey;
  var playerScoreInDatabase;
  var exsist = false;

  var dataToDatabase = {
    score: score,
    icecreamScoops: icecreamScoops,
    icecreamScoopPrice: scoopPrice
  }

  if (score > 0) {
    inputIni = inputIniFelt.value();

    player.orderByKey().on("child_added", function (data) {
      playerKey = data.key
      if (playerKey == inputIni) {
        exsist = true;
      }

    }, function (error) {
      console.log("Error: " + error.code);
    });

    if (exsist == false) {
      var dataToConsole = {
        navn: inputIni,
        score: score
      }

      console.log(dataToConsole);
      database.ref('player/' + inputIni + '/').set(dataToDatabase);
      alert("If your score isn't shown correctly pres the 'Retrive from database' button");
      return;
    }

    player.orderByKey().on("child_added", function (data) {
      playerKey = data.key;
      if (playerKey == inputIni) {

        playerScoreInDatabase = data.val();
        var dataToConsole = {
          navn: inputIni,
          score: totalscore
        }

        console.log(dataToConsole);
        console.log(dataToDatabase)
        database.ref('player/' + inputIni + '/').set(dataToDatabase);
        alert("If your score isn't shown correctly pres the 'Retrive from database' button");
        score = playerScoreInDatabase;
        return;
      }
    }, function (error) {
        console.log("Error: " + error.code);
      });
    console.log(inputIni + " " + playerKey);
  }
}



function draw() {
  icecreamScoopButton = createButton("buy more scoops for " + int(scoopPrice) + " score")
  icecreamScoopButton.mousePressed(buyIcecreamScoops);
  icecreamScoopButton.position(820, 70);

  drawLeftPannel();
  drawMiddlePannel();
  drawRightPannel();

  image(leftBuffer, 0, 0);
  image(middleBuffer, 400, 0);
  image(rightBuffer, 800, 0);
}

function drawLeftPannel() {
  leftBuffer.background(100, 255, 255);
  leftBuffer.fill(0, 0, 0);
  leftBuffer.textSize(32);
  leftBuffer.text("Current score: " + int(score), 50, 50);
}

function drawMiddlePannel() {
  middleBuffer.background(255, 255, 100);
  middleBuffer.fill(0, 0, 0);
  middleBuffer.textSize(28);
  middleBuffer.text("You get "+ int(1+icecreamScoops) +" icecreams per click", 30, 50);
  middleBuffer.text("You have "+ int(icecreamScoops) +" icecream scoops", 30, 90);
}

function drawRightPannel() {
  rightBuffer.background(255, 100, 255);
  rightBuffer.fill(0, 0, 0);
  rightBuffer.textSize(32);
  rightBuffer.text("Shop", 50, 50);
}
