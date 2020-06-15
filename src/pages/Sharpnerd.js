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
        <Grid item xs={12} className={classes.aboutUs}>
          <Box>
            <Typography variant="h4" component="h3">
              About
            </Typography>

            <Typography variant="subtitle1">
              <p>
                IFP’s flagship challenge is back! Assemble your crew and get
                ready to script, shoot, edit and upload a film in just 50 hours.
                Experience the thrill of creating a film in 50 hours, the
                tightest and most exuberant deadline you’ll ever experience
              </p>
              <p>
                Your team Size can be 1 to 20 people. Teams can choose any one
                category to participate – Professional, Amateur or Mobile. The
                theme will be revealed at the beginning of 50 hours on Sep 25,
                8pm, IST
              </p>
              <p>
                Over 1.65 Lac filmmakers from over 30 countries participated in
                our challenge in last 9 years. Be one of them this year and
                stand a chance to have your work showcased to the best directors
                and filmmakers in the industry.
              </p>{" "}
            </Typography>
          </Box>
        </Grid>
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
