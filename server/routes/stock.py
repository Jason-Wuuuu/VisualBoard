from fastapi import APIRouter
from services.stock_service import get_stock_history, get_stock_info, get_stock_calendar, get_stock_recommendations
from utils.cache import get_cached_data, set_cached_data

router = APIRouter()


@router.get("/history/{ticker}")
async def stock_history(ticker: str, interval: str = "1d", period: str = "1mo"):
    cache_key = f'{ticker}_{interval}_{period}_history'
    cached_data = get_cached_data(cache_key)
    if cached_data:
        return cached_data
    data = get_stock_history(ticker, interval, period)
    set_cached_data(cache_key, data)
    return data


@router.get("/info/{ticker}")
async def stock_info(ticker: str):
    cache_key = f'{ticker}_info'
    cached_data = get_cached_data(cache_key)
    if cached_data:
        return cached_data
    info = get_stock_info(ticker)
    set_cached_data(cache_key, info)
    return info


@router.get("/calendar/{ticker}")
async def stock_calendar(ticker: str):
    cache_key = f'{ticker}_calendar'
    cached_data = get_cached_data(cache_key)
    if cached_data:
        return cached_data
    calendar = get_stock_calendar(ticker)
    set_cached_data(cache_key, calendar)
    return calendar


@router.get("/recommendations/{ticker}")
async def stock_recommendations(ticker: str):
    cache_key = f'{ticker}_recommendations'
    cached_data = get_cached_data(cache_key)
    if cached_data:
        return cached_data
    recommendations = get_stock_recommendations(ticker)
    set_cached_data(cache_key, recommendations)
    return recommendations
