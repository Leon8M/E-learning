from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, File, User
import logging
import json

quiz_bp = Blueprint('quiz_bp', __name__)

@quiz_bp.route('/get-questions/<file_id>', methods=['GET'])
@jwt_required()
def get_questions(file_id):
    user_id = get_jwt_identity()
    if not user_id:
        logging.error("Unauthorized access to get-questions route without valid JWT.")
        return jsonify({"error": "Unauthorised"}), 401

    file_record = File.query.filter_by(id=file_id, uploaded_by=user_id).first()

    if not file_record:
        logging.warning(f"File not found or unauthorized: {file_id} for user {user_id}")
        return jsonify({"error": "File not found or not authorized"}), 404

    if not file_record.questions:
        logging.warning(f"No questions found for file: {file_id}")
        return jsonify({"error": "No questions available for this file"}), 404

    try:
        # Assuming questions are stored as a JSON string in the database
        questions_data = json.loads(file_record.questions)
        return jsonify({"questions": questions_data}), 200
    except json.JSONDecodeError as e:
        logging.exception(f"Error decoding questions JSON for file {file_id}: {str(e)}")
        return jsonify({"error": "Error processing questions data"}), 500