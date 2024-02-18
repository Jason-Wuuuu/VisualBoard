import { useState, useEffect } from "react";

import { getStockCalendar } from "../../stock";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import { Fade } from "@mui/material";

import DateRangeIcon from "@mui/icons-material/DateRange";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const EARNINGS = ["Earnings High", "Earnings Low", "Earnings Average"];

function StockCalendarList({ ticker }) {
  const [calendar, setCalendar] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      getStockCalendar(ticker)
        .then((data) => {
          setCalendar(data);
        })
        .catch((e) => console.log(e));
    };

    if (ticker) fetchData();
  }, [ticker]);

  if (calendar) {
    return (
      <Fade in timeout={500}>
        <List
          sx={{
            p: 2,
            boxShadow: 10,
            borderRadius: 5,
          }}
        >
          <ListItem key={"Earnings Date"}>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>

            <ListItemText
              primary={"Earnings Date"}
              secondary={calendar["Earnings Date"]
                .map((date) => {
                  const ymd = date.split("-");
                  return `${ymd[1]}/${ymd[2]}`;
                })
                .join(" ")}
              primaryTypographyProps={{
                fontWeight: "bold",
              }}
            />
          </ListItem>

          <ListSubheader
            color="inherit"
            sx={{ opacity: 0.5, borderRadius: 5, boxShadow: 10, mx: 1 }}
          >
            Earnings
          </ListSubheader>

          {EARNINGS.map((key) => {
            if (calendar[key]) {
              return (
                <ListItem key={key}>
                  <ListItemIcon>
                    {calendar[key] > 1 ? (
                      <KeyboardArrowUpIcon
                        sx={{ color: "aqua", boxShadow: 10, borderRadius: 100 }}
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

                  <ListItemText primary={key} secondary={calendar[key]} />
                </ListItem>
              );
            }
          })}
        </List>
      </Fade>
    );
  }
}

export default StockCalendarList;
