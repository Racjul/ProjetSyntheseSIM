socket.on('connect', function() {
    socket.send("connection établie: " + socket.id )
});


socket.on('message',function(msg)
{
    console.log(msg)
})





// Effectue le coup suite à la vérification 
socket.on("coupValide",(info)=>
{

    console.log(info)
    if(info.length == 7)
    {
        pieceDeplacement = tour + "q"
        caseI= info.substring(5,7);
        caseF = info.substring(2,4);
        console.log(pieceDeplacement)
    }
    else
    {
        caseI= info.substring(4,6);
        caseF = info.substring(2,4);
        pieceDeplacement = document.getElementById(caseI).style.backgroundImage.substring(20,22);
    }

    //roque
    if(pieceDeplacement == "wk")
    {
        if(caseI == "e1" && caseF=="g1" )
        {
            document.getElementById("h1").style.backgroundImage = null
            ajouterPiece("wr","f1")
        }   
        if(caseI == "e1" && caseF=="c1" )
        {
            document.getElementById("a1").style.backgroundImage = null
            ajouterPiece("wr","d1")
        }
    }
    if(pieceDeplacement =="bk")
    {
        if(caseI == "e8" && caseF=="g8" )
        {
            document.getElementById("h8").style.backgroundImage = null
            ajouterPiece("br","f8")

        }
        if(caseI == "e8" && caseF=="c8" )
        {
            document.getElementById("a8").style.backgroundImage = null
            ajouterPiece("br","d8")
        } 
    }


    background = document.getElementById(caseF).style.backgroundImage;


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
        tour ="b";
    }
    else if(tour =="b")
    {
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
    }
    else if(tour =="b")
    {
        console.log("change de tour");
        tour = "w";
    }
})


/*
socket.on("actualize",(fen)=>{
    identique = true
    boardState=jsonman.fen2json(fen.split(' ')[0]);
    tour = fen.split(' ')[1];
    cases = document.getElementsByClassName('case')
    for(var i =0;i<cases.length;i++){
        if((boardState.hasOwnProperty(cases[i])==null && cases[i].style.backgroundImage!=null))
        {
            identique=false;
        }
        
        else if(boardState.hasOwnProperty(cases[i])!=null &&cases[i].style.backgroundImage==null)
        {
            identique=false;
        }
        else if(boardState[cases[i]] != cases.style.backgroundImage.substring(20,22))
        {
            identique = false   
        }
    }
    if (!identique){
        for(let i= 0;i<8;i++){
            for(let j=1;j<=8;j++){
                document.getElementById( notation[i]+ j.toString()).style.backgroundImage=null;
            }
        }
        for(var key in boardState){
            ajouterPiece(boardState[key],key)
        }
    }   
    console.log(boardState);
})
*/
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
