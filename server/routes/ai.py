from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import openai
import hashlib
import json
import logging

ai_bp = Blueprint('ai_bp', __name__)

# Helper functions (copied from app.py, can be moved to a separate utils file if more are added)
def get_cached_response(key):
    redis_client = current_app.config['SESSION_REDIS']
    cached_data = redis_client.get(key)
    if cached_data:
        return json.loads(cached_data)
    return None

def set_cached_response(key, data, ex=3600): # Cache for 1 hour by default
    redis_client = current_app.config['SESSION_REDIS']
    redis_client.setex(key, ex, json.dumps(data))

@ai_bp.route('/ai-chat', methods=['POST'])
@jwt_required()
def ai_chat():
    user_id = get_jwt_identity()
    if not user_id:
        logging.error("Unauthorized access to ai-chat route without valid JWT.")
        return jsonify({"error": "Unauthorised"}), 401

    data = request.json
    message = data.get("message")

    if not message:
        logging.warning("AI chat attempt with no message provided.")
        return jsonify({"error": "No message provided"}), 400

    cache_key = f"ai_chat:{hashlib.md5(message.encode('utf-8')).hexdigest()}"
    cached_response = get_cached_response(cache_key)

    if cached_response:
        return jsonify({"response": cached_response}), 200

    try:
        ai_response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        )
        response_content = ai_response.choices[0].message.content
        set_cached_response(cache_key, response_content)
        return jsonify({"response": response_content}), 200
    except Exception as e:
        logging.exception(f"Error communicating with AI: {str(e)}")
        return jsonify({"error": f"Error communicating with AI: {str(e)}"}), 500