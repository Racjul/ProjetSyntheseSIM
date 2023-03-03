
from flask import Flask, render_template
from flask_socketio import Socketio
app = Flask(__name__, static_url_path='/static')
@app.route('/')
def index():
    return render_template("index.html")