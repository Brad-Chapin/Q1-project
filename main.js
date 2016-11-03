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
                talk.text(data.translation.pirate);
            });
        }

    });
    $("textarea").on("click", function(){
      event.preventDefault();
      talk.text("");
    });

    $("#start").on("click", function() {
      //game mode validation
        if ($("#test1").prop("checked") == false && $("#test2").prop("checked") == false) {
            alert("Ye have t' choose a game mode, ye howlin' nutter.")
        } else if ($("#test1").prop("checked")) {
          playerOne = prompt("Tell us yer name, so we know what t'call ye.")
          playerTwo = "Machine";
          $("#player_one").text(playerOne);
          $("#player_two").text("Machine");
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

//player stats
var playerOneWins = 0;
var playerOneLosses = 0;
var playerTwoWins = 0;
var playerTwoLosses = 0;
var playerOneScore = 0;
var playerTwoScore = 0;

var turnNumber = 1;
var turnWho = "";
var playerOne = "";
var playerTwo = "";
var score = 0;
var dice = 5;
var round = 0;
var storedRolls = [];
var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];

function turn (){
  round++;
  $("#what_round").text(3 - round);
  var rolls = [];
    for (var d = 0; d < dice; d++){
      rolls.push((Math.floor(Math.random()*6)+1));
      $(diceBoxes[d]).text(rolls[d]);
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
    diceBoxes = diceBoxes.filter(function(element){
      return storedRolls.indexOf(element) == -1;
    });
      if (round == 3 && storedRolls.length == 3){
        getPoints();
    } else if (round == 3 && storedRolls.length < 3){
      alert("Bah, landlubber, ye didn't score a blighted thing!");
      if (turnWho == playerOne){
          if (playerTwo == "Machine"){
            turnWho = playerTwo;
            $("#which_player").text(playerTwo);
            reset();
            machineTurn();
          } else {
            turnWho = playerTwo;
            $("#which_player").text(playerTwo);
            reset();
          }
      } else {
        turnWho = playerOne;
        $("#which_player").text(playerOne);
        turnNumber++;
        $("#what_turn").text(turnNumber);
        reset();
      }
    } else if (round < 3 && turnWho == playerTwo && playerTwo == "Machine"){
      machineTurn();
    }
    if (turnNumber > 5){
      gameEnd();
    }
};

function reset (){
  //resets the values for the next turn
  score = 0;
  $("#what_round").text(3);
  dice = 5;
  round = 0;
  storedRolls = [];
  diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
}
function gameReset () {
  //resets values for next game
  reset();
  turnNumber = 1;
  $("#what_turn").text(turnNumber);
  playerOneScore = 0;
  playerTwoScore = 0;
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
  var dieOne = diceBoxes[0];
  var dieTwo = diceBoxes [1];
  score = (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());
  if (turnWho == playerOne){
      if (playerTwo == "Machine"){
        playerOneScore += score;
        $("#p1_score").text(playerOneScore);
        alert("Ye scored " + score +" points. Th' Machine be at th' helm now.");
        turnWho = playerTwo;
        $("#which_player").text(playerTwo)
        reset();
        machineTurn();
      } else {
        playerOneScore += score;
        $("#p1_score").text(playerOneScore);
        alert(playerOne + " scored " + score + " points. " + playerTwo + " be at th' helm now.");
        turnWho = playerTwo;
        $("#which_player").text(playerTwo);
        reset();
  }
}
  else {
    playerTwoScore += score;
    $("#p2_score").text(playerTwoScore);
    alert(playerTwo + " scored " + score + " points. " + playerOne + " be at th' helm now.");
    turnWho = playerOne;
    $("#which_player").text(playerOne);
    reset();
    turnNumber++;
    if (turnNumber > 5){
      gameEnd();
    } else {
      $("#what_turn").text(turnNumber);
    }
  }
}
function machineTurn (){
  if (storedRolls.length == 3 && round < 3){
    var dieOne = diceBoxes[0];
    var dieTwo = diceBoxes [1];
    score = (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());
    switch (true) {
      case score < 6:
      turn();
      break;
      case score > 8:
      getPoints();
      break;
      case playerOneScore >= playerTwoScore:
      turn();
      break;
      case playerTwoScore > playerOneScore:
      getPoints();
      break;
      default:
      console.log("Houston, we have a problem.");

    }
  } else  {
      turn();
    }
}

function gameEnd () {
    if (playerOneScore > playerTwoScore){
      console.log("p1 ", playerOneScore);
      console.log("p2 ", playerTwoScore);
      alert(playerOne + " be th' winner!");
      playerOneWins++;
      $("#p1_wins").text(playerOneWins);
      playerTwoLosses++;
      $("#p2_losses").text(playerTwoLosses);
      gameReset();
    } else if (playerOneScore < playerTwoScore){
      console.log("p1 ", playerOneScore);
      console.log("p2 ", playerTwoScore);
      alert (playerTwo + " be th' winner!");
      playerTwoWins++;
      $("#p2_wins").text(playerTwoWins);
      playerOneLosses++;
      $("#p1_losses").text(playerOneLosses);
      gameReset();
    } else {
      console.log("p1 ", playerOneScore);
      console.log("p2 ", playerTwoScore);
      alert("An epic battle! It be a draw!");
      gameReset();
    }
}

//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
