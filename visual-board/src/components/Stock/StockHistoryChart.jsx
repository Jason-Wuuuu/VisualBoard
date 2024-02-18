import { useState, useEffect, useMemo } from "react";

import { getStockHistory } from "../../stock";

import { LineChart } from "@mui/x-charts/LineChart";
import { ChartsReferenceLine } from "@mui/x-charts";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";

function StockHistoryChart({ ticker, period }) {
  const [title, setTitle] = useState(null);
  const [history, setHistory] = useState(null);
  const [statistics, setStatistics] = useState(null);

  const [lines, setLines] = useState(null);
  const handleChange = (event) => {
    setLines({
      ...lines,
      [event.target.name]: event.target.checked,
    });
  };

  const [height, setHeight] = useState(300);
  const handleChangeHeight = (event) => {
    setHeight(event.target.value);
  };

  const labelFormat_1d = {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  };

  const labelFormat = {
    // year: "2-digit",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      getStockHistory(ticker, period)
        .then((res) => {
          const { data, statistics } = res;

          const processedData = {};
          Object.keys(data).map((key) => {
            processedData[key] = Object.values(data[key]);
          });

          setHistory(processedData);
          setStatistics(statistics);
          setTitle(ticker);

          if (!lines) {
            const lines = {};

            Object.keys(data)
              .slice(1)
              .map((key) => {
                lines[key] = false;
              });

            Object.keys(statistics).map((key) => {
              lines[key] = false;
            });

            lines.Close = true;
            lines.Volume = true;

            setLines(lines);
          }
        })
        .catch((e) => console.log(e));
    };

    if (ticker && period) {
      fetchData();
    }
  }, [ticker, period]);

  const lineSeries = useMemo(() => {
    if (!history || !lines) return [];

    return Object.keys(history)
      .filter((key) => lines[key] && key !== "Volume")
      .map((key) => {
        const props = {
          data: history[key],
          showMark: false,
          label: key,
          curve: "linear",
        };

        return props;
      });
  }, [history, lines]);

  const statisticsSeries = useMemo(() => {
    if (!statistics || !lines) return [];

    return Object.keys(statistics)
      .filter((key) => lines[key])
      .map((key) => (
        <ChartsReferenceLine
          key={key}
          y={statistics[key]}
          label={`${key}(${statistics[key]})`}
          lineStyle={{
            stroke: "snow",
            strokeWidth: 1,
            strokeDasharray: 5,
          }}
          labelAlign="end"
        />
      ));
  }, [statistics, lines]);

  if (history) {
    return (
      <Grid container direction="column" height="100%">
        <Grid item>
          <Typography variant="h3" sx={{ fontWeight: "bolder" }}>
            {title}
          </Typography>
        </Grid>

        <Grid item xs>
          <Grid container direction="row" alignItems="center" height="100%">
            <Grid item>
              <Box
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
              >
                <Slider
                  sx={{ height: 200 }}
                  value={height}
                  onChange={handleChangeHeight}
                  size="small"
                  orientation="vertical"
                  step={5}
                  min={250}
                  max={500}
                  color="info"
                />
              </Box>
            </Grid>

            <Grid item xs>
              <Grid container direction="column">
                <Grid item>
                  <FormGroup row sx={{ justifyContent: "center" }}>
                    {Object.keys(lines).map((key) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              size="small"
                              checked={lines[key]}
                              onChange={handleChange}
                              name={key}
                              color="info"
                            />
                          }
                          label={key}
                          key={key}
                        />
                      );
                    })}
                  </FormGroup>
                </Grid>

                <Grid item xs display="flex" justifyContent="center">
                  <LineChart
                    xAxis={[
                      {
                        data: history["Date"],
                        // scaleType: "point", // "utc"
                        valueFormatter: (ts) =>
                          new Intl.DateTimeFormat(
                            "en-US",
                            period === "1d" ? labelFormat_1d : labelFormat
                          ).format(new Date(parseInt(ts))),
                        tickLabelStyle: {
                          angle: 45,
                          textAnchor: "start",
                        },
                      },
                    ]}
                    axisHighlight={{
                      x: "line",
                      y: "line",
                    }}
                    series={lineSeries}
                    height={parseInt(height)}
                    slotProps={{
                      legend: {
                        itemMarkWidth: 15,
                        itemMarkHeight: 15,
                      },
                    }}
                  >
                    {statisticsSeries}
                  </LineChart>
                </Grid>

                <Collapse in={lines["Volume"]} timeout={500}>
                  <Grid item>
                    <LineChart
                      height={150}
                      disableLineItemHighlight
                      disableAxisListener
                      axisHighlight={{
                        x: "none",
                        y: "none",
                      }}
                      xAxis={[
                        {
                          data: history["Date"],
                          // scaleType: "point", // "utc"
                          valueFormatter: (ts) =>
                            new Intl.DateTimeFormat(
                              "en-US",
                              period === "1d" ? labelFormat_1d : labelFormat
                            ).format(new Date(parseInt(ts))),
                          tickLabelStyle: {
                            angle: 45,
                            textAnchor: "start",
                            // fontSize: 12,
                          },
                        },
                      ]}
                      series={[
                        {
                          data: history["Volume"],
                          showMark: false,
                          label: "Volume(Normalized)",
                          curve: "linear",
                          color: "snow",
                        },
                      ]}
                      slotProps={{
                        legend: {
                          // hidden: true,
                          itemMarkWidth: 15,
                          itemMarkHeight: 15,
                        },
                      }}
                    />
                  </Grid>
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default StockHistoryChart;
