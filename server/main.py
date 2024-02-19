from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import redis

import json
import datetime
import numpy as np
import yfinance as yf


app = FastAPI()
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:5173",  # Assuming your frontend is served on this port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

CLEAR_CACHE_AFTER = 1000


@app.get("/stock/history/{ticker}")
async def get_stock_history(ticker: str, interval: str = "1d", period: str = "1mo"):
    """
    Get stock data for a given ticker symbol.

    Params:
    - ticker: The ticker symbol of the stock (e.g., "AAPL" for Apple).
    - interval: Optional. The data interval ("1d" for daily, "1wk" for weekly, "1mo" for monthly).
    - period: Optional. The data period ("1d" for one day, "1mo" for one month, "1y" for one year).

    Returns:
    - Stock data in JSON format.
    """

    LINES_TO_DROP = [
        "Open",
        "High",
        "Low",
        "Dividends",
        "Stock Splits",
    ]

    SHORT_SPAN = 20
    LONG_SPAN = 50

    try:
        if period == "1d":
            interval = "2m"

        cache_key = f'{ticker}_{interval}_{period}_history'

        cached_data = redis_client.get(cache_key)
        if cached_data:
            return json.loads(cached_data)
        else:
            stock = yf.Ticker(ticker)
            history = stock.history(period=period, interval=interval)

            history.rename_axis("Date", inplace=True)

            history = history.drop(LINES_TO_DROP, axis=1).reset_index()

            history["Volume"] = (history["Volume"] - history["Volume"].min()) / \
                (history["Volume"].max() - history["Volume"].min())

            close_mean = round(history['Close'].mean(), 2)
            close_median = round(history['Close'].median(), 2)

            # Exponential Moving Average (EMA) EMA gives more weight to recent prices, offering a closer look at the current trend.
            history[f'EMA({SHORT_SPAN})'] = history['Close'].ewm(
                span=SHORT_SPAN, adjust=False).mean()

            history[f'EMA({LONG_SPAN})'] = history['Close'].ewm(
                span=LONG_SPAN, adjust=False).mean()

            # Bollinger Bands are used to assess volatility and potential overbought/oversold conditions.
            # history[f'UpBB({SHORT_SPAN})'] = history[f'EMA({SHORT_SPAN})'] + \
            #     (history['Close'].rolling(SHORT_SPAN).std() * 2)

            # history[f'LowBB({SHORT_SPAN})'] = history[f'EMA({SHORT_SPAN})'] - \
            #     (history['Close'].rolling(SHORT_SPAN).std() * 2)

            # history[f'UpBB({LONG_SPAN})'] = history[f'EMA({LONG_SPAN})'] + \
            #     (history['Close'].rolling(LONG_SPAN).std() * 2)
            # history[f'LowBB({LONG_SPAN})'] = history[f'EMA({LONG_SPAN})'] - \
            #     (history['Close'].rolling(LONG_SPAN).std() * 2)

            # history['Bullish'] = 0.0
            # history['Bullish'] = np.where(
            #     history[f'EMA({SHORT_SPAN})'] < history[f'EMA({LONG_SPAN})'], 1.0, 0.0)

            # history['Crossover'] = history['Bullish'].diff()

            # history['Daily_Return'] = history['Close'].pct_change() * 100

            history = history.to_json(orient="columns")
            statistics = {
                "Mean": close_mean,
                "Median": close_median
            }

            data = {"data": history, "statistics": statistics}

            redis_client.set(cache_key, json.dumps(data), CLEAR_CACHE_AFTER)

            return data
    except Exception as e:
        return {"error": str(e)}


@app.get("/stock/info/{ticker}")
async def get_stock_info(ticker: str):
    try:
        cache_key = f'{ticker}_info'

        cached_data = redis_client.get(cache_key)
        if cached_data:
            return json.loads(cached_data)
        else:
            stock = yf.Ticker(ticker)

            info = stock.info

            redis_client.set(cache_key, json.dumps(info), CLEAR_CACHE_AFTER)

            return info
    except Exception as e:
        return {"error": str(e)}


@app.get("/stock/calendar/{ticker}")
async def get_stock_calendar(ticker: str):
    try:
        cache_key = f'{ticker}_calendar'

        cached_data = redis_client.get(cache_key)
        if cached_data:
            return json.loads(cached_data)
        else:
            stock = yf.Ticker(ticker)

            calendar = stock.calendar
            for key, val in calendar.items():
                if isinstance(val, datetime.date):
                    calendar[key] = val.isoformat()
                if key == "Earnings Date":
                    calendar[key] = [dt.isoformat() for dt in calendar[key]]

            redis_client.set(cache_key, json.dumps(
                calendar), CLEAR_CACHE_AFTER)

            return calendar
    except Exception as e:
        return {"error": str(e)}


@app.get("/stock/recommendations/{ticker}")
async def get_stock_recommendations(ticker: str):
    try:
        cache_key = f'{ticker}_recommendations'

        cached_data = redis_client.get(cache_key)
        if cached_data:
            return cached_data
        else:
            stock = yf.Ticker(ticker)

            recommendations = stock.recommendations.to_json(orient="records")

            redis_client.set(cache_key, recommendations, CLEAR_CACHE_AFTER)

            return recommendations
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":

    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
