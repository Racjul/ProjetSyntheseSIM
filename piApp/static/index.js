
document.body.onload = addElement;
console.log("test");
function addElement(){
    for(let i= 1; i<=64;i++){
        let nouvellecase = document.createElement("div");
        nouvellecase.id = i.toString();
        document.getElementById('board').appendChild(nouvelleCase);  
    }
}
var socket = io();
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });