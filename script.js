$(document).ready(function(){
  var click = 0;
  console.log(click);
  var imgNumber;
  var saveImage = $("." + imgNumber);
  var imgClass;
  var image;
  var pairs = 0;
  var allClass = [];
  var seconds = 60;
  var timerClick = 0;
  var timerID;

  function startClock(){
    if (timerClick === 0){
        timerID = setInterval(function(){
          if (seconds >= 0){
            $(".scoreboard").html("Time Left: " + seconds);
            seconds = seconds - 1;
          }
          else{
            checkIfLose(checkForWinner);
            clearTime();
          }
      },1000);
    }
  }

  function checkIfLose(){
    var winner = checkForWinner();
    if (winner !== "winner"){
      alert("YOU LOST!");
      clearGame();
    }
  }

function startTime(){
  $("#start").on("click", function(){
    startClock();
    $(".square").css("display", "inline-block");
    $(".square").css("visibility", "visible");
    timerClick++;
  });
}

function clearGame(){
  $("#stop").on("click",resetAll);
}

function resetAll(){
  for(var i = 0; i < allClass.length; i++){
    var currentClass = allClass[i];
    console.log("i am looping " + i);
    $(".square").children().attr("src", "");
    $("." + currentClass).removeClass(currentClass);
  }
  $(".square").show();
  $(".square").css("display", "none");
  pairs = 0;
  clearTime();
}
function clearTime(){
  clearInterval(timerID);
  seconds = 60;
  timerClick = 0;
  $(".scoreboard").html("Time Left: " + seconds);
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

  function assignImage(){
    var picture = randomImage();
    if (picture === "boo"){
      imgClass = "boo";
      console.log(imgClass + "test!");
      image = "images/boo.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
    else if(picture === "witch"){
      imgClass = "witch";
      console.log(imgClass + "test!");
      image = "images/witch1.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
    else if(picture === "dude"){
      imgClass = "dude";
      console.log(imgClass + "test!");
      image = "images/dude.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
    else if(picture === "zombie"){
      imgClass = "zombie";
      console.log(imgClass + "test!");
      image = "images/zombie.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
    else if(picture === "creepy"){
      imgClass = "creepy";
      console.log(imgClass + "test!");
      image = "images/creepy.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
    else if(picture === "gargoyle"){
      imgClass = "gargoyle";
      console.log(imgClass + "test!");
      image = "images/gargoyle.jpg";
      // must have setAttributeForImage last!
      setAttributeForImage();
    }
  }
  function checkForWinner(){
    if (pairs === 6){
      alert("You won the game!");
      resetAll();
      return "winner";

    }
    else{
      console.log("You did not win!");
      return "loser";
    }
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
    var randomNumber = Math.random();
    if (randomNumber < 0.16) {
        return "boo";
    }
    else if (randomNumber < 0.32) {
        return "witch";
    }
    else if (randomNumber < 0.48){
        return "dude";
    }
    else if (randomNumber < 0.64){
        return "zombie";
    }
    else if(randomNumber < 0.8){
      return "creepy";
    }
    else if(randomNumber < 1.0) {
      return "gargoyle";
    }
  }
startTime();
clearGame();

});

/*
$(".square").click(function(){
  var star = $(".star").css("display", "inline-block");
  $(this).append(star);
});
*/
