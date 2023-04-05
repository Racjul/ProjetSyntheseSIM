//liste des events listener des socket


//permet de vérifier qu'il y a bien eu une connection
socket.on('connect', function() {
    socket.send("connection établie: " + socket.id )
});



//debugage
socket.on('message',function(msg)
{
    console.log(msg)
})





// Effectue le coup suite à la vérification 
// C'est le ping qui est recu lorsque le coup est validé
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



// meme fonction que coup valide ,mais ce n'est pas l'utilisateur qui rentre le coup
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


// Remet les paramètres à 0 et informe que son coup est invalide dans le cas d'un coup invalide
socket.on("coupInvalide",(caseI)=>
{
    alert("Coup non-autorisé");
    document.getElementById(caseI).style.border="thick solid transparent";
    caseI=null;
})

// Permet d'afficher si la partie est terminée
socket.on("checkmate",()=>{
    alert("Checkmate!")
    
})


socket.on("actualize",(data)=>{
    fen = data.split(' ')[0]
    tour = data.split(' ')[1]
    var rowChars = [];
    var transform = [];
    fen.split('/').forEach(function (row) {
        row.split('').forEach(function (char) {
            if (isNaN(parseInt(char))) {
                rowChars.push(char);
            }
            else {
                var emptySquares = parseInt(char);
                for (var i = 0; i < emptySquares; i++) {
                    rowChars.push("");
                }
            }
        });
        transform.push(rowChars);
        rowChars = [];
    });

    ligne = ["a","b","c","d","e","f","g","h"];
    colonne = ["1","2","3","4","5","6","7","8"];
    tableau = transform.reverse();
    console.log(transform);  
    console.log(tour)  
    var different = false;
    for(var i =0;i<8;i++)
    {
        for(var j = 0; j < 8;j++)
        {
            document.getElementById(ligne[i] + colonne[j])
        }
    }
  
    if(different)
    {
        
    }
    
})
