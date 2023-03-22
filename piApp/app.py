from stockfish import Stockfish
import os
import eventlet
from threading import Lock
from flask import Flask,render_template,request
from flask_socketio import SocketIO, send,emit



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

@socketio.on('changerElo',)
def handle_my_custom_event(Elo):
    stockfish.set_elo_rating(Elo)



# retourne la page index si aucune directory est demandée
@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

if __name__ == '__main__':
    socketio.run(app)

    
    