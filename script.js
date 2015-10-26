$(document).ready(function(){
  var click = 0;
  console.log(click);
  var imgNumber;
  var saveImage = $("." + imgNumber);
  var imgClass;
  $("#start").on("click", function(){
    $(".square").css("display", "inline-block");
  });

  $(".square").on("click", function(){
    if (click === 0){
    click++;
    console.log(click);
    imgNumber = $(this).attr("id");
      assignImage(randomImage());
      $(this).css("opacity", 1.0);
      $(this).addClass("active");
    }
    else if(click > 0 ){
    click++;
    console.log(click);
    imgNumber = $(this).attr("id");
    assignImage(randomImage());
    $(this).css("opacity", 1.0);
    $(this).addClass("active");
    }
  });

  function assignImage(picture){
    if (picture === "boo"){
      imgClass = "boo";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
        $("." + imgNumber).attr("src", "images/boo.jpg");
        $("#" +imgNumber).addClass("boo");
      // }
    }
    else if(picture === "witch"){
      imgClass = "witch";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
        $("." + imgNumber).attr("src", "images/witch1.jpg");
        $("#" +imgNumber).addClass("witch");
      // }
    }
    else if(picture === "dude"){
      imgClass = "dude";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
      $("." + imgNumber).attr("src", "images/dude.jpg");
      $("#" +imgNumber).addClass("dude");
      // }
    }
    else if(picture === "zombie"){
      imgClass = "zombie";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
        $("." + imgNumber).attr("src", "images/zombie.jpg");
        $("#" +imgNumber).addClass("zombie");
      // }
    }
    else if(picture === "creepy"){
      imgClass = "creepy";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
        $("." + imgNumber).attr("src", "images/creepy.jpg");
        $("#" +imgNumber).addClass("creepy");
      // }
    }
    else if(picture === "gargoyle"){
      imgClass = "gargoyle";
      console.log(imgClass + " TEST" );
      // if($("." + imgClass).length < 2){
        $("." + imgNumber).attr("src", "images/gargoyle.jpg");
        $("#" +imgNumber).addClass("gargoyle");
      // }
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
