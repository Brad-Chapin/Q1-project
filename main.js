$( document ).ready(function() {
  var userText = "placeholder text";
  var $xhr = $.getJSON("http://isithackday.com/arrpi.php?text=userText?&format=json");
  $xhr.done (function(data){
    if ($xhr.status !== 200){
      return;
    } else {
      console.log(data);
    }
  });
});


//http://isithackday.com/arrpi.php?text="variable"?&format=json
// where variable is set in the code and it's value is determined dynamically
