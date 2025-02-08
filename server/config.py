from dotenv import load_dotenv
import os
import redis


load_dotenv()

class ApplicationConfig:
    
    SECRET_KEY = os.environ['SECRET_KEY']
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://red-cujogvrv2p9s7384kmig:6379")
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)