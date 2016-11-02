$(document).ready(function() {
    var userText = $("textarea");
    var talk = $("#talk");
    $("#trans").on("click", function() {
        event.preventDefault();
        var $xhr = $.getJSON("https://g-hackday.herokuapp.com/arrpi.php?text=" + userText.val() + "&format=json");
        if (userText.val() == "") {
            talk.text("Kwitcher mumblin' and say somethin'!");
        } else {
            $xhr.done(function(data) {
                console.log(data);
                console.log(data.translation.pirate);
                talk.text(data.translation.pirate);
            });
        }

    });
    $("#start").on("click", function() {
      //game mode validation
        if ($("#test1").prop("checked") == false && $("#test2").prop("checked") == false) {
            alert("Ye have t' choose a game mode, ye howlin' nutter.")
        } else if ($("#test1").prop("checked")) {
          playerOne = prompt("Tell us yer name, so we know what t'call ye.")
          playerTwo = "Computer";
          $("#player_one").text(playerOne);
          $("#player_two").text("Computer");
          $("#which_player").text(playerOne);
          turnWho = playerOne;
        } else if ($("#test2").prop("checked")) {
          playerOne = prompt("Tell us th' first mate's name")
          playerTwo = prompt("Tell us th' gunner's name.")
          $("#player_one").text(playerOne);
          $("#player_two").text(playerTwo);
          $("#which_player").text(playerOne);
          turnWho = playerOne;
        };
    });
        $("#toss").on("click", turn);
        $("#collect").on("click", getPoints);
  });

//variables
//player one score, wins, losses
var p1s = $("#p1_score").text();
var p1w = $("#p1_wins").text();
var p1l = $("#p1_losses").text();

var p2s = $("#p2_score").text();
var p2w = $("#p2_wins").text();
var p2l = $("#p2_losses").text();


var turnNumber = 1;
var turnWho = "";
var playerOne = "";
var playerTwo = "";
var score = 0;
var dice = 5;
var round = 0;
var storedRolls = [];
var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
// var tempBoxes = ["#one", "#two", "#three", "#four", "#five"];

function turn (){
  round++;
  $("#what_round").text(3 - round);
  var rolls = [];
    for (var d = 0; d < dice.length; d++){
      rolls.push((Math.floor(Math.random()*6)+1));
      for (var x = 0; x < diceBoxes.length, x++) {
        if (storedRolls.indexOf($(diceBoxes[d])) == -1){
          $(diceBoxes[d]).text(rolls[d]);
          break;
    }
   }
  }
    for (var s = 0; s < dice; s++){
      if (rolledSix(rolls) && !hasSix()){
        storeDie(diceBoxes[rolls.indexOf(6)])
      } else if (rolledFive(rolls) && !hasFive() && hasSix()){
        storeDie(diceBoxes[rolls.indexOf(5)])
      } else if (rolledFour(rolls) && !hasFour() && hasFive()){
        storeDie(diceBoxes[rolls.indexOf(4)])
      }
    }

    console.log("unstored id's",diceBoxes);
    console.log("randoms ",rolls);
    console.log("stored id's ",storedRolls);
    if (round == 3 && storedRolls.length == 3){
      console.log("player should get points here");
      getPoints();
    } else if (round == 3 && storedRolls.length < 3){
      alert("Bah, landlubber, ye didn't score a blighted thing!")
      if (turnWho == playerOne){
        turnWho = playerTwo;
        $("#which_player").text(playerTwo);
        reset();
        computerTurn();
      } else {
        turnWho = playerOne;
        $("#what_player").text(playerOne);
        turnNumber++;
        reset();
      }
    }
};

function reset (){
  //resets the values for the next turn
  dice = 5;
  round = 0;
  var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
}

//functions for 654 testing
function rolledSix (rolls) {
  return rolls.indexOf(6) !== -1;
}
function hasSix () {
  return storedRolls.length > 0;
}
function rolledFive (rolls) {
  return rolls.indexOf(5) !== -1;
}
function hasFive () {
  return storedRolls.length > 1;
}
function rolledFour (rolls) {
  return rolls.indexOf(4) !== -1;
}
function hasFour () {
  return storedRolls.length > 2;
}
 function storeDie (newId) {
   storedRolls.push(newId);
   dice--;
 }

function getPoints (){
  console.log("player should be getting points here");
  var dieOne = diceBoxes[0];
  var dieTwo = diceBoxes [1];
  score = (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());
  console.log("players should get these points: ",score);
  if (turnWho == playerOne){
      if (playerTwo == "Computer"){
        console.log(p1s);
        p1s = (parseInt(p1s) + parseInt(score));
        console.log(p1s);
        $(p1s).text(p1s);
        turnWho = playerTwo;
        console.log(turnWho);
        $("#which_player").text(playerTwo)
        reset();
        // computerTurn();
      } else {
        p1s = (parseInt(p1s) + parseInt(score));
        turnWho = playerTwo;
        $("#which_player").text(playerTwo);
        reset();
  }
}
  else {
    p2s = (parseInt(p2s) + parseInt(score));
    turnWho = playerOne;
    $("#which_player").text(playerOne);
    turnNumber++;
    reset();
  }
}

function computerTurn (){
  turn();
  console.log("the computer should be rolling");
  if (storedRolls.length == 3){
    var dieOne = diceBoxes[0];
    var dieTwo = diceBoxes [1];
    score += (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());
    switch (true) {
      case score < 6:
      turn();
      break;
      case score > 8:
      getPoints();
      break;
      case p1s >= p2s:
      turn();
      break;
      case p2s > p1s:
      getPoints();
      break;
      default:
      console.log("Houston, we have a problem.");

    }
  }
}

//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
