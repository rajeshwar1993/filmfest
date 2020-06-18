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
  Checkbox
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8)
  },
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
    backgroundColor: theme.palette.common.sectionBackground,
    color: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4)
    }
  },
  submitWrapper: {
    backgroundColor: "#f5f5f5",
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

  const uploadInfo = async data => {
    try {
      console.log(data);
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
        console.log("Duplicate entry exists!");
        toggleIsLoading(false);
        updateDialogObj({
          error: true,
          message: "Same entry exists!"
        });
        return;
      }

      //create a doc(film entry)
      let docRef = await temp.add({
        ...uploadData
      });
      if (!docRef.id) {
        //TODO: throw error
        console.log("Submission unsuccessful :(");
        toggleIsLoading(false);
        updateDialogObj({
          error: true,
          message: "Could not write in Temp DB."
        });
        return;
      }
      docRef = docRef.id;
      console.log(docRef);

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
            console.log(url);
            await temp.doc(docRef).update({
              paypic: { url, verified: false, issue: false }
            });

            //delete temp entry
            //await temp.doc(docRef).delete();
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
            <Typography
              variant="h5"
              component="h5"
              style={{ color: "#07a465" }}
            >
              Submission Successful!!
            </Typography>
          )}
          {!isLoading && dialogObj.error && (
            <>
              <Typography variant="h5" component="h5" style={{ color: "red" }}>
                Submission Unuccessful!!
              </Typography>
              <Typography variant="h6" component="h6">
                {dialogObj.message}
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
      <Grid item xs={12} className={classes.submit}>
        <Box className={classes.submitWrapper}>
          <Box>
            <form onSubmit={handleSubmit(uploadInfo)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{ color: "#000" }}
                  >
                    Submit Film:
                  </Typography>
                  <Typography variant="body2" style={{ color: "#000" }}>
                    Please read the{" "}
                    <Link
                      href="#howto"
                      color="secondary"
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
                    helperText={!!errors.team_name && "This info is required."}
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
                    helperText={!!errors.film_title && "This info is required."}
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
                    placeholder={"Mention any music that was used in the film."}
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
                    placeholder={
                      "Google Drive / Youtube Private / Vemo Private link"
                    }
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
                            "Please upload payment screenshot of Rs 149 by Google Pay / PayTm."
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
                      Please upload payment screenshot of Rs 149 by Google Pay /
                      PayTm.
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
                    <Typography
                      variant="h6"
                      component="span"
                      style={{ color: "#000" }}
                    >
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
                      <Typography variant="body2" style={{ color: "#000" }}>
                        I have read and followed all the competition{" "}
                        <Link href="/#rules" color="secondary">
                          Rules
                        </Link>
                        . I have also followed all the steps mentioned in the{" "}
                        <Link color="secondary" href="#howto">
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
      <Grid id={"howto"} item xs={12} className={classes.rules}>
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
    </Container>
  );
};

export default SubmitForm;
