import { useState } from "react";

import { POSITION } from "../../position.js";

import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
} from "@mui/material";

const PERIOD = {
  "1d": "1 day",
  "5d": "5 days",
  "1mo": "1 month",
  "3mo": "3 months",
  "6mo": "6 months",
  "1y": "1 year",
  "2y": "2 years",
  "5y": "5 years",
  "10y": "10 years",
  ytd: "Year to Date",
  max: "Max",
};

function StockParamsInput({
  handleSubmit,
  position,
  handlePositionChange,
  period,
  handlePeriodChange,
}) {
  const [input, setInput] = useState("");
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box width="80%" display="flex" justifyContent="space-evenly">
      <FormControl
        size="small"
        variant="standard"
        sx={{ width: 120 }}
        color="info"
      >
        <InputLabel>Position</InputLabel>

        <Select value={position} onChange={handlePositionChange}>
          <MenuItem value={""} key={"none"}>
            None
          </MenuItem>
          <Divider />
          {POSITION.map((ticker) => {
            return (
              <MenuItem value={ticker} key={ticker}>
                {ticker}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <TextField
        size="small"
        label="Ticker"
        variant="standard"
        // autoFocus
        spellCheck="false"
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(input);
            setInput("");
          }
        }}
        color="info"
        sx={{ mx: 2 }}
      />

      <FormControl
        size="small"
        variant="standard"
        sx={{ width: 120 }}
        color="info"
      >
        <InputLabel>Period</InputLabel>

        <Select value={period} onChange={handlePeriodChange}>
          {Object.keys(PERIOD).map((key) => {
            return (
              <MenuItem value={key} key={key}>
                {PERIOD[key]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default StockParamsInput;
