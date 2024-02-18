import { useState, useMemo } from "react";
import { Box, Divider, Grid, Collapse, Chip } from "@mui/material";

import StockHistoryChart from "./StockHistoryChart.jsx";
import StockRecommendationsChart from "./StockRecommendationsChart.jsx";
import Today from "./Today.jsx";
import StockInfoList from "./StockInfoList.jsx";
import StockCalendarList from "./StockCalendarList.jsx";
import StockDetails from "./StockDetails.jsx";

function StockDashboard({ ticker, period }) {
  const [calendar, setCalendar] = useState(false);
  const handleChange = () => {
    setCalendar((calendar) => !calendar);
  };

  const infoComponent = useMemo(() => {
    return calendar ? (
      <StockCalendarList ticker={ticker} />
    ) : (
      <StockInfoList ticker={ticker} />
    );
  }, [calendar, ticker]);

  return (
    <Collapse
      in={ticker !== "" && period !== ""}
      timeout={{ appear: 500, enter: 1000, exit: 500 }}
    >
      <Box
        height="90vh"
        width="100vw"
        display="flex"
        alignItems="center"
        flexDirection="column"
        p={1}
      >
        <Grid
          container
          width={{ xl: "80%", lg: "90%" }}
          height="100%"
          direction="row"
        >
          <Grid
            item
            width="75%"
            sx={{ maxHeight: "100%", overflowY: "scroll" }}
            p={2}
          >
            <Grid container direction="column">
              <Grid item xs>
                <StockHistoryChart ticker={ticker} period={period} />
              </Grid>

              <Divider sx={{ m: 2 }} />

              <Grid item>
                <StockRecommendationsChart ticker={ticker} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item width="25%" p={2}>
            <Grid container direction="column" height="100%">
              <Grid item xs>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  my={2}
                >
                  <Today ticker={ticker} />
                </Box>
              </Grid>

              <Grid item>
                {infoComponent}

                <Box display="flex" justifyContent="center" mt={2}>
                  <Chip
                    // icon={calendar ? <SwitchLeftIcon /> : <SwitchRightIcon />}
                    label="Info / Calender"
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      boxShadow: 10,
                    }}
                    onClick={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Collapse>
  );
}

export default StockDashboard;
