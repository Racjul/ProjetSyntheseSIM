import os
from flask import Flask,render_template
from flask_socketio import SocketIO, send,emit

app = Flask(__name__,static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'
socketio= SocketIO(app)
   


if __name__ == '__main__':
    socketio.run(app)

    
    
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
  
@app.route('/')
def index():
    return render_template("index.html")