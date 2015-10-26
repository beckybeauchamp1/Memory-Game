$(document).ready(function(){
  var click = 0;
  console.log(click);
  var imgNumber;
  var saveImage = $("." + imgNumber);
  var imgClass;
  var image;

  $("#start").on("click", function(){
    $(".square").css("display", "inline-block");
  });

  $(".square").on("click", function(){
    if (click === 0){
      click++;
      imgNumber = $(this).attr("id");
      checkForCurrentImage();
      $("." + imgNumber).addClass("active");
    }
    else if(click === 1 ){
      imgNumber = $(this).attr("id");
      checkForCurrentImage();
      $("." + imgNumber).addClass("active2");
      click++;
    }
    else if (click === 2){
      checkForMatch();
      click = 0;
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
      if($(".active").attr("src") === $(".active2").attr("src")){
        alert("IT'S A MATCH!!!");
        $(".active").parent().hide();
        $(".active2").parent().hide();
        $(".active").removeClass("active");
        $(".active2").removeClass("active2");
      }
      else{
        alert("IT'S NOT A MATCH!!");
        $(".active").css("visibility", "hidden");
        $(".active2").css("visibility", "hidden");
        $(".active").removeClass("active");
        $(".active2").removeClass("active2");

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
});

/*
$(".square").click(function(){
  var star = $(".star").css("display", "inline-block");
  $(this).append(star);
});
*/
