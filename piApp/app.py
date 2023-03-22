from stockfish import Stockfish
import os
import eventlet
from threading import Lock
from flask import Flask,render_template,request
from flask_socketio import SocketIO, send,emit


board = chess.board()
#permet de donner la directory des fichier statics du projet
app = Flask(__name__,static_url_path='/static')

# À changer pour la version finale du projet (sert uniquement au debug)
app.config['SECRET_KEY'] = 'test'

#permet de définir la librairie à utiliser pour la comunication serveur 
socketio= SocketIO(app, async_mode='eventlet')

#permet de donner la directory de l'engine d'échec
stockfish = Stockfish(path="/usr/games/stockfish")

#permet de print dans la console, les messages reçus provenant du site web
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    socketio.send("Connection établie")

# permet de vérifier si le coup est valide à l'aide de l'engine stockfish
@socketio.on('coupDemande')
def handle_my_custom_event(piece,id ,caseInitial):
    if(stockfish.is_move_correct(caseInitial+ id)):
        socketio.emit("coupValide",str(piece)+ str(id)+str(caseInitial))
        board.push_san("e2e4")
    else:
        socketio.emit("coupInvalide",caseInitial)

# retourne la page index si aucune directory est demandée
@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

if __name__ == '__main__':
    socketio.run(app)

    
    