import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Grid, Typography, TextField, Button, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6)
  },
  grid: {
    paddingTop: theme.spacing(2)
  }
}));

const Login = ({ loginUser, ...props }) => {
  const classes = useStyles();

  const { register, handleSubmit } = useForm();
  const { hasError } = useSelector(state => state.app);

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <Paper className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12} md={8} className={classes.grid}>
            <Typography variant="h6" color="primary">
              Login as Administrator
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} className={classes.grid}>
            <TextField
              type="email"
              variant="outlined"
              label="E-mail"
              color="primary"
              name="email"
              inputRef={register({ required: true })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={8} className={classes.grid}>
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              color="primary"
              name="pass"
              inputRef={register({ required: true })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={8} className={classes.grid}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            {hasError && (
              <Typography variant="h6" style={{ color: "red" }}>
                {hasError.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default Login;
