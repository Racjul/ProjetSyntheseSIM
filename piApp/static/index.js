
var socket = io();
socket.connect('http://0.0.0.0:8000')
socket.on('connect', function() {
                socket.emit('my event', {data: 'I\'m connected!'});
                socket.send("test")
});
const board = document.getElementById("board");

for(let i =1; i<=8;i++){
    let nouvelleColonne = document.createElement("div"); 
    nouvelleColonne.id = "row_"+i.toString();
    nouvelleColonne.className= "row"
    board.appendChild(nouvelleColonne);  
}


let cpt = 1;
for(let i= 1; i<=64;i++){
    let nouvellecase = document.createElement("div");
    nouvellecase.id = i.toString();
    nouvellecase.className= "case"
    document.getElementById("row"+cpt.toString).appendChild(nouvellecase);
    if(i%8==0){
        cpt ++
    }  

}
