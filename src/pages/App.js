import React from "react";
import "../fire";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { amber, grey } from "@material-ui/core/colors";

import Main from "./Main";

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: grey,
    common: {
      sectionBackground: "#25211f",
      textColor: "#fff"
    }
  }
});

const data = {
  fest_name: "Tales in 10"
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main data={data} />
      </ThemeProvider>
    </div>
  );
}

export default App;
