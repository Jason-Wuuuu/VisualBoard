import { useNavigate } from "react-router-dom";

import { Box, Chip, Typography } from "@mui/material";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import UploadIcon from "@mui/icons-material/Upload";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      height="95vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Chip
        icon={<ShowChartIcon />}
        variant="outlined"
        label="Stock"
        onClick={() => navigate("/stock")}
        sx={{ fontWeight: "bold", boxShadow: 10, mx: 1 }}
      />

      <Chip
        icon={<UploadIcon />}
        variant="outlined"
        label="Upload CSV file"
        // onClick={() => navigate("/")}
        clickable
        sx={{ fontWeight: "bold", boxShadow: 10, mx: 1 }}
      />
    </Box>
  );
}

export default Home;
