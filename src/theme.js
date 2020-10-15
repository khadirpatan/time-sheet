import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#689f38" },
    secondary: { main: "#272d3a" },
    error: { main: "#d50000" },
    textPrimary: { main: "grey" }
  },
  typography: {
    fontFamily: "Lexend Deca"
  }
});

export default theme;
