import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # Usa la variable de entorno en Railway
    SQLALCHEMY_TRACK_MODIFICATIONS = False
