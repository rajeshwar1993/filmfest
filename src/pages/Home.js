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
    backgroundColor: "#191919de",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
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
      backgroundColor: "#000000d9",
    },
  },
  title: {
    color: theme.palette.common.textColor,
  },
  partner: {
    textAlign: "center",

    marginTop: theme.spacing(8),
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      "& img": {
        maxWidth: "150px",
      },
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(12),
      "& .MuiBox-root": {
        display: "flex",
        justifyContent: "center",
        "& img": {
          maxWidth: "300px",
        },
      },
    },
  },
  aboutUs: {
    padding: theme.spacing(5, 3),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    "& .MuiBox-root": {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.common.textColor,
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
    backgroundColor: theme.palette.common.sectionBackground,
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

const Home = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.imageSection}>
        <Box className={classes.titleBox}>
          <Hidden smDown>
            <Box>
              <Box className={classes.titleWrapper}>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  Sharp_Nerd Presents
                </Typography>
                <Typography
                  variant="h1"
                  component="h1"
                  className={classes.title}
                >
                  {data.fest_name}
                </Typography>
                <Typography
                  variant="h4"
                  component="h3"
                  className={classes.title}
                >
                  Short Film Festival
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.title}
                >
                  <Link href="#">Know more</Link>
                </Typography>
              </Box>
              <Box className={classes.partner}>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  Powered by
                </Typography>
                <Box>
                  <div>
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2019/03/Swiggy-PNG-Logo.png"
                      atl="swiggy"
                    />
                  </div>
                  <div>
                    <img
                      style={{
                        marginTop: "calc(50% - 47px)",
                      }}
                      src="https://futureforward.in/images/logo.png"
                      atl="future forward"
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box>
              <Box className={classes.titleWrapper}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
                  Sharp_Nerd Presents
                </Typography>
                <Typography
                  variant="h2"
                  component="h1"
                  className={classes.title}
                >
                  {data.fest_name}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  className={classes.title}
                >
                  Short Film Festival
                </Typography>
                <Typography
                  variant="body2"
                  component="h6"
                  className={classes.title}
                >
                  <Link href="#">Know more</Link>
                </Typography>
              </Box>
              <Box className={classes.partner}>
                <Typography
                  variant="h6"
                  component="h3"
                  className={classes.title}
                >
                  Powered by
                </Typography>
                <Box>
                  <div>
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2019/03/Swiggy-PNG-Logo.png"
                      atl="swiggy"
                    />
                  </div>
                  <div>
                    <img
                      style={{
                        marginTop: "calc(50% - 47px)",
                      }}
                      src="https://futureforward.in/images/logo.png"
                      atl="future forward"
                    />
                  </div>
                </Box>
              </Box>
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
