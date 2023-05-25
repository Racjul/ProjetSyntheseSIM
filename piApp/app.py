from stockfish import Stockfish
import os
import eventlet
eventlet.monkey_patch()
import threading as th
import time
from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit
import math
from algo import Grille
import serial


playWithWebSite= True
capture = False

grille = Grille(160,"white")

# permet de donner la directory des fichier statics du projet
app = Flask(__name__, static_url_path='/static')

# À changer pour la version finale du projet (sert uniquement au debug)
app.config['SECRET_KEY'] = 'test'

# permet de définir la librairie à utiliser pour la comunication serveur
socketio = SocketIO(app, async_mode='eventlet')

ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)


# permet de donner la directory de l'engine d'échec
stockfish = Stockfish(path="/usr/games/stockfish", depth=18)


timeW = 600
timeB = 600





def fen_to_board(fen):
    board = []
    for row in fen.split('/'):
        brow = []
        for c in row:
            if c == ' ':
                break
            elif c in '12345678':
                brow.extend( ['--'] * int(c) )
            elif c == 'p':
                brow.append( 'bp' )
            elif c == 'P':
                brow.append( 'wp' )
            elif c > 'Z':
                brow.append( 'b'+c.upper() )
            else:
                brow.append( 'w'+c )

        board.append( brow )
    return board


# permet de print dans la console, les messages reçus provenant du site web
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


# permet de vérifier si le coup est valide à l'aide de l'engine stockfish
@socketio.on('coupDemande')
def handle_my_custom_event(piece, id, caseInitial):
    print("piece: " + piece)
    print("id:" + id)
    if ((piece == "wp" and id[1] == '8') or (piece == "bp" and id[1] == '1')):
        id = id + "q"
        print("promotion")
    
    if (stockfish.is_move_correct(caseInitial + id)):
        stockfish.make_moves_from_current_position([caseInitial + id])
        socketio.emit("coupValide", piece + id + caseInitial)
        print(stockfish.get_board_visual())
        # verify checkmate
        best = stockfish.get_best_move_time(500)
        if (best == None or best == "None" or best == 'None'):
            socketio.emit("checkmate")
    else:
        socketio.emit("coupInvalide", caseInitial)


# permet de vérifier le coup du joueur et d'effectuer le coup du bot
@socketio.on('coupDemandeBot')
def handle_my_custom_event(piece, id, caseInitial):
    if (stockfish.is_move_correct(caseInitial + id)):
        capture = False
        stockfish.make_moves_from_current_position([caseInitial + id])
        socketio.emit("coupValide", str(piece) + str(id) + str(caseInitial))

        print(stockfish.get_board_visual())

        # verify checkmate
        best = stockfish.get_best_move_time(500)
        if (best == None or best == "None" or best == 'None'):
            socketio.emit("checkmate")
            return

        best = stockfish.get_best_move_time(1000)
        
        print(stockfish.will_move_be_a_capture(best))
        if stockfish.will_move_be_a_capture(best) == stockfish.Capture.DIRECT_CAPTURE:
            print("cool")
            capture = True
        stockfish.make_moves_from_current_position([best])
        socketio.emit("coupValideBot", best)
        print("Le bot a fait:" + best)
        print(f"caseI:  {best[:2]}, caseF: {best[2:]}")

        print(stockfish.get_board_visual())
        grille.move(best[:2],best[2:],capture,False)
        # verify checkmate
        best = stockfish.get_best_move_time(500)
        if (best == None or best == "None" or best == 'None'):
            socketio.emit("checkmate")
            return
    else:
        socketio.emit("coupInvalide", caseInitial)


# permet de placer la position par défaut du jeu
@socketio.on('restart')
def handle_my_custom_event():
    stockfish.set_fen_position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")


# change difficulty of the bot
@socketio.on('changerElo')
def handle_my_custom_event(Elo):
    print("Nouvelle Elo " + Elo)
    stockfish.set_elo_rating(Elo)


@socketio.on('actualizeWeb')
def handle_my_custom_event():
    chiffre = "12345678"
    lettre = "abcdefgh"
    difference = 0
    empty= [0,0]
    full = [0,0]
    ser.write("s#".encode('utf-8'))
    line = ser.readline().decode('utf-8').rstrip()
    ser.reset_input_buffer()
    lignes = line.split('/')
    board = fen_to_board(stockfish.get_fen_position())
    print("test")
    for i in range(8):
        for j in range(8):
            if board[7-i][j] == "--" and lignes[j][i] == '1':
                difference +=1
                full[0] = i
                full[1] = j
            if board[i][j] != "--" and lignes[j][i] == '0':
                difference +=1
                empty[0] = i
                empty[1] = j
    print(difference)
    if difference == 1:
        time.sleep(4)
        ser.write("s#".encode('utf-8'))
        line2 = ser.readline().decode('utf-8').rstrip()
        ser.reset_input_buffer()
        lignes2 = line2.split('/') 
        for i in range(8):
            for j in range(8):
                if lignes[i][j] == "1" and lignes2[i][j] == "0":
                    if(stockfish.is_move_correct(lettre[empty[1]]+chiffre[empty[0]]+lettre[j]+chiffre[i])):
                        stockfish.make_moves_from_current_position([lettre[empty[1]]+chiffre[empty[0]]+lettre[j]+chiffre[i]])
    elif difference == 2:
        if(stockfish.is_move_correct(lettre[empty[1]]+chiffre[empty[0]]+lettre[full[1]]+chiffre[full[0]])):
            print(lettre[empty[1]]+chiffre[empty[0]]+lettre[full[1]]+chiffre[full[0]])
            stockfish.make_moves_from_current_position([lettre[empty[1]]+chiffre[empty[0]]+lettre[full[1]]+chiffre[full[0]]])
        else:
            print("Erreur: Mauvais coup")    
    socketio.emit("actualize", stockfish.get_fen_position())


# retourne la page index si aucune directory est demandée
@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)


######################################
# main()
if __name__ == '__main__':
    os.system("gunicorn --bind 0.0.0.0:8000 --worker-class eventlet -w 1 app:app")
    

