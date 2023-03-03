
var socket = io();
socket.connect('http://0.0.0.0:8000')
socket.on('connect', function() {
                socket.emit('my event', {data: 'I\'m connected!'});
                socket.send("test")
});

socket.on('message',function(msg){
    console.log(msg)
})

//création de l'échéquier
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
        nouvelleCase.id= (notation[8-i]+(j).toString());
        if((i+j)%2==0){
            nouvelleCase.className ="case blanche";
            
        }
        else{
nouvelleCase.className = "case noire"
        }

        
        document.getElementById("row_"+i.toString()).appendChild(nouvelleCase);
    }

}
document.getElementById("start").addEventListener("click",start)



function start(){
    
    for(let i= 0;i<8;i++){
        for(let j=1;j<=8;j++){
            document.getElementById( notation[i]+ j.toString()).style.backgroundImage="";

        }
    }

    socket.send("Partie initialisé")

    notation.forEach((i)=>{
        let x = document.getElementById(i+"2").style.backgroundImage = "url('/static/images/wp.png')"

        let y = document.getElementById(i+"7").style.backgroundImage = "url('/static/images/bp.png')"
    });

    document.getElementById("a1").style.backgroundImage = "url('/static/images/br.png')";
    document.getElementById("a2").style.backgroundImage = "url('/static/images/bk.png')";
    document.getElementById("a3").style.backgroundImage = "url('/static/images/bb.png')";
    document.getElementById("a4").style.backgroundImage = "url('/static/images/bq.png')";
    
}