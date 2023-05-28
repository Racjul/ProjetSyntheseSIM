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

    //vérifie si le coup demandé est un roque
    //pour les 2 couleurs
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
    //vérifie si il s'agit d'une promotion de pion
    //pour les 2 couleurs
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

    // retire les éléments de l'ancienne case d'échec
    // et retire la possibilité au joueur d'effectuer un coup à partir de cette case 
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



// même fonction que coup valide, mais ce n'est pas l'utilisateur qui rentre le coup
//Dans ce cas, c'est le coup qui est demandé au bot d'échec(voir app.py 'coupDemandeBot')
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

// permet de vérifier si le site internet possède la même version
// du plateau que Stockfish
// Ainsi, il n'y a aucune action à entreprendre lorsque les capteurs à effet
// de Hall identifie un coup
socket.on("actualize",(data)=>{
    //data est la notation FEN de l'état du plateau d'échec 
    fen = data.split(' ')[0]
    tour = data.split(' ')[1]
    var rowChars = [];
    var transform = [];

    //permet de transformer la notation classique des échecs en tableau 
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
    var different = false;

    //vérifie si l'état du plateau est identique au plateau réel
    for(var i =0;i<8;i++)
    {
        for(var j = 0; j < 8;j++)
        {
            if((document.getElementById(ligne[j] + colonne[i]).style.backgroundImage == null) && (tableau[i][j]!='')){
                different=true;
            }
            else if((document.getElementById(ligne[j] + colonne[i]).style.backgroundImage != null) && (tableau[i][j]==''))
            {
                different = true
            }
            else if(document.getElementById(ligne[j] + colonne[i]).style.backgroundImage.substring(21,22) != tableau[i][j].toLowerCase())
            {

                different = true; 
            }
        }
    }
  //Si l'état du palteau est différent, il effectue les modifications pour être identique
  // à l'état du plateau selon l'échiquier réel
    if(different)
    {
        var color = "b";
        for(let i= 0;i<8;i++){
            for(let j=1;j<=8;j++){
                document.getElementById( notation[i]+ j.toString()).style.backgroundImage=null;
            }
        }
        for(let i= 0;i<8;i++){
            for(let j=0;j<8;j++){
                if(tableau[i][j] != '')
                {
                    if(containsUppercase(tableau[i][j]))
                    {
                        color="w"
                    }
                    ajouterPiece(color + tableau[i][j].toLowerCase(), ligne[j] + colonne[i])
                    color = "b"
                }
            }
        }
    }
    
})
