import React from "react";

import {
  Grid,
  Box,
  Typography,
  Hidden,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconButton,
  Button,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

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
    [theme.breakpoints.up("md")]: {
      "&:hover": {
        backgroundColor: "#000000d9",
      },
    },
  },
  title: {
    color: theme.palette.common.textColor,
  },
  partner: {
    textAlign: "center",

    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
  followUs: {
    padding: theme.spacing(2, 3),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    color: theme.palette.common.textColor,
  },
  contactUs: {
    padding: theme.spacing(2, 3, 7),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    color: theme.palette.common.textColor,
  },
  submitSection: {
    backgroundColor: theme.palette.common.sectionBackground,
  },
  faqExpansion: {
    marginTop: theme.spacing(2),
  },
  knowMore: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  dataBoxes: {
    padding: theme.spacing(5, 3),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    "& .MuiBox-root": {
      textAlign: "left",
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
                  className={classes.knowMore}
                >
                  <Button
                    href="/submit"
                    color="primary"
                    variant="outlined"
                    size="large"
                  >
                    Submit Film
                  </Button>
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
                      alt="swiggy"
                    />
                  </div>
                  <div>
                    <img
                      style={{
                        marginTop: "calc(50% - 47px)",
                      }}
                      src="https://futureforward.in/images/logo.png"
                      alt="future forward"
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
                  className={classes.knowMore}
                >
                  <Button href="/submit" color="primary" variant="outlined">
                    Submit Film
                  </Button>
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
                      alt="swiggy"
                    />
                  </div>
                  <div>
                    <img
                      style={{
                        marginTop: "calc(50% - 47px)",
                      }}
                      src="https://futureforward.in/images/logo.png"
                      alt="future forward"
                    />
                  </div>
                </Box>
              </Box>
            </Box>
          </Hidden>
        </Box>
      </Grid>
      <Grid id="follow" item xs={12} className={classes.followUs}>
        <Typography variant="h6" component="h3">
          Follow
        </Typography>
        <Box>
          <IconButton aria-label="Facebook" style={{ color: "white" }}>
            <FacebookIcon fontSize="large" />
          </IconButton>

          <IconButton aria-label="Instagram" style={{ color: "white" }}>
            <InstagramIcon fontSize="large" />
          </IconButton>

          <IconButton aria-label="Twitter" style={{ color: "white" }}>
            <TwitterIcon fontSize="large" />
          </IconButton>

          <IconButton aria-label="YouTube" style={{ color: "white" }}>
            <YouTubeIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.aboutUs}>
        <Box>
          <Typography variant="h4" component="h3">
            About
          </Typography>

          <Typography variant="subtitle1">
            <p>
              IFP’s flagship challenge is back! Assemble your crew and get ready
              to script, shoot, edit and upload a film in just 50 hours.
              Experience the thrill of creating a film in 50 hours, the tightest
              and most exuberant deadline you’ll ever experience
            </p>
            <p>
              Your team Size can be 1 to 20 people. Teams can choose any one
              category to participate – Professional, Amateur or Mobile. The
              theme will be revealed at the beginning of 50 hours on Sep 25,
              8pm, IST
            </p>
            <p>
              Over 1.65 Lac filmmakers from over 30 countries participated in
              our challenge in last 9 years. Be one of them this year and stand
              a chance to have your work showcased to the best directors and
              filmmakers in the industry.
            </p>{" "}
          </Typography>
        </Box>
      </Grid>
      <Grid id={"dates"} item xs={12} className={classes.dataBoxes}>
        <Box>
          <Typography
            variant="h5"
            component="h5"
            style={{ textAlign: "center" }}
          >
            Festival Dates
          </Typography>
          <Typography variant="subtitle1" component="span">
            <ol>
              <li>
                The timeline is as follows:
                <ul>
                  <li>Commencement - 1st July</li>
                  <li>Last Day for film submission - 20th July</li>
                  <li>Film Screening - 5-6th August</li>
                  <li>Prize Distribution - 15th August</li>
                </ul>
              </li>
            </ol>
          </Typography>
        </Box>
      </Grid>
      <Grid id={"rules"} item xs={12} className={classes.dataBoxes}>
        <Box>
          <Typography
            variant="h5"
            component="h5"
            style={{ textAlign: "center" }}
          >
            Rules
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
      <Grid id={"faq"} item xs={12} className={classes.dataBoxes}>
        <Box>
          <Typography
            variant="h5"
            component="h5"
            style={{ textAlign: "center" }}
          >
            FAQ
          </Typography>
          <ExpansionPanel className={classes.faqExpansion}>
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
      <Grid id={"contact"} item xs={12} className={classes.contactUs}>
        <Typography variant="h6" component="h3">
          Contact
        </Typography>
        <Box>
          <Button
            href="mailto:productions.sharp.nerd@gmail.com"
            aria-label="Email contact"
            style={{ color: "white" }}
            startIcon={<EmailIcon />}
            fullWidth
          >
            productions.sharp.nerd@gmail.com
          </Button>

          <Button
            href="tel:+91999999999"
            aria-label="Instagram"
            style={{ color: "white" }}
            startIcon={<PhoneIcon />}
          >
            +91999999999
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
