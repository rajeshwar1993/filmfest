import React from "react";
import "../fire";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { amber, indigo } from "@material-ui/core/colors";

import Main from "./Main";

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: indigo,
    common: {
      sectionBackground: "#25211f",
      textColor: "#fff",
    },
  },
});

const data = {
  fest_name: "Tales in 10",
};

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#25211f" }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Main data={data} />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
