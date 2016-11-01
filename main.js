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
        } else if ($("#test2").prop("checked")) {
          playerOne = prompt("Tell us th' first mate's name")
          playerTwo = prompt("Tell us th' gunner's name.")
        };
    });
        $("#toss").on("click", turn);
  });

//variables
var turn = "";
var playerOne = "";
var playerTwo = "";
var playerOneScore = 0;
var playerTwoScore = 0;
var dice = 5;
var round = 0;

function turn (){
  round++;
  storedRolls = round ([]);
};

function round (storedRolls){
  var rolls = [];
    var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
    for (var d = 0; d < dice; d++){
      rolls.push((Math.floor(Math.random()*6)+1));
      $(diceBoxes[d]).text(rolls[d]);
    }
    for (var s = 0; s < dice; s++){
      if (rolls.indexOf(6) !== -1 && storedRolls.length == 0){
        storedRolls.push(diceBoxes[rolls.indexOf(6)]);
        dice--;
      } else if (rolls.indexOf(5) !== -1 && storedRolls.length == 1){
        storedRolls.push(diceBoxes[rolls.indexOf(5)]);
        dice--;
      } else if (rolls.indexOf(4) !== -1 && storedRolls.length == 2){
        storedRolls.push(diceBoxes[rolls.indexOf(4)]);
        dice--;
      }
    }
};

function reset (){
  //resets the values for the next turn
  dice = 5;
  round = 0;
}


//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
