import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#512da8",
    },
    secondary: {
      main: "#6e4dd1",
    },
  },
  typography: {
    fontSize: 14,
  },
});
export default theme;
