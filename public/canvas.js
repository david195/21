var cv;
var ncard=0;

window.onload = function(){
  var canvas = document.getElementById("micanvas");
  cv = canvas.getContext("2d");
}

function draw_card(n,p){
  var imagen = new Image();
  imagen.src = "resources/poker.png";
  var imgX=225*(n-1);
  var imgY=315*p;
  var imgAncho=225;
  var imgAlto=315;
  var lienzoX=225*ncard;
  var lienzoY=0;
  var LienzoAncho=225;
  var LienzoAlto=315;
  imagen.onload = function(){
    cv.drawImage(imagen, imgX, imgY, imgAncho, imgAlto, lienzoX, lienzoY, LienzoAncho, LienzoAlto);
  }
  ncard++;
}
