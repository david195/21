//Class
function baraja(){
  this.cards = [];
  for(var i=1;i<=13;i++){
    for(var j=1;j<=4;j++){
      var card = [i,j];
      this.cards.push(card);
    }
  }
}

baraja.prototype.mess = function(){
  this.cards.sort(function() {return Math.random() - 0.5});
};
baraja.prototype.pop = function(){
  var card = this.cards.pop();
  return(card);
};
baraja.prototype.push = function(e){
  this.cards.push(e);
};
baraja.prototype.imp = function(){
  for(i=0;i<this.cards.length;i++)
    console.log(this.cards[i][0]);
};

/*Programa*/

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
var path    = require("path");

var players=[];
var mazo = new baraja();
mazo.mess();
var winer=-1;
var id=0;
var touched=0;

io.on('connection', function(socket) {
  players.push(id);
  socket.emit('id',id);
  id++;
  socket.emit('one',mazo.pop());
  socket.emit('one',mazo.pop());
  socket.on('one', function(data) {
    socket.emit('one',mazo.pop());
  });

  socket.on('21', function(data) {
    io.sockets.emit("touch",true);
    touched++;
    if(data[0]<=21){
      if(winer==null){
        winer = data[1];
      }
      else {
        if(winer<data[0]){
          winer=data[1];
        }
      }
    }
    if(touched==players.length){
      io.sockets.emit('21',winer)
      console.log("ganador: "+winer);
      players=[];
      mazo = new baraja();
      mazo.mess();
      winer=-1;
      id=0;
      touched=0;
    }
  });

});

function check_21(c1,c2){
  var m1=0;
  for(var i=0;i<c1.length;i++){
    m1+=c1[i];
  }
  var m2=0;
  for(var j=0;j<c2.length;j++){
    m2+=c2[i];
  }
  if(m1>m2)
    mano = c1;
  else
    mano = c2;
  if(m1==m2){
    if(i>j)
      mano = c2;
    else
      mano = c1;
  }
}

app.get("/play",function(req,res){
  res.sendFile(path.join(__dirname+'/public/game.html'));
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});
