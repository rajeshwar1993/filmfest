import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography, Button } from "@material-ui/core";

import Login from "../components/Login";

import AdminScreen from "../components/AdminScreen";

import { logout, set_err, clear_err } from "../components/actions";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    textAlign: "center",
    color: "white",
    minHeight: "100vh"
  }
}));

const Administrator = ({ ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.app);

  const loginUser = data => {
    console.log(data);

    let persistance = firebase.auth.Auth.Persistence.LOCAL;
    dispatch(clear_err());
    //create firebase account
    firebase
      .auth()
      .setPersistence(persistance)
      .then(function() {
        return firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.pass);
      })
      .catch(function(error) {
        // Handle Errors here.
        dispatch(set_err(error));
        console.log("Error in email signin: ", error);
      });
  };

  return (
    <Container maxWidth={"xl"} className={classes.root}>
      {!isLoggedIn && (
        <Grid container justify="center" className={classes.root} spacing={4}>
          <Login loginUser={loginUser} />
        </Grid>
      )}
      {isLoggedIn && (
        <>
          <Grid container justify="center" className={classes.root} spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4">Welcome, Administrator</Typography>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(function() {
                      // Sign-out successful.
                      dispatch(logout());
                    })
                    .catch(function(error) {
                      // An error happened.
                      console.log("Error in logging out", error);
                    });
                }}
              >
                Logout
              </Button>
            </Grid>
            <Grid item xs={12}>
              <AdminScreen />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Administrator;
