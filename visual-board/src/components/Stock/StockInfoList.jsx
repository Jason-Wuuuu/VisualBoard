import { useState, useEffect } from "react";

import { getStockInfo } from "../../stock";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import Fade from "@mui/material/Fade";

import BackHandIcon from "@mui/icons-material/BackHand";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const KEYS = [
  "address1",
  "city",
  "state",
  "zip",
  "country",
  "phone",
  "website",
  "industry",
  "industryKey",
  "industryDisp",
  "sector",
  "sectorKey",
  "sectorDisp",
  "longBusinessSummary",
  "fullTimeEmployees",
  "companyOfficers",
  "auditRisk",
  "boardRisk",
  "compensationRisk",
  "shareHolderRightsRisk",
  "overallRisk",
  "governanceEpochDate",
  "compensationAsOfEpochDate",
  "maxAge",
  "priceHint",
  "previousClose",
  "open",
  "dayLow",
  "dayHigh",
  "regularMarketPreviousClose",
  "regularMarketOpen",
  "regularMarketDayLow",
  "regularMarketDayHigh",
  "beta",
  "trailingPE",
  "forwardPE",
  "volume",
  "regularMarketVolume",
  "averageVolume",
  "averageVolume10days",
  "averageDailyVolume10Day",
  "bid",
  "ask",
  "bidSize",
  "askSize",
  "marketCap",
  "fiftyTwoWeekLow",
  "fiftyTwoWeekHigh",
  "priceToSalesTrailing12Months",
  "fiftyDayAverage",
  "twoHundredDayAverage",
  "currency",
  "enterpriseValue",
  "profitMargins",
  "floatShares",
  "sharesOutstanding",
  "sharesShort",
  "sharesShortPriorMonth",
  "sharesShortPreviousMonthDate",
  "dateShortInterest",
  "sharesPercentSharesOut",
  "heldPercentInsiders",
  "heldPercentInstitutions",
  "shortRatio",
  "shortPercentOfFloat",
  "impliedSharesOutstanding",
  "bookValue",
  "priceToBook",
  "lastFiscalYearEnd",
  "nextFiscalYearEnd",
  "mostRecentQuarter",
  "earningsQuarterlyGrowth",
  "netIncomeToCommon",
  "trailingEps",
  "forwardEps",
  "pegRatio",
  "lastSplitFactor",
  "lastSplitDate",
  "enterpriseToRevenue",
  "enterpriseToEbitda",
  "52WeekChange",
  "SandP52WeekChange",
  "exchange",
  "quoteType",
  "symbol",
  "underlyingSymbol",
  "shortName",
  "longName",
  "firstTradeDateEpochUtc",
  "timeZoneFullName",
  "timeZoneShortName",
  "uuid",
  "messageBoardId",
  "gmtOffSetMilliseconds",
  "currentPrice",
  "targetHighPrice",
  "targetLowPrice",
  "targetMeanPrice",
  "targetMedianPrice",
  "recommendationMean",
  "recommendationKey",
  "numberOfAnalystOpinions",
  "totalCash",
  "totalCashPerShare",
  "ebitda",
  "totalDebt",
  "quickRatio",
  "currentRatio",
  "totalRevenue",
  "debtToEquity",
  "revenuePerShare",
  "returnOnAssets",
  "returnOnEquity",
  "freeCashflow",
  "operatingCashflow",
  "earningsGrowth",
  "revenueGrowth",
  "grossMargins",
  "ebitdaMargins",
  "operatingMargins",
  "financialCurrency",
  "trailingPegRatio",
];

const FIFTY_TWO_WEEK = {
  SandP52WeekChange: "S&P 52W Change",
  "52WeekChange": "52W Change",
  fiftyTwoWeekHigh: "52W High",
  fiftyTwoWeekLow: "52W Low",
};

const TARGET_PRICES = {
  targetHighPrice: "Target High",
  targetLowPrice: "Target Low",
  targetMeanPrice: "Target Mean",
  targetMedianPrice: "Target Median",
};

function StockInfoList({ ticker }) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
    return (
      <Fade in timeout={500}>
        <List
          sx={{
            p: 2,
            boxShadow: 10,
            borderRadius: 5,
          }}
        >
          <ListItem key={"recommendationKey"}>
            <ListItemIcon>
              {["buy", "strong_buy"].includes(info["recommendationKey"]) ? (
                <ThumbUpAltIcon />
              ) : ["sell", "strong_sell"].includes(
                  info["recommendationKey"]
                ) ? (
                <ThumbDownAltIcon />
              ) : (
                <BackHandIcon />
              )}
            </ListItemIcon>

            <ListItemText
              primary={info["recommendationKey"]
                .split("_")
                .join(" ")
                .toUpperCase()}
              secondary="Recommendation"
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />

            <Switch
              edge="end"
              checked={checked}
              onChange={handleChange}
              color="default"
            />
          </ListItem>

          {/* <ListItem key={"pegRatio"}>
          <ListItemText primary="PEG Ratio" secondary={info["pegRatio"]} />
        </ListItem> */}

          {checked ? (
            <>
              <ListSubheader
                color="inherit"
                sx={{ opacity: 0.5, borderRadius: 5, boxShadow: 10, mx: 1 }}
              >
                52 Week
              </ListSubheader>

              {Object.keys(FIFTY_TWO_WEEK).map((key) => {
                const dif = info["currentPrice"] - info[key];
                const dif_p = (dif / info[key]) * 100;

                if (info[key]) {
                  return (
                    <ListItem key={key}>
                      <ListItemIcon>
                        {dif > 0 ? (
                          <KeyboardArrowUpIcon
                            sx={{
                              color: "aqua",
                              boxShadow: 10,
                              borderRadius: 100,
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            sx={{
                              color: "salmon",
                              boxShadow: 10,
                              borderRadius: 100,
                            }}
                          />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={FIFTY_TWO_WEEK[key]}
                        secondary={`${info[key].toFixed(2)}`}
                      />
                    </ListItem>
                  );
                }
              })}
            </>
          ) : (
            <>
              <ListSubheader
                color="inherit"
                sx={{ opacity: 0.5, borderRadius: 5, boxShadow: 10, mx: 1 }}
              >
                Target
              </ListSubheader>

              {Object.keys(TARGET_PRICES).map((key) => {
                const dif = info["currentPrice"] - info[key];
                const dif_p = (dif / info[key]) * 100;

                if (info[key]) {
                  return (
                    <ListItem key={key}>
                      <ListItemIcon>
                        {dif > 0 ? (
                          <KeyboardArrowUpIcon
                            sx={{
                              color: "aqua",
                              boxShadow: 10,
                              borderRadius: 100,
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            sx={{
                              color: "salmon",
                              boxShadow: 10,
                              borderRadius: 100,
                            }}
                          />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={TARGET_PRICES[key]}
                        secondary={`${info[key].toFixed(2)}`} // (${dif_p.toFixed(2)}%)
                      />
                    </ListItem>
                  );
                }
              })}
            </>
          )}
        </List>
      </Fade>
    );
  }
}

export default StockInfoList;
