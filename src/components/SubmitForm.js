import React from "react";
import { db, store } from "../fire";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: "red",
  },
}));

const SubmitForm = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const temp = db.collection("temp");
  const entries = db.collection("entries");
  const payRef = store.ref().child("entries/");

  const uploadInfo = async (data) => {
    try {
      console.log(data);

      //data sanitize
      let uploadData = {};

      Object.keys(data).forEach((k) => {
        if (typeof data[k] === "string") {
          uploadData[k] = data[k].trim();
        } else {
          uploadData[k] = data[k];
        }
      });

      //remove the paypic from this upload
      uploadData.paypic = "";

      //check for duplicate - film name, email id, team name
      let q = entries
        .where("email", "==", uploadData.email)
        .where("film_title", "==", uploadData.film_title)
        .where("team_name", "==", uploadData.team_name);
      let docs = await q.get();
      if (!docs.empty) {
        //TODO: throw error
        console.log("Duplicate entry exists!");
        return;
      }

      //create a doc(film entry)
      let docRef = await temp.add({
        ...uploadData,
      });
      if (!docRef.id) {
        //TODO: throw error
        console.log("Submission unsuccessful :(");
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
        contentType: fileObj.type,
      };

      //start uploading
      let uploadTask = uploadRef.put(fileObj, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //need to throw error
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
            //enter the image url in film entry
            //create a doc(film entry)
            console.log(url);
            await entries.doc(docRef).set({
              ...uploadData,
              paypic: url,
              scr_time: "",
              pay_verified: false,
              process_done: false,
              yt_link: "",
              yt_upload: false,
            });

            //delete temp entry
            await temp.doc(docRef).delete();
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(uploadInfo)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Submit Film:
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
              helperText={!!errors.leader_name && "This info is required."}
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
              name={"film_title"}
              variant="standard"
              label={"Film Title *"}
              inputRef={register({ required: true })}
              error={!!errors.film_title}
              helperText={!!errors.film_title && "This info is required."}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label={"Film Genre *"}
              name={"genre"}
              inputRef={register({ required: true })}
              fullWidth
              error={!!errors.genre}
              helperText={!!errors.genre && "This info is required."}
            >
              <MenuItem value={"sel"} disabled>
                Genre
              </MenuItem>
              <MenuItem value={"Drama"}>Drama</MenuItem>
              <MenuItem value={"Comedy"}>Comedy</MenuItem>
              <MenuItem value={"Horror"}>Horror</MenuItem>
              <MenuItem value={"Action"}>Action</MenuItem>
              <MenuItem value={"Musical/Dance"}>Musical/Dance</MenuItem>
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </TextField>
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
          <Grid item xs={12}>
            <TextField
              name={"synop"}
              variant="outlined"
              label={"Film Synopsys *"}
              placeholder={"Film Synopsys in about 200 words..."}
              multiline
              rows={3}
              fullWidth
              inputRef={register({ required: true })}
              error={!!errors.synop}
              helperText={!!errors.synop && "This info is required."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"td"}
              variant="outlined"
              label={"Team Details *"}
              placeholder={"Member Name - Role - {Character name if any}"}
              multiline
              rows={4}
              fullWidth
              inputRef={register({ required: true })}
              error={!!errors.td}
              helperText={!!errors.td && "This info is required."}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"link"}
              variant="standard"
              label={"Film Link *"}
              placeholder={"Google Drive / Youtube Private / Vemo Private link"}
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
                      "Please upload payment screenshot of Rs 149 by Google Pay / PayTm.",
                  },
                })}
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
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubmitForm;
