import os
import eventlet
from threading import Lock
from flask import Flask,render_template,request
from flask_socketio import SocketIO, send,emit

app = Flask(__name__,static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'
socketio= SocketIO(app, async_mode='eventlet')



@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
  

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

if __name__ == '__main__':
    socketio.run(app)

    
    
