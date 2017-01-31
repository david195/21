var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var cards=[];

socket.on('init', function(data) {
  cards.push(data);
  alert(data);
});
socket.on('21', function(data) {
  alert(data);
  if(is_equal(data,cards))
    alert("ganador");
  else
    alert("perdedor");
});
socket.on('one', function(data) {
  cards.push(data);
  //var d = document.getElementsById('datos');
  //d.value+=data[0]+"-";
  alert(data[0]+"-");
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
  for(var i=0;i<cards.length;i++){
    if(cards[i][0]<10)
      total+=cards[i][0];
    else
      total+=10;
  }
  if(total>=21)
    touch();
}

function touch(){
  addMessage("21",cards);
  alert(cards);
}

function is_equal(c1,c2){
  if(c1.length!=c2.length)
    return false;
  var s1=0
  var s2=0;
  for(var i=0;i<c1.length;i++){
    s1+=c1[i];
    s2+=c2[i];
  }
  if(s1!=s2)
    return false;
  return true;
}
