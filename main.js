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
// var turn = "";
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
  if (round == 3 && storedRolls.length == 3){
    score += (parseInt(diceBoxes[0].val())+(diceBoxes[1].val()));
    console.log(score);
  } else if (round == 3 && storedRolls.length < 3){
    alert("Bah, landlubber, ye didn't score a blighted thing!")
  }
  round++;
  var rolls = [];
    for (var d = 0; d < diceBoxes.length; d++){
      if (storedRolls.indexOf(diceBoxes[d]) == -1){
      rolls.push((Math.floor(Math.random()*6)+1));
      $(diceBoxes[d]).text(rolls[d]);
    }
  }
    console.log(rolls);
    for (var s = 0; s < dice; s++){
      if (rolls.indexOf(6) !== -1 && storedRolls.length == 0){
        var six = rolls.indexOf(6);
        storedRolls.push(diceBoxes[six]);
        console.log(diceBoxes[six]);
        diceBoxes.splice(six, 1)
        console.log(diceBoxes);
        dice--;
      } else if (rolls.indexOf(5) !== -1 && storedRolls.length == 1){
        var five = rolls.indexOf(5);
        storedRolls.push(diceBoxes[five]);
        diceBoxes.splice(five, 1)
        console.log(diceBoxes);
        dice--;
      } else if (rolls.indexOf(4) !== -1 && storedRolls.length == 2){
        var four = rolls.indexOf(4);
        storedRolls.push(diceBoxes[four]);
        diceBoxes.splice(four, 1)
        console.log(diceBoxes);
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


//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
