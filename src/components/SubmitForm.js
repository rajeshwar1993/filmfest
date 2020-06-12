import React from "react";

import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";

const SubmitForm = () => {
  return (
    <Box>
      <form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h5">
              Submit Film:
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name={"team_name"}
              variant="standard"
              label={"Team Name"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name={"leader_name"}
              variant="standard"
              label={"Team Leader Name"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="email"
              name={"email"}
              variant="standard"
              label={"Team Leader Email"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name={"film_title"}
              variant="standard"
              label={"Film Title"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField name={"gerne"} variant="standard" label={"Film Gerne"} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              name={"rt"}
              variant="standard"
              label={"Run Time"}
              placeholder={"mm:ss"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"synop"}
              variant="outlined"
              label={"Film Synopsys"}
              placeholder={"Film Synopsys in about 200 words..."}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"td"}
              variant="outlined"
              label={"Team Details"}
              placeholder={"Member Name - Role - {Character name if any}"}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"link"}
              variant="standard"
              label={"Film link"}
              placeholder={"Google Drive / Youtube Private / Vemo Private link"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default SubmitForm;
