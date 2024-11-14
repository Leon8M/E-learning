from flask import Flask, jsonify, request, make_response, render_template, session
from config import ApplicationConfig
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_socketio import SocketIO, join_room, leave_room, send
from datetime import datetime, timedelta
from functools import wraps
from models import db, User
import random
from string import ascii_uppercase

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
cors = CORS(app, origins='*', supports_credentials=True)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Chat room storage
rooms = {}

def generate_unique_code(length):
    """Generate a unique room code for chat."""
    while True:
        code = ''.join(random.choice(ascii_uppercase) for _ in range(length))
        if code not in rooms:
            return code

with app.app_context():
    db.create_all()


@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorised"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })



@app.route("/register", methods=['GET', 'POST'])
def register_user ():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]
    
    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, username = username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id
    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email
    })
  

 
@app.route("/login", methods=['GET', 'POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorised"}), 401
    
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorised"}), 401
    
    
    session["user_id"] = user.id
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })
    

@app.route('/logout', methods=['POST'])
def logout_user():
    session.pop('user_id')
    return "200"

# Chat Room Routes
@app.route("/join-room", methods=["POST"])
def join_room_route():
    data = request.json
    name = data.get("name")
    code = data.get("code")
    if not name:
        return jsonify({"error": "Please enter name"}), 400
    if not code:
        return jsonify({"error": "Please enter room code"}), 400
    if code not in rooms:
        return jsonify({"error": "Room does not exist"}), 404
    session["name"] = name
    session["room"] = code
    return jsonify({"room": code}), 200

@app.route("/create-room", methods=["POST"])
def create_room_route():
    data = request.json
    name = data.get("name")
    if not name:
        return jsonify({"error": "Please enter name"}), 400
    code = generate_unique_code(4)
    rooms[code] = {"members": 0, "messages": []}
    session["name"] = name
    session["room"] = code
    return jsonify({"room": code}), 201

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
    app.run(debug=True, port=8080)
    