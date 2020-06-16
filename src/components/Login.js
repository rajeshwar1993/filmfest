import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  loginWrapper: {
    paddingTop: theme.spacing(4),
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: theme.spacing(1)
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
    <Grid item xs={12} md={4} className={classes.loginWrapper}>
      <form onSubmit={handleSubmit(loginUser)}>
        <Grid item xs={12} className={classes.grid}>
          <Typography variant="h6" style={{ color: "#000" }}>
            Login as Administrator
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.grid}>
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

        <Grid item xs={12} className={classes.grid}>
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

        <Grid item xs={12} className={classes.grid}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          {hasError && (
            <Typography variant="h6" style={{ color: "red" }}>
              {hasError.message}
            </Typography>
          )}
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
