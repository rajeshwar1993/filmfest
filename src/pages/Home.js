import React from "react";

import {
  Grid,
  Box,
  Typography,
  Hidden,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  aboutUs: {
    padding: theme.spacing(5, 3),
    textAlign: "center",
    "& .MuiBox-root": {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      [theme.breakpoints.up("md")]: {
        width: "50vw",
        margin: "0 auto",
      },
    },
  },
  submitSection: {
    backgroundColor: theme.palette.primary.main,
  },
  rules: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  rulesWrapper: {
    backgroundColor: theme.palette.secondary.light,
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  submit: {
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
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
          <Hidden smDown>
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
      <Grid item xs={12} className={classes.aboutUs}>
        <Box>
          <Typography variant="h4" component="h3">
            About Us
          </Typography>

          <Typography variant="body2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={12} className={classes.submitSection}>
        <Grid item xs={12} md={7} className={classes.submit}>
          <Box className={classes.submitWrapper}>
            <SubmitForm />
          </Box>
        </Grid>
        <Grid item xs={12} md={5} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography variant="h5" component="h5">
              How to submit:
            </Typography>
            <Typography variant="subtitle1" component="span">
              <ol>
                <li>
                  Upload your film in one of the following:
                  <ul>
                    <li>Youtube Private Link (Recommended)</li>
                    <li>Google Drive</li>
                  </ul>
                </li>
              </ol>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography variant="h5" component="h5">
              Rules:
            </Typography>
            <Typography variant="subtitle1" component="span">
              <ol>
                <li>
                  Upload your film in one of the following:
                  <ul>
                    <li>Youtube Private Link (Recommended)</li>
                    <li>Google Drive</li>
                  </ul>
                </li>
              </ol>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography variant="h5" component="h5">
              FAQ
            </Typography>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"q1"}
                id={"q1"}
              >
                <Typography variant="subtitle1" component="span">
                  Q: Are we going to succeed ?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2" component="span">
                  A: Hell Yeah!!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"q2"}
                id={"q2"}
              >
                <Typography variant="subtitle1" component="span">
                  Q: Do we have any doubts about that?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2" component="span">
                  A: Hell Yeah!!
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
