window.onload = function(){
  var canvas = document.getElementById("micanvas");
  var cv = canvas.getContext("2d");
  var img = new Image();
  img.src = "resources/img/poker.png";
  img.onload = function(){
    cv.drawImage(img, 0, 0);
  }
}
