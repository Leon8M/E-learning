from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from models import db, User
import logging

auth_bp = Blueprint('auth_bp', __name__)
bcrypt = Bcrypt() # Initialize Bcrypt here, will be initialized with app later

@auth_bp.route('/@me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    
    if not user:
        logging.error(f"User not found for JWT identity: {current_user_id}")
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

@auth_bp.route("/register", methods=['POST'])
def register_user ():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]
    
    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        logging.warning(f"Registration attempt with existing email: {email}")
        return jsonify({"error": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username = username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    access_token = create_access_token(identity=new_user.id)
    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "access_token": access_token
    })
  
@auth_bp.route("/login", methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()
    if user is None:
        logging.warning(f"Login attempt with non-existent email: {email}")
        return jsonify({"error": "Unauthorised"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        logging.warning(f"Login attempt with incorrect password for email: {email}")
        return jsonify({"error": "Unauthorised"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "access_token": access_token
    })
    
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout_user():
    logging.info(f"User {get_jwt_identity()} logged out.")
    return jsonify({"message": "Successfully logged out"}), 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required()
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    logging.info(f"Token refreshed for user: {current_user}")
    return jsonify({"access_token": new_access_token}), 200