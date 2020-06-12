import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { Container, AppBar, Typography, Toolbar } from "@material-ui/core";

import Home from "./Home";

const Main = () => {
  const theme = createMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6">Fish Fry Film Fest</Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Main;
