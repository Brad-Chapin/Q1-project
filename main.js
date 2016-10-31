$( document ).ready(function() {
  var userText = $("textarea");
  var talk = $("#talk");
    $("#trans").on("click", function() {
      event.preventDefault();
        var $xhr = $.getJSON("https://g-hackday.herokuapp.com/arrpi.php?text=" + userText.val() + "&format=json");
        if (userText.val() == ""){
          talk.text("Kwitcher mumblin' and say somethin'!");
        } else {
          $xhr.done (function (data){
            console.log(data);
            console.log(data.translation.pirate);
            talk.text(data.translation.pirate);
          });
        }

  });
});


//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
