var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var cards=[];
var puntos=0;
var id;

socket.on('touch', function(data) {
  if(data)
    document.getElementById('baraja').onclick='';
});

socket.on('21', function(data) {
  if(data==id){
    winner()
  }
  else {
    loser();
  }
});

socket.on('id', function(data) {
  id=data;
});

socket.on('one', function(data) {
  if(data[0]<10)
    puntos+=data[0];
  else puntos+=10;
  var lpuntos = document.getElementById('puntos');
  lpuntos.innerHTML = "Puntos: "+puntos;
  cards.push(data);
  check_21();
  draw_card(data[0],data[1]);
});

function addMessage(type,message) {;
  socket.emit(type, message);
  return false;
}

function one(){
  addMessage("one","one");
}

function check_21(){
  var total=0;
  if(puntos>21){
    touch();
    document.getElementById('baraja').removeEventListener('onclick',one);
    document.getElementById('touch').removeEventListener('onclick',touch);
    writeCanvas("More than 21");
  }
}

function touch(){
  addMessage("21",[puntos,id]);
  writeCanvas("Waiting...");
}
