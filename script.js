$(document).ready(function(){
  var click = 0;
  var imgNumber;
  var saveImage = $("." + imgNumber);
  var imgClass;
  var image;
  var pairs = 0;
  var allClass = [];
  var startingSeconds = 30;
  var secondsRemaining = startingSeconds;
  var timerClick = 0;
  var timerID;
  var imageNames = ["boo", "witch", "creepy", "dude", "gargoyle", "zombie"];

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
            checkIfLose();
            clearTime();
          }
      },1000);
    }
  }

  function startGame(){
    $("h1").html("Memory Game");
    $(".square").css("display", "inline-block");
    $(".square").css("visibility", "visible");
    startClock();
    timerClick++;
  }

function resetAll(){
  for(var i = 0; i < allClass.length; i++){
    var currentClass = allClass[i];
    console.log("i am looping " + i);
    $(".square").children().attr("src", "");
    $("." + currentClass).removeClass(currentClass);
  }
  $(".square").show(); // todo
  $(".square").css("display", "none");
  pairs = 0;
  clearTime();
}
function clearTime(){
  clearInterval(timerID);
  secondsRemaining = startingSeconds;
  timerClick = 0;
  $(".scoreboard").html("Try Again?");
}

$(".square").on("click", function(){
  if (click === 0){
    click++;
    imgNumber = $(this).attr("id");
    checkForCurrentImage();
    $("." + imgNumber).addClass("active");
    allClass.push(imgClass);
  }
  else if(click === 1 ){
    imgNumber = $(this).attr("id");
    if($("." + imgNumber).hasClass("active") === false){
      checkForCurrentImage();
      $("." + imgNumber).addClass("active2");
      allClass.push(imgClass);
      var timeoutID = window.setTimeout(checkForMatch, 300);

    }
    else{
      alert("You can't click twice!");
    }
  }
});

function checkForCurrentImage(){
  if($("." + imgNumber).attr("src") !== ""){
    $("." + imgNumber).css("visibility", "visible");
  }
  else{
    assignImage();
    $("." + imgNumber).css("visibility", "visible");
  }
}

function checkForMatch(){
  // why?
  var timeoutID2 = window.setTimeout(checkForWinner, 100);
  if($(".active").attr("src") === $(".active2").attr("src")){
    $(".active").parent().css("visibility", "hidden");
    $(".active").css("visibility", "hidden");
    $(".active2").parent().css("visibility", "hidden");
    $(".active2").css("visibility", "hidden");
    $(".active").removeClass("active");
    $(".active2").removeClass("active2");
    click = 0;
    pairs++;
  }
  else{
    $(".active").css("visibility", "hidden");
    $(".active2").css("visibility", "hidden");
    $(".active").removeClass("active");
    $(".active2").removeClass("active2");
    click = 0;
  }
}

function checkForWinner(){
  if (pairs === 6){
    alert("You won the game!");
    resetAll();
    return "winner";
  }
  else{
    return "loser";
  }
}
function checkIfLose(){
  var winner = checkForWinner();
  if (winner !== "winner"){
    resetAll();
    endingAnimation();
  }
}
function endingAnimation() {
    $("h1").html("YOU LOSE!");
    $(".scoreboard").html("Try Again?");
  }

function assignImage(){
  var picture = randomImage();
  imgClass = picture;
  image = "images/" + picture + ".jpg";
  setAttributeForImage();
}

function setAttributeForImage(){
  if($("." + imgClass).length < 2){
    $("." + imgNumber).attr("src", image);
    $("." +imgNumber).addClass(imgClass);
    console.log("added a class of " + imgClass);
  }
  else {
    assignImage();
  }
}

function randomImage() {
  var randomIndex = Math.floor(Math.random() * imageNames.length);
  var randomImageName = imageNames[randomIndex];
  return randomImageName;
}

enableButtons();

});

/*
$(".square").click(function(){
  var star = $(".star").css("display", "inline-block");
  $(this).append(star);
});
*/
