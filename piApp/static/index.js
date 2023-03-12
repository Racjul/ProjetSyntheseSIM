import { Chess } from 'chess.js'
const chess = new Chess()


var caseI = null;
var pieceDeplacement = null;

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


for(let i=1;i<=8;i++)
{
    for(let j =1;j<=8;j++){
        
        document.getElementById(notation[8-i]+(j).toString()).addEventListener("click", function(e){
            deplacer(e);
        },false)
    }
}


function start(){
    
    for(let i= 0;i<8;i++){
        for(let j=1;j<=8;j++){
            document.getElementById( notation[i]+ j.toString()).style.backgroundImage=null;

        }
    }

    socket.send("Partie initialisé")


    //pown
    for(let i =1;i<=8;i++){
        document.getElementById("b"+i.toString()).style.backgroundImage = "url('/static/images/wp.png')"
        
        document.getElementById("g"+i.toString()).style.backgroundImage = "url('/static/images/bp.png')"
    }
//création des pièces noires
    ajouterPiece("br","h1");
    ajouterPiece("bn","h2");
    ajouterPiece("bb","h3");
    ajouterPiece("bk","h4");
    ajouterPiece("bq","h5");
    ajouterPiece("bb","h6");
    ajouterPiece("bn","h7");
    ajouterPiece("br","h8");
    ajouterPiece("br","h8");
    ajouterPiece("wr","a1");
    ajouterPiece("wn","a2");
    ajouterPiece("wb","a3");
    ajouterPiece("wk","a4");
    ajouterPiece("wq","a5");
    ajouterPiece("wb","a6");
    ajouterPiece("wn","a7");
    ajouterPiece("wr","a8");
   
}

function ajouterPiece(piece,location){
    element = document.getElementById(location)
    element.style.backgroundImage = "url('/static/images/"+piece+".png')"
}




function deplacer(e){


    console.log(document.getElementById(e.target.id).style.backgroundImage);
    if(document.getElementById(e.target.id).style.backgroundImage!="")
    {
        document.getElementById(e.target.id).style.border="thick solid red";
        caseI=e.target.id;
        pieceDeplacement= document.getElementById(e.target.id).style.backgroundImage.substring(20,22);
        console.log(caseI)
        console.log("");
        return;
    }

    if(caseI == null)
    {
        console.log("case initiale null");
        return;
    }


    
    console.log(chess.move({from: caseI.toString(), to:e.target.id.toString()}));
    ajouterPiece(pieceDeplacement,e.target.id);
    document.getElementById(caseI).style.backgroundImage=null;
    document.getElementById(caseI).removeEventListener("click",function(e){});
    document.getElementById(caseI).style.border="thick solid transparent";
    caseI=null;
    


}




