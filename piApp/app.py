import os
import eventlet
from threading import Lock
from flask import Flask,render_template,request
from flask_socketio import SocketIO, send,emit

app = Flask(__name__,static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'
socket= SocketIO(app, async_mode='eventlet')



@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    socket.send("test")
  

@app.route('/')
def index():
    return render_template('index.html', async_mode=socket.async_mode)

if __name__ == '__main__':
    socket.run(app)

    
    
