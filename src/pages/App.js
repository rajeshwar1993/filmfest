import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "../fire";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { composeWithDevTools } from "redux-devtools-extension";

import { amber, indigo } from "@material-ui/core/colors";

import Main from "./Main";
import rootReducer from "../components/redux";

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: indigo,
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
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return (
    <div className="App" style={{ backgroundColor: "#25211f" }}>
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
