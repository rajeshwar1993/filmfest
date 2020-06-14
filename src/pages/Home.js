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

import { Element, Link as ScrollLink } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

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
  rules: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  },
  rulesWrapper: {
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`,
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
    backgroundColor: "#f5f5f5",
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
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
                  <ScrollLink
                    to="follow"
                    spy={true}
                    smooth={true}
                    duration={1000}
                    offset={-70}
                  >
                    Know more
                  </ScrollLink>
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
                  <ScrollLink
                    to="follow"
                    spy={true}
                    smooth={true}
                    duration={1000}
                    offset={-70}
                  >
                    Know more
                  </ScrollLink>
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
          <Element name="submit" className="element">
            <Box className={classes.submitWrapper}>
              <SubmitForm />
            </Box>
          </Element>
        </Grid>
        <Grid item xs={12} md={5} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography
              variant="h5"
              component="h5"
              style={{ textAlign: "center" }}
            >
              How to submit
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
        <Grid id={"rules"} item xs={12} md={6} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
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
        <Grid id={"faq"} item xs={12} md={6} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
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
    </Grid>
  );
};

export default Home;
