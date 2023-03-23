from stockfish import Stockfish
import os
import eventlet
from threading import Lock
from flask import Flask,render_template,request
from flask_socketio import SocketIO, send,emit
import math



#permet de donner la directory des fichier statics du projet
app = Flask(__name__,static_url_path='/static')

# À changer pour la version finale du projet (sert uniquement au debug)
app.config['SECRET_KEY'] = 'test'

#permet de définir la librairie à utiliser pour la comunication serveur 
socketio= SocketIO(app, async_mode='eventlet')

#permet de donner la directory de l'engine d'échec
stockfish = Stockfish(path="/usr/games/stockfish",depth=18)


#permet de print dans la console, les messages reçus provenant du site web
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    socketio.send("Connection établie")

# permet de vérifier si le coup est valide à l'aide de l'engine stockfish
@socketio.on('coupDemande')
def handle_my_custom_event(piece,id ,caseInitial):
    if(stockfish.is_move_correct(caseInitial+ id)):
        stockfish.make_moves_from_current_position([caseInitial+id])
        socketio.emit("coupValide",str(piece)+ str(id)+str(caseInitial))
        

        
        print(stockfish.get_board_visual())

        #verify checkmate
        best = stockfish.get_best_move_time(500)
        if(best == None or best== "None" or best == 'None'):
            socketio.emit("checkmate")
    else:
        socketio.emit("coupInvalide",caseInitial)
#permet de vérifier le coup du joueur et d'effectuer le coup du bot      
@socketio.on('coupDemandeBot')
def handle_my_custom_event(piece,id ,caseInitial):
    if(stockfish.is_move_correct(caseInitial+ id)):
        stockfish.make_moves_from_current_position([caseInitial+id])
        socketio.emit("coupValide",str(piece)+ str(id)+str(caseInitial))
        
        print(stockfish.get_board_visual())
        
        #verify checkmate
        best = stockfish.get_best_move_time(500)
        if(best == None or best== "None" or best == 'None'):
            socketio.emit("checkmate")
            return
        
        best = stockfish.get_best_move_time(1000)
        print()
        print("Le bot a fait: "+best)
        stockfish.make_moves_from_current_position([best])
        socketio.emit("coupValideBot",best)
        
        print(stockfish.get_board_visual())
        
        #verify checkmate
        best = stockfish.get_best_move_time(500)
        if(best == None or best== "None" or best == 'None'):
            socketio.emit("checkmate")
            return
    else:
        socketio.emit("coupInvalide",caseInitial)


#permet de placer la position par défaut du jeu
@socketio.on('restart')
def handle_my_custom_event():
    stockfish.set_fen_position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

@socketio.on('changerElo')
def handle_my_custom_event(Elo):
    print("Nouvelle Elo " + Elo)
    stockfish.set_elo_rating(Elo)



# retourne la page index si aucune directory est demandée
@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

if __name__ == '__main__':
    socketio.run(app)



def algo(x,y):
    
    #******Information importante
    #Toutes les mesures sont en milimètre

    #Grandeur du jeu
    Yhauteur_jeux=400
    Xlargeur_jeux=600


    #y et x sont les valeurs dans le plans de la case où l'on veut que l'aimant se déplace
    if(x>Xlargeur_jeux):
        print("position en x invalide")
        return
    
    if(y>Yhauteur_jeux):
        print("position en y invalide")
        return
    


    #longueur des branches  
    longueurBranche=300

    #rayon et nombre de dents des engrenages 
    rayonmenante = 5
    #rayonMene = ?

    nbDentMenante = 20
    nbDentMene = 50

    #Le rapport d'engrenage détermine le rapport de vitesse angulaire, donc le rapport entre le nombre d'angle parcourue ===> 
    #si le rapport est de 1/2, la roue 2 tourne de 1/2 fois pour chaque degrés
    raportEngrenage = nbDentMenante/nbDentMene

    angle_par_step_petit_engrenage = 200/360

    #représante le nombre de degré que la branche tourne (relié au grand engrenage)
    angle_par_step_grand_engrenage = raportEngrenage * angle_par_step_petit_engrenage

    Angle1 = math.degrees(math.atan())

     






    
    