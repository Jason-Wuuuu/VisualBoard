import { useNavigate } from "react-router-dom";

import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";

function HomePageButton() {
  const navigate = useNavigate();

  return (
    <Fade in timeout={1000}>
      <Box
        onClick={() => navigate("/")}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          borderRadius: 100,
          boxShadow: 10,
        }}
      >
        <Tooltip title="Home" placement="right">
          <Fab size="medium">
            <ArrowBackIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Fade>
  );
}

export default HomePageButton;
