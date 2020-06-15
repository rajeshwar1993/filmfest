import React from "react";
import firebase from "firebase";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography } from "@material-ui/core";

import Login from "../components/Login";
//import EntryList from "./EntryList";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    textAlign: "center",
    color: "white",
  },
}));

const Administrator = ({ ...props }) => {
  const classes = useStyles();

  const loginUser = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth={"xl"} className={classes.root}>
      <Typography variant="h4">Welcome, Administrator</Typography>
      <Grid container justify="center" className={classes.root}>
        <Login loginUser={loginUser} />
      </Grid>
    </Container>
  );
};

export default Administrator;
