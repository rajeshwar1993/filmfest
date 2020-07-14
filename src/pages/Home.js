import React, { useState } from "react";
import { store } from "../fire";

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
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

import logo1 from "../images/V_RL.png";
import logo2 from "../images/H_R.png";
import logo3 from "../images/O10.png";

import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles(theme => ({
  root: {},
  imageSection: {
    height: "100vh",
    backgroundImage:
      "url(https://images.pexels.com/photos/3379942/pexels-photo-3379942.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
    backgroundSize: "330%",
    backgroundPosition: "43% 94%",
    [theme.breakpoints.up("md")]: {
      backgroundPosition: "-50%",
      backgroundSize: "120%",
      backgroundRepeat: "no-repeat"
    }
  },
  titleBox: {
    height: "100%",
    width: "100%",
    backgroundImage: `linear-gradient(transparent 20%, #091213fc 100%)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start"
    }
  },
  mainWrapper: {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: {
      marginLeft: "15%",
      justifyContent: "space-evenly"
    }
  },
  titleWrapper: {
    textAlign: "center",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      marginBottom: "0"
    },
    "& h1": {
      margin: "5px 0"
    }
  },
  title: {
    color: theme.palette.common.textColor
  },
  partner: {
    display: "none",
    textAlign: "center",
    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "center",
      "& img": {
        maxWidth: "100px"
      }
    },
    [theme.breakpoints.up("md")]: {
      "& .MuiBox-root": {
        display: "flex",
        justifyContent: "center",
        "& img": {
          maxWidth: "300px"
        }
      }
    }
  },
  aboutUs: {
    padding: theme.spacing(5, 3),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    "& .MuiBox-root": {
      padding: theme.spacing(2),
      // borderRadius: theme.spacing(1),
      // border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.common.textColor,
      [theme.breakpoints.up("md")]: {
        width: "60vw",
        margin: "0 auto"
      }
    }
  },
  followUs: {
    padding: theme.spacing(2, 3),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    color: theme.palette.common.textColor
  },
  contactUs: {
    padding: theme.spacing(2, 3, 7),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    color: theme.palette.common.textColor
  },
  submitSection: {
    backgroundColor: theme.palette.common.sectionBackground
  },
  faqExpansion: {
    marginTop: theme.spacing(2)
  },
  knowMore: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    }
  },
  dateBox: {
    padding: theme.spacing(5, 3, 2),
    textAlign: "center",
    backgroundColor: theme.palette.common.sectionBackground,
    "& .MuiBox-root": {
      textAlign: "left",
      color: theme.palette.common.textColor,
      [theme.breakpoints.up("md")]: {
        width: "90vw",
        margin: "0 auto"
      }
    }
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
        width: "60vw",
        margin: "0 auto"
      }
    }
  },
  dateGrid: {
    margin: theme.spacing(4, 0, 2)
  },
  oneDateBox: {
    textAlign: "center",
    paddingBottom: theme.spacing(3),
    flexDirection: "row",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row-reverse"
    }
  },
  dialogBox: {
    textAlign: "center",
    "& img": {
      width: "250px",
      height: "250px"
    }
  }
}));

const Home = ({ data }) => {
  const classes = useStyles();

  const [dialogControl, updateDialogControl] = useState({
    open: false,
    title: "",
    text: "",
    img: "",
    closeButtonText: "close"
  });

  const handleClose = () => {
    updateDialogControl({
      ...dialogControl,
      open: false
    });
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.imageSection}>
          <Box className={classes.titleBox}>
            <Hidden smDown>
              <Box className={classes.mainWrapper}>
                <Box className={classes.titleWrapper}>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    SHARP_NER<i>d</i> Presents
                  </Typography>
                  <h1>
                    <img
                      src={logo1}
                      alt={data.fest_name}
                      style={{
                        height: "430px",
                        margin: "10px 0"
                      }}
                    />
                  </h1>
                  {/* <Typography
                  variant="h1"
                  component="h1"
                  className={classes.title}
                >
                  {data.fest_name}
                </Typography> */}
                  {/* <Typography
                  variant="h4"
                  component="h3"
                  className={classes.title}
                >
                  Short Film Festival
                </Typography> */}
                  <Typography
                    variant="h6"
                    component="h6"
                    className={classes.knowMore}
                  >
                    <Button
                      href="/#about"
                      color="primary"
                      variant="outlined"
                      size="large"
                    >
                      Know more
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
                        src="https://www.runvictoriamarathon.com/wp-content/uploads/2017/02/sponsor-logo-placeholder.png"
                        alt="swiggy"
                      />
                    </div>
                    <div>
                      <img
                        style={
                          {
                            //marginTop: "calc(50% - 47px)"
                          }
                        }
                        src="https://www.runvictoriamarathon.com/wp-content/uploads/2017/02/sponsor-logo-placeholder.png"
                        alt="future forward"
                      />
                    </div>
                  </Box>
                </Box>
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Box className={classes.mainWrapper}>
                <Box className={classes.titleWrapper}>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={classes.title}
                  >
                    SHARP_NER<i>d</i> Presents
                  </Typography>
                  <h1>
                    <img
                      src={logo2}
                      alt={data.fest_name}
                      style={{ height: "50px", margin: " 0" }}
                    />
                  </h1>
                  {/* <Typography
                  variant="h2"
                  component="h1"
                  className={classes.title}
                >
                  {data.fest_name}
                </Typography> */}
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
                    <Button href="/#about" color="primary" variant="outlined">
                      Know More
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
                        src="https://www.runvictoriamarathon.com/wp-content/uploads/2017/02/sponsor-logo-placeholder.png"
                        alt="swiggy"
                      />
                    </div>
                    <div>
                      <img
                        style={
                          {
                            //marginTop: "calc(50% - 47px)"
                          }
                        }
                        src="https://www.runvictoriamarathon.com/wp-content/uploads/2017/02/sponsor-logo-placeholder.png"
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
            <IconButton
              href="https://www.facebook.com/SHARP_NERd"
              target="_blank"
              aria-label="Facebook"
              style={{ color: "white" }}
            >
              <FacebookIcon fontSize="large" />
            </IconButton>

            <IconButton
              href="https://www.instagram.com/tales_in_10/"
              target="_blank"
              aria-label="Instagram"
              style={{ color: "white" }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>

            <IconButton
              href="https://twitter.com/sharp_nerd"
              target="_blank"
              aria-label="Twitter"
              style={{ color: "white" }}
            >
              <TwitterIcon fontSize="large" />
            </IconButton>

            <IconButton
              href="https://www.youtube.com/channel/UCn-8C6fhin7MiHqq4ClZPhQ"
              target="_blank"
              aria-label="YouTube"
              style={{ color: "white" }}
            >
              <YouTubeIcon fontSize="large" />
            </IconButton>
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
          </Box>
        </Grid>
        <Grid id={"dates"} item xs={12} className={classes.dateBox}>
          <Box>
            <Typography
              variant="h3"
              component="h4"
              style={{ textAlign: "center", color: "#b30c35" }}
            >
              Festival Dates
            </Typography>
            <Grid container className={classes.dateGrid}>
              <Grid
                container
                item
                xs={12}
                md={3}
                className={classes.oneDateBox}
              >
                <Grid xs={12}>
                  <Typography variant="h4" component="h2" color="primary">
                    15 July 2020
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h5" component="h3" color="primary">
                    10:00am (IST)
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h6" component="h3">
                    Submissions begin
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={3}
                className={classes.oneDateBox}
              >
                <Grid xs={12}>
                  <Typography variant="h4" component="h2" color="primary">
                    02 August 2020
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h5" component="h3" color="primary">
                    11:59pm (IST)
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h6" component="h3">
                    Submissions close
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={3}
                className={classes.oneDateBox}
              >
                <Grid xs={12}>
                  <Typography variant="h4" component="h2" color="primary">
                    14-15-16 August, 2020
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h5" component="h3" color="primary">
                    Time TBA
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h6" component="h3">
                    Film Screening
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={3}
                className={classes.oneDateBox}
              >
                <Grid xs={12}>
                  <Typography variant="h4" component="h2" color="primary">
                    30 August, 2020
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h5" component="h3" color="primary">
                    Time TBA
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="h6" component="h3">
                    Festival Results, Valediction
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid id={"about"} item xs={12} className={classes.aboutUs}>
          <Box>
            <Typography variant="h4" component="h3">
              Tales in <img src={logo3} alt={"10"} style={{ height: "34px" }} />
            </Typography>

            <Typography variant="subtitle1">
              <p>
                The world we live in is a scary one right now. With theatres and
                auditoriums closed, film screenings being cancelled left and
                right, and most films and TV shows shutting down production, the
                future of media and theatre is currently looking quite
                handicapped. Despite the nation entering the UNLOCK 1.0 phase,
                pandemic cases are on a steep rise ever-more and we need to
                maintain the basic civic sense of social distancing and
                self-precautions.
              </p>
              <p>
                But all is not dark. Are you indoors? Feeling bored, restless
                and about to go out of your mind? Here is a chance to put your
                skills to the test.
              </p>
              <p>
                With international theatre events and movie premieres also
                indefinitely postponed, Sharp_Nerd brings about a short film
                festival for all you aspirants who wish to make a movie of their
                own.
              </p>{" "}
            </Typography>
          </Box>
        </Grid>

        <Grid id={"rules"} item xs={12} className={classes.dataBoxes}>
          <Rules
            dialogControl={dialogControl}
            updateDialogControl={updateDialogControl}
          />
        </Grid>
        <Grid id={"faq"} item xs={12} className={classes.dataBoxes}>
          <FAQ classes={classes} />
        </Grid>
      </Grid>
      <Dialog
        open={dialogControl.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{dialogControl.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogControl.text}
          </DialogContentText>
          <img src={dialogControl.img} alt={dialogControl.title} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {dialogControl.closeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;

const Rules = ({ dialogControl, updateDialogControl }) => {
  return (
    <Box>
      <Typography variant="h5" component="h5" style={{ textAlign: "center" }}>
        Rules:
      </Typography>
      <Typography variant="subtitle1" component="span">
        <ol>
          <li>
            Submit a short film within a duration no longer than{" "}
            <strong>10 minutes</strong> including opening and end credits.
          </li>
          <li>
            The opening slide provided will <strong>NOT</strong> be counted in
            the total duration of the film.
            <ul>
              <li>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    store
                      .ref()
                      .child("siteImages/opening_slate.mp4")
                      .getDownloadURL()
                      .then(function(url) {
                        // `url` is the download URL for 'images/stars.jpg'
                        // This can be downloaded directly:
                        // This can be downloaded directly:
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = "blob";
                        xhr.onload = function(event) {
                          var blob = xhr.response;
                          const url = URL.createObjectURL(blob);

                          // Create a new anchor element
                          const a = document.createElement("a");

                          // Set the href and download attributes for the anchor element
                          // You can optionally set other attributes like `title`, etc
                          // Especially, if the anchor element will be attached to the DOM
                          a.href = url;
                          a.download = "Opening_Slate_Tales_In_10";
                          // Click handler that releases the object URL after the element has been clicked
                          // This is required for one-off downloads of the blob content
                          const clickHandler = () => {
                            setTimeout(() => {
                              URL.revokeObjectURL(url);
                              this.removeEventListener("click", clickHandler);
                            }, 150);
                          };

                          // Add the click event listener on the anchor element
                          // Comment out this line if you don't want a one-off download of the blob content
                          a.addEventListener("click", clickHandler, false);

                          // Programmatically trigger a click on the anchor element
                          // Useful if you want the download to happen automatically
                          // Without attaching the anchor element to the DOM
                          // Comment out this line if you don't want an automatic download of the blob content
                          a.click();
                          return a;
                        };
                        xhr.open("GET", url);
                        xhr.send();
                      })
                      .catch(function(error) {
                        // Handle any errors
                      });
                  }}
                >
                  Click here to download opening slate
                </Button>
                <div>
                  <Typography variant="caption" component="span">
                    Designed by Ishaan Moitra. ©Tales in 10 Short Film Festival.
                  </Typography>
                </div>
              </li>
            </ul>
          </li>
          <li>
            You may use any device to record, Mobile phone, DSLR, Action camera
            (Go Pro or Equivalent), Drone* , or even films.
          </li>
          <li>
            You may submit films previously made by you/your team which follow
            the given guidelines. The opening slide needs to be included in
            these submissions as well.
          </li>
          <li>
            You may use upload the film in one of the following ways:
            <ul>
              <li>
                Youtube Link (Unlisted) - <strong>Recommended</strong>
              </li>
              <li>Google Drive Link (Your private google drive)</li>
            </ul>
          </li>
          <li>Use original or royalty free music.</li>
          <li>
            Make Payment of <strong>Rs. 199 </strong> in one of the following
            ways and take a screenshot of the success payment screen (this needs
            to be uploaded with submission):
            <ul>
              {" "}
              <li>
                All Payments will go to Mr. Joydeep Pal, our Financial
                Coordinator.
              </li>
              <li>
                Google Pay - No: 9013506567{" "}
                <Button
                  variant={"outlined"}
                  color="primary"
                  onClick={() => {
                    updateDialogControl({
                      ...dialogControl,
                      open: true,
                      title: "Google Pay QR Code",
                      text: "Scan this on Google Pay App to pay.",
                      img:
                        "https://firebasestorage.googleapis.com/v0/b/filmfest-8db31.appspot.com/o/siteImages%2Fgpay.png?alt=media&token=d9118d41-d184-4a79-909d-99f332f73179"
                    });
                  }}
                  size="small"
                >
                  Google Pay QR Code
                </Button>{" "}
                <strong>(Recommended)</strong>
              </li>
              <li>
                Paytm - No: 9013506567{" "}
                <Button
                  variant={"outlined"}
                  color="primary"
                  onClick={() => {
                    updateDialogControl({
                      ...dialogControl,
                      open: true,
                      title: "PayTm QR Code",
                      text: "Scan this on PayTm App to pay.",
                      img:
                        "https://firebasestorage.googleapis.com/v0/b/filmfest-8db31.appspot.com/o/siteImages%2Fpaytm.png?alt=media&token=8d4ffc20-626c-4ded-b708-3bce0cf9d431"
                    });
                  }}
                  size="small"
                >
                  PayTm QR Code
                </Button>
              </li>
            </ul>
          </li>
          <li>
            Fill in the{" "}
            <Link
              href="/submit"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              Submission Form
            </Link>{" "}
            with appropriate details and upload the payment screenshot. Please
            read{" "}
            <Link
              href="/submit#howto"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              How to Submit
            </Link>{" "}
            section before submission.
          </li>
          <li>
            Films shall be shot while following government norms of Social
            distancing.
          </li>
          <li>
            The films can be in <strong>ANY</strong> language. All films,
            irrespective of language should contain subtitles in english.
            Subtitles can be added in one of the following way:
            <ul>
              <li>
                In film - <strong>Recommended</strong>
              </li>
              <li>Separate SRT file - uploaded with Google drive link</li>
            </ul>
          </li>
          <li>
            Maintain a profanity filter in terms of language and explicit
            content.
          </li>
          <li>
            The window for submitting your entries opens at 10:00am (IST) on 15
            July, 2020 and closes at 11:59pm (IST) on 02 August, 2020.
          </li>
          <li>
            We are all dealing with tough times and working from home. Please be
            considerate about the size of your submission with respect to the
            internet bandwidth. You may have to send just one, but we need to
            download them all.
          </li>
          <li>
            Please refrain from making any caustic political, communal or
            religious statements in the film that may offend sensitivity.
          </li>
          <li>
            Please check{" "}
            <Link
              href="#faq"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              FAQ
            </Link>{" "}
            for any other queries, or feel free to{" "}
            <Link
              href="#contact"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              Contact us
            </Link>
            .
          </li>
        </ol>
      </Typography>
    </Box>
  );
};

const FAQ = ({ classes }) => {
  const data = [
    {
      q: "I am not from India. Can I participate?",
      a:
        "Indeed. We are surviving a global pandemic and we encourage global participation. Having said that we accept payment only through Google Pay and Paytm. If you can arrange payment through these services and upload a successful screenshot, then nothing else is stopping you."
    },
    {
      q: "Is there a registration fee?",
      a:
        "The registration fees for each team is Rs. 199 for each team participating."
    },
    {
      q: "Are Special Effects allowed?",
      a:
        "Yes, you can include special effects. However, no stock footage may be used for this. "
    },
    {
      q: "What will be the duration of the films?",
      a:
        "The films are to be made no longer than 10 minutes. This is because, for a good film produced in this challenge, 4 to 6 minutes is an ideal duration."
    },
    {
      q: "Does the maximum length of the film include end credits?",
      a:
        "Yes, the end credits and opening slide are included in the duration of your film. "
    },
    {
      q: "Can I modify the film after the deadline?",
      a:
        "Of course, you can modify the film post the deadline. It is your film!"
    },
    {
      q: "How do I upload my film faster?",
      a:
        "We would recommend you to render the film at 720p for faster upload results. Also, keeping the file size below 1 GB would make it faster. Third party compression tools like handbrake and such can help compress your videos but use them at your own discretion."
    },
    {
      q: "Can I send in multiple entries?",
      a: "Yes, you just need to pay the entry fee for each."
    },
    {
      q: "What are the films about?",
      a:
        "We are dealing with a lockdown and dealing with a global pandemic. The films can be about the current situation, or even act as a distraction from the same. Each team selects its Genre separately. However, creatively there are no limitations on the filmmaker, but competitional – constraints."
    },
    {
      q: "Who watches these films?",
      a:
        "The films made at this festival are screened publicly on the internet. The audience consists of Film buffs, participating teams and their family and friends. These films are also showcased on our website and YouTube channel. Filmmakers can also share these films across their circle."
    },
    {
      q: "What can be the team size?",
      a:
        "The team can have a minimum of 1 person and a maximum of a city. Each team member receives an e-certificate from SHARP_NERD."
    },
    {
      q: "Can I sponsor this challenge?",
      a: "Please mail us at productions.sharp.nerd@gmail.com "
    },
    { q: "Is any footage allowed in the end credits?", a: "Yes. " },
    {
      q: "Can I use a stock photo?",
      a: "If you own the rights to the photo, you can use it."
    },
    {
      q: "Is animation allowed?",
      a: "Yes, if you wish to make an animated film, go for it!"
    },
    {
      q: "Can we include a title animation or our company logo in the film?",
      a:
        "Yes, you can. Provided they are only on screen for less than 10 seconds."
    },
    {
      q:
        "What should be the shooting quality, aspect ratio and sound for the film?",
      a:
        "The final output should be a MPEG4 file with a resolution of 720p or 1080p (please limit the resolution to these two). The aspect ratio should be 16:9. The sound has to be stereo."
    },
    {
      q: "What language must my film be in? Do I need to add subtitles?",
      a:
        "Your film can be in any language. Subtitles are compulsory for all films. You can refer to rules for more specific details about subtitles."
    },
    {
      q: "I can’t find a team member. Can SHARP_NERD help?",
      a:
        "No. The idea is to engage yourself at home while maintaining social-distancing."
    },
    {
      q:
        "I am a filmmaker participating with a mobile phone. Can I edit my film on mobile itself?",
      a: "Sure. It is your film. But maintain the aspect ratio."
    },
    {
      q: "Are we allowed to use Drones to shoot the film?",
      a:
        "Sure, but check with your local authorities and the guidelines issued by the government about flying drones. Our Tales in 10 team or SHARP_NERd team will not be responsible for any mishap that may be faced by you from your local laws."
    },
    {
      q: "Do I need a 'Location Release' to shoot on public property?",
      a:
        "No, you need a location release only on a privately held property. But we strongly recommend taking permits wherever necessary in the case of public property."
    },
    {
      q: "Where do I upload the film?",
      a: "Refer our website. Also go through the How to Submit section."
    },
    {
      q: "Can I use mobile to upload my film?",
      a:
        "We highly advise you to use a laptop to upload your film. Mobile connections tend to be inconsistent, leading to delays. Use of a high-speed broadband is definitely a plus!"
    },
    {
      q: "How do you judge so many films?",
      a:
        "Each film, according to its category of participation, is sent to three different pre-juries for evaluation, consisting of our team members. The cumulative score from the pre-juries is used to prepare a list of merit. The top films from each category are sent to the final jury for viewing and ranking."
    },
    {
      q: "Is the judging process transparent?",
      a:
        "With our target to involve and engage everyone during this tough time we strive hard to make sure that justice is done to each and every film submitted. We shall make it our best attempt to coordinate with everyone while working remotely. To make sure we do not miss out on any films, the team will also watch these films simultaneously and raises an issue internally if any flaws or biases are found in the process. We do not entertain any requests for paid awards, neither have in the past and nor will in the future, to keep the spirit of competition alive."
    }
  ];

  return (
    <Box>
      <Typography variant="h5" component="h5" style={{ textAlign: "center" }}>
        FAQ
      </Typography>

      {data.map((d, i) => {
        return (
          <ExpansionPanel key={i} className={classes.faqExpansion}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"q" + (i + 1)}
              id={"q" + (i + 1)}
            >
              <Typography variant="body1" component="span">
                {`Q: ${d.q}`}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body2" component="span">
                {`A: ${d.a}`}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Box>
  );
};
