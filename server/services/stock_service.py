import yfinance as yf
import numpy as np
import datetime


def get_stock_history(ticker: str, interval: str, period: str):
    LINES_TO_DROP = ["Open", "High", "Low", "Dividends", "Stock Splits"]
    SHORT_SPAN, LONG_SPAN = 20, 50

    stock = yf.Ticker(ticker)
    history = stock.history(period=period, interval=interval)
    history.rename_axis("Date", inplace=True)
    history = history.drop(LINES_TO_DROP, axis=1).reset_index()

    close_mean = round(history['Close'].mean(), 2)
    close_median = round(history['Close'].median(), 2)

    history[f'EMA({SHORT_SPAN})'] = history['Close'].ewm(
        span=SHORT_SPAN, adjust=False).mean()
    history[f'EMA({LONG_SPAN})'] = history['Close'].ewm(
        span=LONG_SPAN, adjust=False).mean()

    history = history.to_json(orient="columns")
    statistics = {"Mean": close_mean, "Median": close_median}

    return {"data": history, "statistics": statistics}


def get_stock_info(ticker: str):
    return yf.Ticker(ticker).info


def get_stock_calendar(ticker: str):
    calendar = yf.Ticker(ticker).calendar
    for key, val in calendar.items():
        if isinstance(val, datetime.date):
            calendar[key] = val.isoformat()
        if key == "Earnings Date":
            calendar[key] = [dt.isoformat() for dt in calendar[key]]
    return calendar


def get_stock_recommendations(ticker: str):
    return yf.Ticker(ticker).recommendations.to_json(orient="records")
