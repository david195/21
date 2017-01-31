var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var cards=[];
var puntos=0;
var id;

socket.on('21', function(data) {
  if(data==id){
    alert("ganador");
  }
  else {
    alert("perdedor");
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
  draw_card(data[0],data[1]);
  check_21();
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
  if(puntos>21)
    touch();
}

function touch(){
  addMessage("21",[puntos,id]);
}
