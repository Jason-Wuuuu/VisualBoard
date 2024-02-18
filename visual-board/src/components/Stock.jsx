import { useState } from "react";

import HomePageButton from "./HomePageButton";

import { Box } from "@mui/material";

import StockParamsInput from "./Stock/StockParamsInput";
import StockDashboard from "./Stock/StockDashboard";

function Stock() {
  const [ticker, setTicker] = useState("");
  const handleSubmit = (value) => {
    setPosition("");
    setTicker(value.toUpperCase());
  };

  const [position, setPosition] = useState("");
  const handlePositionChange = (event) => {
    setTicker("");
    setPosition(event.target.value.toUpperCase());
  };

  const [period, setPeriod] = useState("1mo");
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Box
      minHeight="80vh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={1}
    >
      <StockParamsInput
        handleSubmit={handleSubmit}
        position={position}
        handlePositionChange={handlePositionChange}
        period={period}
        handlePeriodChange={handlePeriodChange}
      />

      <StockDashboard
        ticker={ticker !== "" ? ticker : position}
        period={period}
      />

      <HomePageButton />
    </Box>
  );
}

export default Stock;
