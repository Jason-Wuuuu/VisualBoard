import React, { useEffect, useState } from "react";

const StockPriceDisplay = () => {
  const [price, setPrice] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com/");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      // Subscribe to the symbols you're interested in
      ws.send('{"subscribe":["AAPL","MSFT","GOOG"]}');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle incoming data
      console.log("Received data:", data);
      if (data.type === "trade") {
        // Update price state with the latest price
        setPrice(data.price);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Store the WebSocket instance in state
    setSocket(ws);

    // Cleanup function to close the WebSocket connection
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Current Stock Price</h2>
      {price && <p>Price: ${price}</p>}
    </div>
  );
};

export default StockPriceDisplay;
