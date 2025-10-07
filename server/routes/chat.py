from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User
import logging
import random
from string import ascii_uppercase

chat_bp = Blueprint('chat_bp', __name__)

# Chat room storage (This should ideally be moved to a more persistent store like Redis)
rooms = {}

def generate_unique_code(length):
    """Generate a unique room code for chat."""
    while True:
        code = ''.join(random.choice(ascii_uppercase) for _ in range(length))
        if code not in rooms:
            return code

@chat_bp.route("/join-room", methods=["POST"])
@jwt_required()
def join_room_route():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        logging.error(f"User not found for JWT identity: {user_id}")
        return jsonify({"error": "User not found"}), 404

    data = request.json
    name = user.username # Use username from JWT
    code = data.get("code")
    if not name:
        logging.warning("Join room attempt with no name provided.")
        return jsonify({"error": "Please enter name"}), 400
    if not code:
        logging.warning("Join room attempt with no room code provided.")
        return jsonify({"error": "Please enter room code"}), 400
    if code not in rooms:
        logging.warning(f"Join room attempt for non-existent room: {code}")
        return jsonify({"error": "Room does not exist"}), 404
    return jsonify({"room": code, "name": name}), 200

@chat_bp.route("/create-room", methods=["POST"])
@jwt_required()
def create_room_route():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        logging.error(f"User not found for JWT identity: {user_id}")
        return jsonify({"error": "User not found"}), 404

    data = request.json
    name = user.username # Use username from JWT
    if not name:
        logging.warning("Create room attempt with no name provided.")
        return jsonify({"error": "Please enter name"}), 400
    code = generate_unique_code(4)
    rooms[code] = {"members": 0, "messages": []}
    return jsonify({"room": code, "name": name}), 201