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
    var start = $("#start");
    $("start").on("click", function() {
      //game mode validation
        if ($("test1").prop("checked") == false && $("test2").prop("checked") == false) {
            alert("Ye have t' choose a game mode, ye howlin' nutter.")
        } else if ($("test1").prop("checked")) {
//code here for player vs computer launch
        } else if ($("test2").prop("checked")) {
//code here for player vs player launch
        };
    });
});
var turn = "";
var round = 1;
var playerOneScore = 0;
var playerTwoScore = 0;

//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
