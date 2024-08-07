# Visual Board

An interactive data visualization / dashboard.

<p align="center">
  <img src="https://github.com/Jason-Wuuuu/VisualBoard/blob/main/screenshots/stock1.png" width="48%" alt="VisualBoard Screenshot 1">
  <img src="https://github.com/Jason-Wuuuu/VisualBoard/blob/main/screenshots/stock2.png" width="48%" alt="VisualBoard Screenshot 2">
</p>

## Features

### Completed Features

- [x] Interactive stock price chart with historical data visualization, market recommendations and stock analysis tools.
- [x] Integration with Material-UI for a cohesive layout and responsive design.
- [x] Real-time stock data fetching using yfinance.
- [x] Backend developed with FastAPI for high-performance data delivery.
- [x] Frontend performance optimization using the useMemo hook in React.
- [x] Backend response time optimization with Redis caching.

### Planned Features

- [ ] Integrate [LSTM stock price prediction model](https://github.com/Jason-Wuuuu/stock_price_prediction) to provide forecasted market trends.
- [ ] Add live functionality during trading hours:
  - [ ] Establish WebSocket connection for live data streaming.
  - [ ] Implement frontend components to display live data.
  - [ ] Integrate backend services to support live data handling and caching.
  - [ ] Design and handle failover and reconnection strategies for live streaming.
- [ ] Generalize dashboard to work with any uploaded CSV file:
  - [ ] Implement CSV file parsing and validation.
  - [ ] Enable dynamic generation of charts based on CSV data structure.
  - [ ] Allow users to map CSV columns to chart parameters.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python
- FastAPI
- Node.js
- npm (usually comes with Node.js)
- Redis

## Getting Started

### Backend Setup

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Create a virtual environment:

   ```
   python -m venv venv
   ```

3. Activate the virtual environment:

   On Windows:

   ```
   venv\Scripts\activate
   ```

   On macOS and Linux:

   ```
   source venv/bin/activate
   ```

4. Install the required Python packages:

   Using pip:

   ```
   pip install -r requirements.txt
   ```

   Or using conda:

   ```
   conda create --name visualboard --file requirements.txt
   conda activate visualboard
   ```

5. Start Redis server:

   ```
   redis-server
   ```

6. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

The backend server should now be running on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd visual-board
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the Vite development server:
   ```
   npm run dev
   ```

The frontend application should now be accessible at `http://localhost:5173`.
