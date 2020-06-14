import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Container, Grid, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    textAlign: "center",
    color: "white",
  },
  image: {
    width: "80%",
    margin: "1.66% auto",
    paddingBottom: "70%",
    backgroundSize: "cover",
    borderRadius: "100%",
    border: "3px solid white",
    position: "relative",
  },
}));

const teamData = [
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Songjukta Bagchi",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Songjukta Bagchi",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Songjukta Bagchi",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Songjukta Bagchi",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Songjukta Bagchi",
  },
];

const Sharpnerd = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth={"md"} className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4">The Team</Typography>
        </Grid>
        {teamData.map((td) => {
          return (
            <Grid item xs={6} md={4}>
              <Box
                className={classes.image}
                style={{
                  backgroundImage: `url(${td.url})`,
                }}
              >
                .
              </Box>
              <Typography
                variant="h6"
                style={{
                  marginTop: theme.spacing(2),
                }}
              >
                {td.name}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Sharpnerd;
