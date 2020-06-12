import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import SubmitForm from "../components/SubmitForm";

const useStyles = makeStyles((theme) => ({
  root: {},
  imageSection: {
    height: "calc(100vh - 64px)",
    backgroundImage:
      "url(https://fivedayfilm.com/wp-content/uploads/2018/07/Camera-Equipment-For-2018.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  titleBox: {
    height: "100%",
    width: "100%",
    backgroundColor: "#c5a3a352",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.common.white,
  },
  submitSection: {
    backgroundColor: theme.palette.primary.main,
  },
  rules: {
    padding: theme.spacing(4),
    color: theme.palette.common.white,
  },
  rulesWrapper: {
    backgroundColor: theme.palette.secondary.light,
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  submitWrapper: {
    backgroundColor: theme.palette.common.white,
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.imageSection}>
        <Box className={classes.titleBox}>
          <Typography variant="h1" component="h1" className={classes.title}>
            Fish Fry Film Fest
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={12} className={classes.submitSection}>
        <Grid item xs={12} md={6} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography variant="h5" component="h5">
              Rules:
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.submit}>
          <Box className={classes.submitWrapper}>
            <SubmitForm />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
