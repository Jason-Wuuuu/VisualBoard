import { Fragment, useState, useEffect } from "react";

import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function StockDetails({ ticker }) {
  const [open, setOpen] = useState(false);
  if (ticker) {
    return (
      <Fragment>
        <Fade in timeout={1000}>
          <Box
            onClick={() => setOpen((open) => !open)}
            role="presentation"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              borderRadius: 100,
              boxShadow: 10,
            }}
          >
            <Fab size="medium">
              <ArrowBackIcon />
            </Fab>
          </Box>
        </Fade>

        {/* <Drawer anchor="right" open={open} onClose={setOpen(false)}></Drawer> */}
      </Fragment>
    );
  }
}

export default StockDetails;
