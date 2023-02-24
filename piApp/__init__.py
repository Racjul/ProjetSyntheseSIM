import os
from flask import Flask,render_template
from flask_socketio import SocketIO, send,emit

app = Flask(__name__, instance_relative_config=True,static_url_path='/static')
socketio= SocketIO(app)
app.config.from_mapping(
        SECRET_KEY='dev',
    )


@app.route('/')
def index():
    return render_template("index.html")
