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
          $("#player_one").text(playerOne);
          $("#player_two").text("Computer");
        } else if ($("#test2").prop("checked")) {
          playerOne = prompt("Tell us th' first mate's name")
          playerTwo = prompt("Tell us th' gunner's name.")
          $("#player_one").text(playerOne);
          $("#player_two").text(playerTwo);
        };
    });
        $("#toss").on("click", turn);
        $("#collect").on("click", function(){});
  });

//variables
var turnNumber = 1;
var turnWho = "";
var playerOne = "";
var playerTwo = "";
var playerOneScore = 0;
var playerTwoScore = 0;
var score = 0;
var dice = 5;
var round = 0;
var storedRolls = [];
var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
// var tempBoxes = ["#one", "#two", "#three", "#four", "#five"];

function turn (){
  var dieOne = diceBoxes[0];
  var dieTwo = diceBoxes [1];
  if (round == 3 && storedRolls.length == 3){
    score += (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());

  } else if (round == 3 && storedRolls.length < 3){
    alert("Bah, landlubber, ye didn't score a blighted thing!")
  }
  round++;
  var rolls = [];
    for (var d = 0; d < diceBoxes.length; d++){
      rolls.push((Math.floor(Math.random()*6)+1));
      $(diceBoxes[d]).text(rolls[d]);
  }
    for (var s = 0; s < dice; s++){
      if (rolls.indexOf(6) !== -1 && storedRolls.length == 0){
        var six = rolls.indexOf(6);
        storedRolls.push(diceBoxes[six]);
        diceBoxes.splice(six, 1)
        dice--;
      } else if (rolls.indexOf(5) !== -1 && storedRolls.length == 1){
        var five = rolls.indexOf(5);
        storedRolls.push(diceBoxes[five]);
        diceBoxes.splice(five, 1)
        dice--;
      } else if (rolls.indexOf(4) !== -1 && storedRolls.length == 2){
        var four = rolls.indexOf(4);
        storedRolls.push(diceBoxes[four]);
        diceBoxes.splice(four, 1)
        dice--;
      }
    }
};

function reset (){
  //resets the values for the next turn
  dice = 5;
  round = 0;
  var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
}

function getPoints (){
  var dieOne = diceBoxes[0];
  var dieTwo = diceBoxes [1];
  score += (parseInt($(dieOne).text())) + parseInt($(dieTwo).text());
  if (turnWho == playerOne){
    playerOneScore += score;
  } else {
    playerTwoScore += score;
  }
}

function computerTurn (){
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
      case playerOneScore >= playerTwoScore:
      turn();
      break;
      case playerTwoScore > playerOneScore:
      getPoints();
      break;
      default:
      console.log("Houston, we have a problem.");

    }
  }
}

//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
