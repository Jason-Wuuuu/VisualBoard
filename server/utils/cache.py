import redis
import json
from config import REDIS_HOST, REDIS_PORT, REDIS_DB, CLEAR_CACHE_AFTER

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)


def get_cached_data(key: str):
    cached_data = redis_client.get(key)
    return json.loads(cached_data) if cached_data else None


def set_cached_data(key: str, data):
    redis_client.set(key, json.dumps(data), CLEAR_CACHE_AFTER)
