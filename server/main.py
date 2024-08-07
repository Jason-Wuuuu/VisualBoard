from fastapi import FastAPI
from config import configure_cors
from routes.stock import router as stock_router

app = FastAPI()

configure_cors(app)
app.include_router(stock_router, prefix="/stock")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
