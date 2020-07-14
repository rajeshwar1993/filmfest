import React, { useState } from "react";
import firebase from "firebase";
import { db, store } from "../fire";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormHelperText,
  Link,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Paper,
  Hidden,
  DialogContentText
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8)
  },
  paper: { backgroundColor: theme.palette.common.sectionBackground },
  rules: {
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4)
    }
  },
  rulesWrapper: {
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`
  },
  submit: {
    padding: theme.spacing(2, 0),
    //backgroundColor: theme.palette.common.sectionBackground,
    //color: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4)
    }
  },
  submitWrapper: {
    //backgroundColor: "#f5f5f5",
    height: "calc(100% - 32px)",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1)
  },
  errorText: {
    color: "red"
  },
  teamPersonGrid: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 0),
    border: "1px solid",
    borderRadius: theme.spacing(1)
  },
  dialogBox: {
    textAlign: "center",
    "& img": {
      width: "250px",
      height: "250px"
    }
  }
}));

const SubmitForm = () => {
  const classes = useStyles();

  const [isLoading, toggleIsLoading] = useState(false);
  const [isPayPic, toggleIsPayPic] = useState(false);
  const [dialogIsOpen, toggleDialogIsOpen] = useState(false);
  const [dialogObj, updateDialogObj] = useState({});
  const [readRules, toggleReadRules] = useState(false);

  const { register, handleSubmit, errors, control, reset } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "team"
  });

  const temp = db.collection("temp");
  const entries = db.collection("entries");
  const payRef = store.ref().child("entries/");

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      toggleDialogIsOpen(false);
      updateDialogObj({});
      reset();
    }
  };

  const [dialogControl, updateDialogControl] = useState({
    open: false,
    title: "",
    text: "",
    img: "",
    closeButtonText: "close"
  });

  const handleCloseDialog = () => {
    updateDialogControl({
      ...dialogControl,
      open: false
    });
  };

  const uploadInfo = async data => {
    try {
      toggleIsLoading(true);

      toggleDialogIsOpen(true);
      //data sanitize
      let uploadData = {};

      Object.keys(data).forEach(k => {
        if (typeof data[k] === "string") {
          uploadData[k] = data[k].trim();
        } else {
          uploadData[k] = data[k];
        }
      });

      //remove the paypic from this upload
      uploadData.paypic = "";
      //adding timestamp
      uploadData.ts = firebase.firestore.FieldValue.serverTimestamp();

      //check for duplicate - film name, email id, team name
      let q = entries
        .where("email", "==", uploadData.email)
        .where("film_title", "==", uploadData.film_title)
        .where("team_name", "==", uploadData.team_name);
      let docs = await q.get();
      if (!docs.empty) {
        //TODO: throw error
        toggleIsLoading(false);
        updateDialogObj({
          error: true,
          message: "Same entry exists!"
        });
        return;
      }

      //create a doc(film entry)
      let docRef = await temp.add({
        ...uploadData,
        status: {}
      });
      if (!docRef.id) {
        //TODO: throw error
        toggleIsLoading(false);
        updateDialogObj({
          error: true,
          message: "Could not write in Temp DB."
        });
        return;
      }
      docRef = docRef.id;

      //upload the image with doc
      const fileObj = data.paypic[0];
      const ext = fileObj.type.split("/")[1];
      const filename = "payment_" + docRef + "_image." + ext.toString();
      let uploadRef = payRef.child(filename);
      let metadata = {
        contentType: fileObj.type
      };

      //start uploading
      let uploadTask = uploadRef.put(fileObj, metadata);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          //need to throw error
          toggleIsLoading(false);
          updateDialogObj({
            error: true,
            message: "Could not write payment image in Storage."
          });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async url => {
            //enter the image url in film entry
            //create a doc(film entry)

            await temp.doc(docRef).update({
              paypic: { url, verified: false, issue: false }
            });
            toggleIsLoading(false);
            updateDialogObj({ error: false });
          });
        }
      );
    } catch (err) {
      console.log(err);
      toggleIsLoading(false);
      updateDialogObj({ error: true, message: err.message });
    }
  };

  return (
    <Container maxWidth={"md"} className={classes.root}>
      <Paper className={classes.paper}>
        <Dialog
          open={dialogControl.open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialogBox}
        >
          <DialogTitle id="alert-dialog-title">
            {dialogControl.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogControl.text}
            </DialogContentText>
            <img src={dialogControl.img} alt={dialogControl.title} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              {dialogControl.closeButtonText}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={dialogIsOpen}
          maxWidth={"lg"}
          className={classes.imageDialog}
        >
          <DialogTitle id="title">{"Submission Status"}</DialogTitle>
          <DialogContent>
            {isLoading && <CircularProgress />}
            {!isLoading && !dialogObj.error && (
              <>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ color: "#07a465" }}
                >
                  Successful Submission!
                </Typography>
                <Typography variant="body1" style={{ color: "#fff" }}>
                  We will very your film link and payment info and get back on
                  mail for any further communication. Thanks!
                </Typography>
              </>
            )}
            {!isLoading && dialogObj.error && (
              <>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ color: "red" }}
                >
                  Unuccessful Submission !!
                </Typography>
                <Typography variant="h6" component="h6">
                  {dialogObj.message}
                </Typography>
                <Typography variant="body1" style={{ color: "#fff" }}>
                  Please write back to us productions.sharp.nerd@gmail.com along
                  with the screenshot of this message so that we can take your
                  submission forward. Thanks.
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              disabled={isLoading}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {/* <Hidden xsUp> */}
        <Paper>
          <Grid item xs={12} className={classes.submit}>
            <Box className={classes.submitWrapper}>
              <Box>
                <form onSubmit={handleSubmit(uploadInfo)} autoComplete="off">
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h3">Submit your film</Typography>
                      <Typography variant="h6">
                        Please read the{" "}
                        <Link
                          href="#howto"
                          color="primary"
                          style={{ textDecoration: "underline" }}
                        >
                          How To Submit
                        </Link>{" "}
                        section before submitting.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name={"team_name"}
                        variant="standard"
                        label={"Team Name *"}
                        inputRef={register({ required: true })}
                        error={!!errors.team_name}
                        helperText={
                          !!errors.team_name && "This info is required."
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name={"leader_name"}
                        variant="standard"
                        label={"Team Leader Name *"}
                        inputRef={register({ required: true })}
                        error={!!errors.leader_name}
                        helperText={
                          !!errors.leader_name && "This info is required."
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="email"
                        name={"email"}
                        variant="standard"
                        label={"Team Leader Email *"}
                        inputRef={register({ required: true })}
                        error={!!errors.email}
                        helperText={!!errors.email && "This info is required."}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="number"
                        name={"phone"}
                        variant="standard"
                        label={"Team Leader Phone Number *"}
                        inputRef={register({ required: true })}
                        error={!!errors.phone}
                        helperText={!!errors.phone && "This info is required."}
                      />
                    </Grid>
                    <Grid item xs={false} md={4} />
                    <Grid item xs={false} md={4} />
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name={"film_title"}
                        variant="standard"
                        label={"Film Title *"}
                        inputRef={register({ required: true })}
                        error={!!errors.film_title}
                        helperText={
                          !!errors.film_title && "This info is required."
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Controller
                        name={"genre"}
                        control={control}
                        rules={{ required: true }}
                        as={
                          <TextField select label={"Film Genre *"} fullWidth>
                            <MenuItem value={"Drama"}>Drama</MenuItem>
                            <MenuItem value={"Comedy"}>Comedy</MenuItem>
                            <MenuItem value={"Horror"}>Horror</MenuItem>
                            <MenuItem value={"Action"}>Action</MenuItem>
                            <MenuItem value={"Musical/Dance"}>
                              Musical/Dance
                            </MenuItem>
                            <MenuItem value={"Adventure"}>Adventure</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                          </TextField>
                        }
                      />
                      <FormHelperText>
                        {!!errors.genre && "This info is required."}
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        name={"rt"}
                        variant="standard"
                        label={"Run Time *"}
                        placeholder={"mm:ss"}
                        inputRef={register({ required: true })}
                        error={!!errors.rt}
                        helperText={!!errors.rt && "This info is required."}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name={"synop"}
                        variant="outlined"
                        label={"Film Synopsys *"}
                        placeholder={"Film Synopsys in about 200 words..."}
                        multiline
                        rows={5}
                        fullWidth
                        inputRef={register({ required: true })}
                        error={!!errors.synop}
                        helperText={!!errors.synop && "This info is required."}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        name={"md"}
                        variant="outlined"
                        label={"Music Used"}
                        placeholder={
                          "Mention any music that was used in the film."
                        }
                        multiline
                        rows={5}
                        fullWidth
                        inputRef={register}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="url"
                        name={"link"}
                        variant="standard"
                        label={"Film Link *"}
                        placeholder={"Google Drive / Youtube Private Link"}
                        fullWidth
                        inputRef={register({ required: true })}
                        error={!!errors.link}
                        helperText={!!errors.link && "This info is required."}
                      />
                    </Grid>
                    <Grid item xs={8} md={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component="label"
                      >
                        Upload Payment Screenshot
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          name={"paypic"}
                          ref={register({
                            required: {
                              value: true,
                              message:
                                "Please upload the screenshot of the payment confirmation screen."
                            }
                          })}
                          onChange={e => {
                            if (e.nativeEvent.target.files.length > 0)
                              toggleIsPayPic(true);
                          }}
                        />
                      </Button>
                      {!errors.paypic && (
                        <FormHelperText>
                          Please upload the screenshot of the payment
                          confirmation screen. See payment details{" "}
                          <Link color="primary" href="#howto">
                            here
                          </Link>
                          .
                        </FormHelperText>
                      )}
                      {!!errors.paypic && (
                        <FormHelperText className={classes.errorText}>
                          {errors.paypic.message}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4} md={6}>
                      {isPayPic && (
                        <CheckCircleIcon
                          style={{ fontSize: 40, color: "#07a465" }}
                        />
                      )}
                    </Grid>
                    <Grid container item xs={12}>
                      <Grid item xs={12}>
                        <Typography variant="h6" component="span">
                          Team Details:
                        </Typography>
                      </Grid>
                      {fields.map((item, index) => (
                        <Grid
                          container
                          key={item.id}
                          spacing={2}
                          className={classes.teamPersonGrid}
                        >
                          <Grid item xs={12} md={4}>
                            <TextField
                              type={"text"}
                              label={"Team Member Name *"}
                              placeholder={"Team Member Name"}
                              name={`team[${index}].nm`}
                              inputRef={register({ required: true })}
                              error={!!errors[`team[${index}].nm`]}
                              helperText={
                                !!errors[`team[${index}].nm`] &&
                                "This info is required."
                              }
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {index + 1}.
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              type={"email"}
                              label={"Team Member E-mail *"}
                              name={`team[${index}].em`}
                              inputRef={register({ required: true })}
                              error={!!errors[`team[${index}].em`]}
                              helperText={
                                !!errors[`team[${index}].em`] &&
                                "This info is required."
                              }
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField
                              type={"text"}
                              label={"Team Member Role *"}
                              placeholder={"eg: Director, Actor etc"}
                              name={`team[${index}].role`}
                              inputRef={register({ required: true })}
                              error={!!errors[`team[${index}].role`]}
                              helperText={
                                !!errors[`team[${index}].role`] &&
                                "This info is required."
                              }
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button
                              color="danger"
                              variant="outlined"
                              onClick={() => remove(index)}
                              startIcon={<DeleteIcon />}
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid item xs={12} lg={4}>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => append({ name: "exp" })}
                          startIcon={<AddIcon />}
                        >
                          Add Team Member
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={readRules}
                            onChange={() => {
                              toggleReadRules(!readRules);
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I have read and followed all the competition{" "}
                            <Link href="/#rules" color="primary">
                              Rules
                            </Link>
                            . I have also followed all the steps mentioned in
                            the{" "}
                            <Link color="primary" href="#howto">
                              How to Submit
                            </Link>{" "}
                            Section.
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!readRules}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Grid>
        </Paper>
        {/* </Hidden> */}
        {/* <Grid item xs={12} className={classes.submit}>
          <Typography variant="h3">
            Submission form will be active here at 10:00am (IST) 15 July, 2020
          </Typography>
        </Grid> */}
        <Grid id={"howto"} item xs={12} className={classes.rules}>
          <Box className={classes.rulesWrapper}>
            <Typography
              variant="h4"
              component="h4"
              style={{ textAlign: "center" }}
            >
              How to submit
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              style={{ textAlign: "center" }}
            >
              Please use the following guidelines to create and submit your
              film.
            </Typography>
            <Typography variant="subtitle1" component="span">
              <ol>
                <li>
                  Please edit your film accrding to the following guidelines:
                  <ul>
                    <li>
                      Maintain the overall runtime of the film to under or upto
                      10 mins (excluding opening slide).
                    </li>
                    <li>
                      Include the given opening slide of the film at the very
                      begining. The 10 mins maximum runtime will{" "}
                      <strong>NOT</strong> include the opening slide duration.
                    </li>
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
                                    this.removeEventListener(
                                      "click",
                                      clickHandler
                                    );
                                  }, 150);
                                };

                                // Add the click event listener on the anchor element
                                // Comment out this line if you don't want a one-off download of the blob content
                                a.addEventListener(
                                  "click",
                                  clickHandler,
                                  false
                                );

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
                          Designed by Ishaan Moitra. ©Tales in 10 Short Film
                          Festival.
                        </Typography>
                      </div>
                    </li>
                    <li>
                      Please render your films at a resolution of either 720p or
                      1080p. Please try and restrict the total size upto a
                      maximum of 1Gb per film.
                    </li>
                  </ul>{" "}
                </li>
                <li>
                  Subtitles and Language:
                  <ul>
                    <li>
                      There is no restriction of the language of the film.
                    </li>
                    <li>
                      Subtitles are mandatory for each film and can be added in
                      one of the following way:
                      <ul>
                        <li>
                          In film - <strong>Recommended</strong>
                        </li>
                        <li>
                          Separate SRT file - uploaded with Google drive link
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Entry fee payment:
                  <ul>
                    <li>
                      A nominal entry fee of Rs. 199 must be payed for every
                      individual entry.
                    </li>
                    <li>
                      Kindly take the screenshot of the payment success page
                      which needs to be uploaded with the entry.
                    </li>
                    <li>
                      Payment can be made in one of the following way:
                      <ul>
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
                          >
                            PayTm QR Code
                          </Button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Upload your film in one of the following and submit the link
                  in the form:
                  <ul>
                    <li>Youtube Private Link (Recommended)</li>
                    <li>Google Drive</li>
                  </ul>
                </li>
                <li>
                  Submit the Film Submission form filling all the details in
                  order for a successful submission.
                </li>
                <li>
                  Please check{" "}
                  <Link
                    href="#faq"
                    color="secondary"
                    style={{ textDecoration: "underline" }}
                  >
                    FAQ
                  </Link>{" "}
                  for any other queries, or feel free to{" "}
                  <Link
                    href="#contact"
                    color="secondary"
                    style={{ textDecoration: "underline" }}
                  >
                    Contact us
                  </Link>
                  .
                </li>
              </ol>
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SubmitForm;
