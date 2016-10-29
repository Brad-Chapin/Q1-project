$( document ).ready(function() {
  var userText = "Look, Kristen, it works!";
  var $xhr = $.getJSON("https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json");
  $xhr.done (function(data){
    if ($xhr.status !== 200){
      return;
    } else {
      console.log(data);
    }
  });
});


//"https://g-hackday.herokuapp.com/arrpi.php?text=" + userText + "&format=json"
// where variable is set in the code and it's value is determined dynamically
