import React from "react";
import { Grid, Box, Typography, Hidden, Link } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import SubmitForm from "../components/SubmitForm";

const useStyles = makeStyles((theme) => ({
  root: {},
  imageSection: {
    height: "100vh",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.common.white,
  },
  titleWrapper: {
    textAlign: "center",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: "#19181859",
    transition: "1s",
    "&:hover": {
      backgroundColor: "#1f0c0cd9",
    },
  },
  title: {
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
          <Hidden mdDown>
            <Box className={classes.titleWrapper}>
              <Typography variant="h1" component="h1" className={classes.title}>
                Fine Narratives
              </Typography>
              <Typography variant="h3" component="h3" className={classes.title}>
                Film Festival
              </Typography>
              <Typography variant="h5" component="h3" className={classes.title}>
                <Link href="#">Know more</Link>
              </Typography>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.titleWrapper}>
              <Typography variant="h3" component="h1" className={classes.title}>
                Fine Narratives
              </Typography>
              <Typography variant="h4" component="h3" className={classes.title}>
                Film Festival
              </Typography>
              <Typography variant="h6" component="h3" className={classes.title}>
                <Link href="#">Know more</Link>
              </Typography>
            </Box>
          </Hidden>
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
