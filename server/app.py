from flask import Flask, jsonify, request, make_response, render_template
from config import ApplicationConfig
from flask_cors import CORS, cross_origin

from flask_session import Session

from flask_socketio import SocketIO, join_room, leave_room, send
from datetime import datetime, timedelta
from functools import wraps
from models import db, User, File
import random
import os
import json
import redis
import uuid
from string import ascii_uppercase
from werkzeug.utils import secure_filename

# Import for file processing
import PyPDF2
import docx
import openpyxl
import openai

# Import for secure filename
from werkzeug.utils import secure_filename

# Import for hashing
import hashlib
import magic
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173"]}},
    supports_credentials=True
)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

server_session = Session(app)
db.init_app(app)


socketio = SocketIO(
    app,
    cors_allowed_origins="http://localhost:5173"
)

with app.app_context():
    db.create_all()

# Error Handlers
@app.errorhandler(400)
def bad_request(error):
    logging.error(f"Bad Request: {error}")
    return jsonify({"error": "Bad Request", "message": str(error)}), 400

@app.errorhandler(401)
def unauthorized(error):
    logging.error(f"Unauthorized: {error}")
    return jsonify({"error": "Unauthorized", "message": str(error)}), 401

@app.errorhandler(404)
def not_found(error):
    logging.error(f"Not Found: {error}")
    return jsonify({"error": "Not Found", "message": str(error)}), 404

@app.errorhandler(500)
def internal_server_error(error):
    logging.exception(f"Internal Server Error: {error}")
    return jsonify({"error": "Internal Server Error", "message": "Something went wrong on the server."}), 500

# Register blueprints
from server.routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')

from server.routes.file import file_bp
app.register_blueprint(file_bp, url_prefix='/file')

from server.routes.ai import ai_bp
app.register_blueprint(ai_bp, url_prefix='/ai')

from server.routes.chat import chat_bp
app.register_blueprint(chat_bp, url_prefix='/chat')

from server.routes.quiz import quiz_bp
app.register_blueprint(quiz_bp, url_prefix='/quiz')

# Chat Room Routes

# WebSocket Events for Chat
@socketio.on("message")
def handle_message(data):
    room = session.get("room")
    if room in rooms:
        content = {"name": session.get("name"), "message": data["data"]}
        rooms[room]["messages"].append(content)
        send(content, to=room)

@socketio.on("connect")
def handle_connect():
    room = session.get("room")
    name = session.get("name")
    if room and name:
        join_room(room)
        send({"name": name, "message": "has entered the room"}, to=room)
        rooms[room]["members"] += 1

@socketio.on("disconnect")
def handle_disconnect():
    room = session.get("room")
    name = session.get("name")
    leave_room(room)
    if room in rooms:
        rooms[room]["members"] -= 1
        if rooms[room]["members"] <= 0:
            del rooms[room]
        send({"name": name, "message": "has left the room"}, to=room)
        









 
if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080)
    