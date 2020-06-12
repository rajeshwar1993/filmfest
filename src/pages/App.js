import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { pink } from "@material-ui/core/colors";

import Main from "./Main";

const theme = createMuiTheme({
  palette: {
    primary: pink,
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
