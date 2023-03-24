var caseI = null;
var pieceDeplacement = null;
var tour;
computer = false;
var socket = io();
var Elo=1500;
//var timer= new Timer(10);
partieCommencé = false;


socket.connect('http://0.0.0.0:8000')
socket.on('connect', function() {
                socket.send("connection établie: " + socket.id )
});

socket.on('message',function(msg){
    console.log(msg)
})

// Effectue le coup suite à la vérification 
socket.on("coupValide",(info)=>
{

    
    let caseF = info.substring(2,4);
    caseI= info.substring(4,6);
   
    pieceDeplacement = document.getElementById(caseI).style.backgroundImage.substring(20,22)
    
    
    if(info.slice(-1) == "q"){
        pieceDeplacement = tour + "q"
    }

    //roque
    if(pieceDeplacement == "wk"){
        if(caseI == "e1" && caseF=="g1" ){
            document.getElementById("h1").style.backgroundImage = null
            ajouterPiece("wr","f1")

        }
        if(caseI == "e1" && caseF=="c1" ){
            document.getElementById("a1").style.backgroundImage = null
            ajouterPiece("wr","d1")
        }
    }
    if(pieceDeplacement =="bk"){
        if(caseI == "e8" && caseF=="g8" ){
            document.getElementById("h8").style.backgroundImage = null
            ajouterPiece("br","f8")

        }
        if(caseI == "e8" && caseF=="c8" ){
            document.getElementById("a8").style.backgroundImage = null
            ajouterPiece("br","d8")
        } 
    }



    background = document.getElementById(caseF).style.backgroundImage;

    console.log("piece deplacement: " + pieceDeplacement);
    console.log("caseI sub: " + caseI.substring(0,1) );
    console.log("caseF sub: " + caseF.substring(0,1) );
    console.log(document.getElementById(caseF).style.backgroundImage == ""  )

    if(pieceDeplacement=="bp")
    {
        if((document.getElementById(caseF).style.backgroundImage == "") && (caseI.substring(0,1) != caseF.substring(0,1)))
        {
            document.getElementById(caseF.substring(0,1)+(parseInt(caseF.substring(1,2))+1).toString()).style.backgroundImage=null;
        }
    }
    else if(pieceDeplacement == "wp")
    {
        if((document.getElementById(caseF).style.backgroundImage=="") && (caseI.substring(0,1).toString() != caseF.substring(0,1).toString()))
        {
            document.getElementById(caseF.substring(0,1)+(parseInt(caseF.substring(1,2))-1).toString()).style.backgroundImage=null;
        }
    }

    
    

    ajouterPiece(pieceDeplacement,caseF)
    document.getElementById(caseI).removeEventListener("click",function(e){});
    document.getElementById(caseI).style.border="thick solid transparent";
    document.getElementById(caseI).style.backgroundImage=null;
    caseI=null;
    pieceDeplacement=null;

    if(tour =="w")
            {
                timer.stop();
                tour ="b";
            }
            else if(tour =="b")
            {
                timer.startClock();
                console.log("change de tour");
                tour = "w";
            }
        
})

socket.on("coupValideBot",(info)=>
{
caseI = info.substring(0,2);
caseF = info.substring(2,4)
pieceDeplacement = document.getElementById(caseI).style.backgroundImage.substring(20,22)

        //roque
        if(pieceDeplacement == "wk"){
            if(caseI == "e1" && caseF=="g1" ){
                document.getElementById("h1").style.backgroundImage = null
                ajouterPiece("wr","f1")
    
            }
            if(caseI == "e1" && caseF=="c1" ){
                document.getElementById("a1").style.backgroundImage = null
                ajouterPiece("wr","d1")
            }
        }
        if(pieceDeplacement =="bk"){
            if(caseI == "e8" && caseF=="g8" ){
                document.getElementById("h8").style.backgroundImage = null
                ajouterPiece("br","f8")
    
            }
            if(caseI == "e8" && caseF=="c8" ){
                document.getElementById("a8").style.backgroundImage = null
                ajouterPiece("br","d8")
            } 
    }
    

ajouterPiece(pieceDeplacement,caseF)
document.getElementById(caseI).removeEventListener("click",function(e){});
document.getElementById(caseI).style.border="thick solid transparent";
document.getElementById(caseI).style.backgroundImage=null;
caseI=null;
pieceDeplacement=null;

if(tour =="w")
{
    tour ="b";
    timer.stop();
}
else if(tour =="b")
{
    console.log("chage de tour");
    tour = "w";
    timer.startClock();
}
})

// Remet les paramètres à 0 et informe que son coup est invalide dans le cas d'un coup invalide
socket.on("coupInvalide",(caseI)=>
{
    alert("Coup non-autorisé");
    document.getElementById(caseI).style.border="thick solid transparent";
    caseI=null;
})

socket.on("checkmate",()=>{
    alert("Checkmate!")
    
})

//création de l'échéquier


const board = document.getElementById("board");
const notation = ["a","b","c","d","e","f","g","h"]

//création des colonnes qui vont stocker les cases
for(let i =0; i<8;i++){
    let nouvelleColonne = document.createElement("div"); 
    nouvelleColonne.id = "row_"+notation[i].toString();
    nouvelleColonne.className= "row"
    board.appendChild(nouvelleColonne);  
}


/*
création des 64 cases 
placement des cases dans le tableau qui prend la forme d'une matrice 8x8 
puis attribution de leur valeur sous la forme de la notation officiel des échecs (FIDE)
*/
for(let i= 0; i<8;i++){
    for(let j =0;j<8;j++){
        let nouvelleCase = document.createElement("div");
        nouvelleCase.id= (notation[j]+(8-i).toString());
        if((i+j)%2==0){
            nouvelleCase.className ="case blanche";
        }
        else{
            nouvelleCase.className = "case noire"
        }

        document.getElementById("row_"+notation[i].toString()).appendChild(nouvelleCase);
        
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
    tour = "w";
    timer.startClock();
    partieCommencé=true;
    //remet à 0 les cases
    for(let i= 0;i<8;i++){
        for(let j=1;j<=8;j++){
            document.getElementById( notation[i]+ j.toString()).style.backgroundImage=null;

        }
    }

    socket.send("Partie initialisé (JOUER) : " + socket.id)
    socket.emit("restart")

//pawn
    for(let i =0;i<8;i++){
        document.getElementById(notation[i].toString()+"2").style.backgroundImage = "url('/static/images/wp.png')"
        
        document.getElementById(notation[i].toString()+"7").style.backgroundImage = "url('/static/images/bp.png')"
    }
//création des pièces noires
    ajouterPiece("br","a8");
    ajouterPiece("bn","b8");
    ajouterPiece("bb","c8");
    ajouterPiece("bk","e8");
    ajouterPiece("bq","d8");
    ajouterPiece("bb","f8");
    ajouterPiece("bn","g8");
    ajouterPiece("br","h8");
    ajouterPiece("wr","a1");
    ajouterPiece("wn","b1");
    ajouterPiece("wb","c1");
    ajouterPiece("wk","e1");
    ajouterPiece("wq","d1");
    ajouterPiece("wb","f1");
    ajouterPiece("wn","g1");
    ajouterPiece("wr","h1");
   
}
//change le background image d'une case plutôt que d'initialisé de nouveaux éléments dans une page (facilite le déplacement des pièces par la suite)
function ajouterPiece(piece,location){
    element = document.getElementById(location)
    element.style.backgroundImage = "url('/static/images/"+piece+".png')"
}



//permet de transmettre les informations des coups demandés 
function deplacer(e){

    //si l'utilisateur clique sur une pièce 
    if(document.getElementById(e.target.id).style.backgroundImage!="" )
    {
        if(pieceDeplacement!= null && caseI != null)
        {
            document.getElementById(caseI).style.border="thick solid transparent";
        }

        //stock le nom de la piece que le joueur veut déplacer
        pieceDeplacement= document.getElementById(e.target.id).style.backgroundImage.substring(20,22);

        

        //Si la pièce est une piece du joueur à qui c'est le tour, on stock la pièce comme pièce à déplacer
        if(tour == pieceDeplacement.substring(0,1))
        {
            document.getElementById(e.target.id).style.border="thick solid red";
            caseI=e.target.id;
            return;
        }
        else if(caseI != null) //si la pièce n'est pas une pièce du joueur a qui c'est le tour, ca veut dire qu'il mange une pièce
        { 
            if(computer == false){
        
                socket.emit("coupDemande",pieceDeplacement,e.target.id,caseI) }
        
            else{
                socket.emit("coupDemandeBot",pieceDeplacement,e.target.id,caseI)
        
            } 
            
            return;
        }
    }


    //S'il clique sur une case vide, mais qu'il n'a clické sur aucune case avant, on ne fait rien
    if(caseI == null)
    {
        console.log("case initiale null");
        return;
    }

    console.log(caseI+e.target.id);
    //demande au serveur si le coup est possibe
    //si oui, voir socket.on(coupValide,(...))
    
    if(computer == false){
        socket.emit("coupDemande",pieceDeplacement,e.target.id,caseI) }
    else{
        socket.emit("coupDemandeBot",pieceDeplacement,e.target.id,caseI)
    } 
}


function jouerOrdinateur()
{
    if(computer == false)
    {
        computer=true;
        document.getElementById("computer").style.backgroundColor="#bb1f03";
    }
    else if(computer = true)
    {
        computer = false;
        document.getElementById("computer").style.backgroundColor="#769656";
    }
    console.log(computer);
}


function changerElo()
{
    Elo = document.getElementById("inputElo").value;

    if(Elo<=0)
    {
        Elo=250;
    }
    
    console.log(Elo);
    
    socket.emit("changerElo",Elo);

}
/*
function changerTimer()
{
    if(!partieCommencé)
    {
        timer.time= document.getElementById("UserTimer").value;
    }
}



class Timer{
    constructor(ClockTime, tour)
    {
        this.time= ClockTime*60;
        this.minute=0
        this.seconde=0;
        this.stop=true;

        setInterval(this.updateClock,1000);

    }

    updateInterface()
    {
        this.minute=Math.floor(this.time/60);
        this.seconde = time%60;
        document.getElementById("time").value=( this.minute.toString() + ":" +  this.seconde.toString());
        
    }

    startClock()
    {
        stop=true; 
    }

    stop()
    {
        stop=true;
    }

    
    updateClock()
    {
        
        if(!stop)
        {
            time--;
            this.updateInterface();
        }
            
    }
           

        
    
}
*/