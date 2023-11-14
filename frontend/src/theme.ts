import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#ED6812",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
    info: {
      main: "#ffffff",
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