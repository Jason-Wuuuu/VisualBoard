import { useState, useEffect } from "react";

import { getStockRecommendations } from "../../stock";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

function StockRecommendationsChart({ ticker }) {
  const [recommendations, setRecommendations] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      getStockRecommendations(ticker)
        .then((data) => {
          setRecommendations(data);
        })
        .catch((e) => console.log(e));
    };

    if (ticker) fetchData();
  }, [ticker]);

  if (recommendations) {
    return (
      <Grid
        container
        direction="column"
        display="flex"
        alignItems="center"
        height="100%"
      >
        <Grid item>
          <Typography align="center" variant="h5" sx={{ fontWeight: "bold" }}>
            Recommendations
          </Typography>
        </Grid>

        <Grid item width={"80%"} mt={1}>
          <BarChart
            height={150}
            dataset={recommendations.slice(0, -1)}
            xAxis={[{ scaleType: "band", dataKey: "period" }]}
            series={[
              {
                dataKey: "buy",
                label: "Buy",
                // highlightScope: { highlighted: "series", faded: "global" },
              },
              { dataKey: "hold", label: "Hold" },
              { dataKey: "sell", label: "Sell" },
              { dataKey: "strongBuy", label: "Strong Buy" },
              { dataKey: "strongSell", label: "Strong Sell" },
            ]}
            slotProps={{
              legend: {
                itemMarkWidth: 15,
                itemMarkHeight: 15,
              },
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default StockRecommendationsChart;
