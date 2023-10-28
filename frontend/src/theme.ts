import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    error: {
      main: "#eb2563",
    }
  },
  typography: {
    fontFamily: "Poppins, Roboto",
  }
});

export default theme