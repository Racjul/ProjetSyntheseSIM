
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
   
    
    /*document.getElementById("h1").style.backgroundImage = "url('/static/images/br.png')";
    document.getElementById("h2").style.backgroundImage = "url('/static/images/bn.png')";
    document.getElementById("h3").style.backgroundImage = "url('/static/images/bb.png')";
    document.getElementById("h4").style.backgroundImage = "url('/static/images/bk.png')";
    document.getElementById("h5").style.backgroundImage = "url('/static/images/bq.png')";
    document.getElementById("h6").style.backgroundImage = "url('/static/images/bb.png')";
    document.getElementById("h7").style.backgroundImage = "url('/static/images/bn.png')";
    document.getElementById("h8").style.backgroundImage = "url('/static/images/br.png')";
    */
//création des pièces blanches
    /*document.getElementById("a1").style.backgroundImage = "url('/static/images/wr.png')";
    document.getElementById("a2").style.backgroundImage = "url('/static/images/wn.png')";
    document.getElementById("a3").style.backgroundImage = "url('/static/images/wb.png')";
    document.getElementById("a4").style.backgroundImage = "url('/static/images/wk.png')";
    document.getElementById("a5").style.backgroundImage = "url('/static/images/wq.png')";
    document.getElementById("a6").style.backgroundImage = "url('/static/images/wb.png')";
    document.getElementById("a7").style.backgroundImage = "url('/static/images/wn.png')";
    document.getElementById("a8").style.backgroundImage = "url('/static/images/wr.png')";*/
}

function ajouterPiece(piece,location){
    element = document.getElementById(location)
    element.style.backgroundImage = "url('/static/images/"+piece+".png')"

    element.addEventListener("click",deplacer(piece));

}


function deplacer(piece){
    

    
    document.addEventListener("click",function(e){
        console.log(piece); 
        
    },false)
    
    

}


