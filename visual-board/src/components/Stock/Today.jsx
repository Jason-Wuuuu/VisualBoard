import { useState, useEffect } from "react";

import { getStockInfo } from "../../stock";

import { Box, Typography, Chip, Tooltip } from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const KEYS = ["open", "dayHigh", "dayLow", "volume"];

function Today({ ticker }) {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      getStockInfo(ticker)
        .then((data) => {
          setInfo(data);
        })
        .catch((e) => console.log(e));
    };

    if (ticker) fetchData();
  }, [ticker]);

  if (info) {
    const dif = info["currentPrice"] - info["previousClose"];
    const dif_p = (dif / info["previousClose"]) * 100;

    return (
      <Box
        sx={{
          boxShadow: 10,
          borderRadius: 5,
          height: 200,
          width: 200,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", height: "20%" }}
          color="text.secondary"
        >
          Current
        </Typography>

        <Box
          height={"80%"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {`$${info["currentPrice"].toFixed(2)}`}
          </Typography>

          <Tooltip title={`${dif > 0 ? "+" : "-"} ${Math.abs(dif.toFixed(2))}`}>
            <Chip
              icon={
                info["currentPrice"] >= info["previousClose"] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
              label={`${Math.abs(dif_p.toFixed(2))} %`}
              variant="outlined"
              sx={{
                mt: 2,
                boxShadow: 10,
                fontWeight: "bold",
                color:
                  info["currentPrice"] >= info["previousClose"]
                    ? "aqua"
                    : "salmon",
              }}
              clickable
            />
          </Tooltip>
        </Box>
      </Box>
    );
  }
}

export default Today;

{
  /* {KEYS.map((key) => {
  return (
    <Typography key={key} variant="caption" sx={{ fontWeight: "bold" }}>
      {`${key} - ${info[key]}`}
    </Typography>
  );
})} */
}
