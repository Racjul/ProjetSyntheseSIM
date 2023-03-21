var caseI = null;
var pieceDeplacement = null;
var socket = io();
socket.connect('http://0.0.0.0:8000')
socket.on('connect', function() {
                socket.send("connection établie: " + socket.id )
});

socket.on('message',function(msg){
    console.log(msg)
})

// Effectue le coup suite à la vérification 
socket.on("coupValide",(piece,id,caseI)=>
{
    ajouterPiece(piece,id)
    document.getElementById(caseI).removeEventListener("click",function(e){});
    document.getElementById(caseI).style.border="thick solid transparent";
    caseI=null;
})

// Remet les paramètres à 0 et informe que son coup est invalide dans le cas d'un coup invalide
socket.on("coupInvalide",(caseI)=>
{
    alert("Coup non-autorisé");
    document.getElementById(caseI).removeEventListener("click",function(e){});
    document.getElementById(caseI).style.border="thick solid transparent";
    caseI=null;
})

//création de l'échéquier


const board = document.getElementById("board");

//création des colonnes qui vont stocker les cases
for(let i =1; i<=8;i++){
    let nouvelleColonne = document.createElement("div"); 
    nouvelleColonne.id = "row_"+i.toString();
    nouvelleColonne.className= "row"
    board.appendChild(nouvelleColonne);  
}

const notation = ["a","b","c","d","e","f","g","h"]

/*
création des 64 cases 
placement des cases dans le tableau qui prend la forme d'une matrice 8x8 
puis attribution de leur valeur sous la forme de la notation officiel des échecs (FIDE)
*/
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

// donne aux cases un event listener permettant l'initialisation d'un déplacement de pièce
for(let i=1;i<=8;i++)
{
    for(let j =1;j<=8;j++){
        
        document.getElementById(notation[8-i]+(j).toString()).addEventListener("click", function(e){
            deplacer(e);
        },false)
    }
}


function start(){
    
    //remet à 0 les cases
    for(let i= 0;i<8;i++){
        for(let j=1;j<=8;j++){
            document.getElementById( notation[i]+ j.toString()).style.backgroundImage=null;

        }
    }

    socket.send("Partie initialisé (JOUER) : " + socket.id)


//pawn
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
//change le background image d'une case plutôt que d'initialisé de nouveaux éléments dans une page (facilite le déplacement des pièces par la suite)
function ajouterPiece(piece,location){
    element = document.getElementById(location)
    element.style.backgroundImage = "url('/static/images/"+piece+".png')"
}



//permet de transmettre les informations des coups demandés 
function deplacer(e){

    if(document.getElementById(e.target.id).style.backgroundImage!="")
    {
        document.getElementById(e.target.id).style.border="thick solid red";
        caseI=e.target.id;
        pieceDeplacement= document.getElementById(e.target.id).style.backgroundImage.substring(20,22);
        return;
    }

    if(caseI == null)
    {
        console.log("case initiale null");
        return;
    }


    //demande au serveur si le coup est possibe
    //si oui, voir socket.on(coupValide,(...))
    socket.emit("coupDemande",pieceDeplacement,e.target.id,caseI)  
}




