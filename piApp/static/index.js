
var socket = io();
socket.connect('http://0.0.0.0:8000')
socket.on('connect', function() {
                socket.emit('my event', {data: 'I\'m connected!'});
                socket.send("test")
});

socket.on('message',function(msg){
    console.log(msg)
})


const board = document.getElementById("board");

for(let i =1; i<=8;i++){
    let nouvelleColonne = document.createElement("div"); 
    nouvelleColonne.id = "row_"+i.toString();
    nouvelleColonne.className= "row"
    board.appendChild(nouvelleColonne);  
}

const notation = ["a","b","c","d","e","f","g","h"]

for(let i= 1; i<=8;i++){
    for(let j =1;j<=8;j++){
        let nouvelleCase = document.createElement("div");
        nouvelleCase.id= (notation[j-1]+i.toString());
        console.log("row_"+i.toString());
        document.getElementById("row_"+i.toString()).appendChild(nouvelleCase);
    }

}
