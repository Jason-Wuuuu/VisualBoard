import { useState, useEffect } from "react";

import { getStockRecommendations } from "../../stock";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { BarChart } from "@mui/x-charts/BarChart";

function StockRecommendationsChart({ ticker }) {
  const [fetching, setFetching] = useState(false);

  const [recommendations, setRecommendations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      getStockRecommendations(ticker)
        .then((data) => {
          setRecommendations(data);
          setFetching(false);
        })
        .catch((e) => console.log(e));
    };

    if (ticker) fetchData();
  }, [ticker]);

  return (
    <Grid
      container
      direction="column"
      display="flex"
      alignItems="center"
      height="100%"
    >
      <Grid item>
        {fetching && !recommendations ? (
          <Box
            height="20vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Typography align="center" variant="h5" sx={{ fontWeight: "bold" }}>
            Recommendations
          </Typography>
        )}
      </Grid>

      {recommendations && (
        <Grid item width={"80%"} mt={1}>
          <BarChart
            height={200}
            dataset={recommendations}
            xAxis={[{ scaleType: "band", dataKey: "period" }]}
            series={[
              {
                dataKey: "strongBuy",
                label: "Strong Buy",
                // stack: "buy",
                highlightScope: { highlighted: "series", faded: "global" },
              },
              {
                dataKey: "buy",
                label: "Buy",
                // stack: "buy",
                highlightScope: { highlighted: "series", faded: "global" },
              },
              {
                dataKey: "hold",
                label: "Hold",
                // stack: "hold",
                highlightScope: { highlighted: "series", faded: "global" },
              },
              {
                dataKey: "sell",
                label: "Sell",
                // stack: "sell",
                highlightScope: { highlighted: "series", faded: "global" },
              },
              {
                dataKey: "strongSell",
                label: "Strong Sell",
                // stack: "sell",
                highlightScope: { highlighted: "series", faded: "global" },
              },
            ]}
            slotProps={{
              legend: {
                itemMarkWidth: 15,
                itemMarkHeight: 15,
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default StockRecommendationsChart;
