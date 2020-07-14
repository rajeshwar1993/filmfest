import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "../fire";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
//import { composeWithDevTools } from "redux-devtools-extension";

import { amber, indigo, red } from "@material-ui/core/colors";

import Main from "./Main";
import rootReducer from "../components/redux";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: amber,
    secondary: indigo,
    danger: {
      light: red[200],
      main: red[600],
      dark: red[900],
      contrastText: "#fff"
    },
    common: {
      sectionBackground: "#091213",
      textColor: "#fff"
    }
  }
});

const data = {
  fest_name: "Tales in 10"
};

function App() {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <div className="App" style={{ backgroundColor: "#091213" }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Main data={data} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
