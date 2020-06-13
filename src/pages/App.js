import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { cyan } from "@material-ui/core/colors";

import Main from "./Main";

const theme = createMuiTheme({
  palette: {
    primary: cyan,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
