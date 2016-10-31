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
      console.log("test");
      //game mode validation
        if ($("test1").prop("checked") == false && $("test2").prop("checked") == false) {
            alert("Ye have t' choose a game mode, ye howlin' nutter.")
        } else if ($("test1").prop("checked")) {
          playerOne = prompt("Tell us yer name, so we know what t'call ye.")
        } else if ($("test2").prop("checked")) {
          playerOne = prompt("Tell us th' first mate's name")
          playerTwo = prompt("Tell us th' gunner's name.")
        };
    });
    $("#toss").on("click", function(){
      var diceBoxes = ["#one", "#two", "#three", "#four", "#five"];
      for (var i = 0; i < diceBoxes.length; i++){
        $(diceBoxes[i]).text((Math.floor(Math.random()*6)+1));
      }

    });
});
var turn = "";
var round = 1;
var playerOne = "";
var playerTwo = "";
var playerOneScore = 0;
var playerTwoScore = 0;

//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
