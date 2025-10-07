from dotenv import load_dotenv
from datetime import timedelta
import os
import redis


load_dotenv()

class ApplicationConfig:
    
    SECRET_KEY = os.environ['SECRET_KEY']
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"postgresql://e-learning_owner:npg_mkyjGB07DOVE@ep-yellow-boat-a8f4h2zp-pooler.eastus2.azure.neon.tech/e-learning?sslmode=require"
    
    JWT_SECRET_KEY = os.environ['SECRET_KEY'] # Use a separate, strong secret in production
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_NAME = "session"
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = True  
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_REDIS = redis.from_url(os.getenv("REDIS_URL"))
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)