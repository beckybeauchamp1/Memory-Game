$(document).ready(function(){
  var click = 0;
  var imgClass;
  var image;
  var pairs = 0;
  var startingSeconds = 60;
  var secondsRemaining = startingSeconds;
  var timerClick = 0;
  var timerID;
  var allClass = [];
  var imageNames = ["bats", "boo", "castle", "cat2", "creepy", "dracula", "dude", "gargoyle", "house4", "house5",
  "multipleimages", "nosferatu"];
  var rulesCounter = 0;

  function removeAlt(){
    $("img").removeAttr("alt");
  }

  $("#rules").on("click",toggleRules);

  $("#level2").on("click", function(){
    $(window).bind('beforeunload', function(){
    return "";
    });
  });

  function toggleRules(evt){
    evt.preventDefault();
    if(rulesCounter === 0){
      if($(".togglerules").css("display") === "none"){
        $(".togglerules").slideToggle(1000);
        $(".toggable").hide();
      }
      else{
        $(".togglerules").slideToggle(1000);
        var toggleBackTime = setTimeout(function(){
          $(".toggable").show();
        }, 1500);
      }
    }
  }

  function enableButtons(){
    $("#stop").on("click",resetAll);
    $("#start").on("click", startGame);
  }

  function startClock(){
    if (timerClick === 0){
        timerID = setInterval(function(){
          if (secondsRemaining >= 0){
            $(".scoreboard").html("Time Left: " + secondsRemaining);
            secondsRemaining = secondsRemaining - 1;
          }
          else{
            resetAll();
            endingAnimation();
          }
      },1000);
    }
  }

  function startGame(){
    $("h1").html("Level Three");
    $(".square").css("display", "inline-block");
    $(".square").css("visibility", "visible");
    startClock();
    timerClick++;
    rulesCounter++;
  }

  function resetAll(){
    for(var i = 0; i < allClass.length; i++){
      var currentClass = allClass[i];
      console.log("i am looping " + i);
      $(".square").children().attr("src", "");
      $("." + currentClass).removeClass(currentClass);
    }
    $(".square").css("display", "none");
    pairs = 0;
    clearTime();
  }

function clearTime(){
  clearInterval(timerID);
  secondsRemaining = startingSeconds;
  timerClick = 0;
  rulesCounter = 0;
  $(".scoreboard").html("Try Again?");
}

$(".square").on("click", function(){
  if (click === 0){
    click++;
    var self = this;
    checkForCurrentImage(self);
    $(self).children().addClass("active");
    allClass.push(imgClass);
  }
  else if(click === 1 ){
    var self = this;
    if($(self).children().hasClass("active") === false){
      checkForCurrentImage(self);
      $(self).children().addClass("active2");
      allClass.push(imgClass);
      var timeoutID = window.setTimeout(checkForMatch, 300);
    }
  }
});

function checkForCurrentImage(self){
  if($(self).children().attr("src") !== ""){
    $(self).children().css("visibility", "visible");
  }
  else{
    assignImage(self);
    $(self).children().css("visibility", "visible");
  }
}

function checkForMatch(){
  // why?
  var timeoutID2 = window.setTimeout(checkForWinner, 100);
  if($(".active").attr("src") === $(".active2").attr("src")){
    $(".active").parent().css("visibility", "hidden");
    $(".active2").parent().css("visibility", "hidden");
    hideDivsWithMatch();
    click = 0;
    pairs++;
  }
  else{
    hideDivsWithMatch();
    click = 0;
  }
}

function hideDivsWithMatch(){
  $(".active").css("visibility", "hidden");
  $(".active2").css("visibility", "hidden");
  $(".active").removeClass("active");
  $(".active2").removeClass("active2");
}

function checkForWinner(){
  if (pairs === 12){
    alert("You won the game!");
    resetAll();
    $("h1").html("HAPPY HALLOWEEN!");
    return "winner";
  }
  else{
    return "loser";
  }
}

function endingAnimation() {
    $("h1").html("YOU LOSE!");
    $(".scoreboard").html("Try Again?");
  }

function assignImage(self){
  var picture = randomImage();
  imgClass = picture;
  image = "images3/" + picture + ".jpg";
  setAttributeForImage(self);
}

function setAttributeForImage(self){
  if($("." +imgClass).length < 2){
    $(self).children().attr("src", image);
    $(self).children().addClass(imgClass);
  }
  else {
    assignImage(self);
  }
}

function randomImage() {
  var randomIndex = Math.floor(Math.random() * imageNames.length);
  var randomImageName = imageNames[randomIndex];
  return randomImageName;
}

removeAlt();
enableButtons();

});
