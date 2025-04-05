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
    
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_COOKIE_NAME = "session"
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = True  
    SESSION_COOKIE_SAMESITE = "None"
    SESSION_REDIS = redis.from_url("redis://red-cujogvrv2p9s7384kmig:6379")
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)