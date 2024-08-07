from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0

CLEAR_CACHE_AFTER = 1000

ORIGINS = [
    "http://localhost",
    "http://localhost:5173",
]


def configure_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=ORIGINS,
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )
