$(document).ready(function(){
  var click = 0;
  var imgClass;
  var image;
  var pairs = 0;
  var startingSeconds = 30;
  var secondsRemaining = startingSeconds;
  var timerClick = 0;
  var timerID;
  var rulesCounter = 0;
  var level = assignLevel();
  var imageNames = [["boo", "witch", "creepy", "dude", "gargoyle", "zombie"],
                    ["cauldren", "confused", "deadman", "goblin", "grim", "hands","hanging", "manic", "mask", "saw"],
                    ["bats", "boo", "castle", "cat2", "creepy", "dracula", "dude",
                    "gargoyle", "house4", "house5","multipleimages", "nosferatu"]];


  // Forgot to add alt into image elements. Did not pass in HTML validator so I am removing them.
  function removeAlt(){
    $("img").removeAttr("alt");
  }

  $("#rules").on("click",toggleRules);
  /* When I click on Rules, the callback function will display rules unless it's
  in the middle of the game.
  */
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
  // when click the start button, show all divs in the gameboard and start clock
  function startGame(){
    $("h1").html("Memory Game");
    $(".square").css("display", "inline-block");
    $(".square").css("visibility", "visible");
    startClock();
    timerClick++;
    rulesCounter++;
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
// resetAll function and remove all assigned div classes
  function resetAll(){
    for(var i = 0; i < imageNames.length; i++){
      for(var j = 0; j <imageNames[i].length; j++){
        var currentClass = imageNames[i][j];
        $(".square").children().attr("src", "");
        $("." + currentClass).removeClass(currentClass);
      }
    }
    $(".square").css("display", "none");
    pairs = 0;
    click = 0;
    clearTime();
    // taking user to top of page when finishes
    $("html, body").animate({ scrollTop: "20px" });
  }

  function clearTime(){
    clearInterval(timerID);
    secondsRemaining = startingSeconds;
    timerClick = 0;
    rulesCounter = 0;
    $(".scoreboard").html("Try Again?");
  }
// when the user clicks on a div, add a class of active to that div
// add a class of active two on second click
  $(".square").on("click", function(){
    if (click === 0){
      click++;
      var self = this;
      checkForCurrentImage(self);
      $(self).children().addClass("active");
    }
    else if(click === 1 ){
      var self = this;
      if($(self).children().hasClass("active") === false){
        checkForCurrentImage(self);
        $(self).children().addClass("active2");
        var timeoutID = window.setTimeout(checkForMatch, 300);
      }
    }
  });
  // if the div has an assigned image(and class), show that same image again
  // else assign a new image and display it
  function checkForCurrentImage(self){
    if($(self).children().attr("src") !== ""){
      $(self).children().css("visibility", "visible");
    }
    else{
      assignImage(self);
      $(self).children().css("visibility", "visible");
    }
  }
  // first check for winner, then check if the two active classes are equal
  // if they are equal, hide the image & .square div and remove active classes
  function checkForMatch(){
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
    if(level === "3"){
      if(pairs === 12){
        announceWinner();
      }
      else{
        return "loser";
      }
    }
    else if(level === "2"){
      if(pairs === 10){
        announceWinner();
      }
      else{
        return "loser";
      }
    }
    else{
      if(pairs === 6){
        announceWinner();
      }
      else{
        return "loser";
      }
    }
  }

  function announceWinner(){
    alert("You won the game!");
    resetAll();
    addCSSforNextLevel();
    return "winner";
  }
  function addCSSforNextLevel(){
    $("h1").css("display", "none");
    $("#nextlevel").css("display", "inline");
    $("#level").css("display", "inline");
  }

  function endingAnimation(){
    $("h1").html("YOU LOSE!");
    $(".scoreboard").html("Try Again?");
  }

  function assignImage(self){
    var picture = randomImage();
    imgClass = picture;
    image = "images/" + picture + ".jpg";
    setAttributeForImage(self);
  }
  // for this funciton, if there are less than two images of that class
  // assign image & image class to that div that was clicked
  function setAttributeForImage(self){
    if($("." +imgClass).length < 2){
      $(self).children().attr("src", image);
      $(self).children().addClass(imgClass);
    }
    else {
      assignImage(self);
    }
  }
  // randomIndex is generating a random index number from 0 to the length of images in my array(6)
  // this function will assign that image to randomImageName, used in funtion assignImage
  function randomImage() {
    var randomIndex;
    var randomImageName;
    if(level === "3"){
      randomIndex = Math.floor(Math.random() * imageNames[2].length);
      randomImageName = imageNames[2][randomIndex];
    }
    else if(level === "2"){
      randomIndex = Math.floor(Math.random() * imageNames[1].length);
      randomImageName = imageNames[1][randomIndex];
    }
    else{
      randomIndex = Math.floor(Math.random() * imageNames[0].length);
      randomImageName = imageNames[0][randomIndex];
    }
    return randomImageName;
  }

  function assignLevel(){
    if($("body").hasClass("thirdlevel")){
      return "3";
    }
    else if($("body").hasClass("secondlevel")){
      return "2";
    }
  }

removeAlt();
enableButtons();

});
