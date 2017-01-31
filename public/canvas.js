var cv;

window.onload = function(){
  var canvas = document.getElementById("micanvas");
  cv = canvas.getContext("2d");
  draw_card(1,3);
  /*img.onload = function(){
    cv.drawImage(img, 225, 315*3, 225, 315, 0, 0, 225, 315)
  }*/
}

function draw_card(n,p){
  var imagen = new Image();
  imagen.src = "resources/poker.png";
  var imgX=225*(n-1);
  var imgY=315*p;
  var imgAncho=225;
  var imgAlto=315;
  var lienzoX=0;
  var lienzoY=0;
  var LienzoAncho=225;
  var LienzoAlto=315;
  cv.drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto);
}
