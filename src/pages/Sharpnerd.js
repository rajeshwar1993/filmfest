import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Container, Grid, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(14),
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
    role: "Festival Coordinator",
  },
  {
    url:
      "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-8/11060906_878768038844566_3235081251159877607_o.jpg?_nc_cat=103&_nc_sid=7aed08&_nc_ohc=KAsK3eBzURMAX-JkuJA&_nc_ht=scontent-bom1-1.xx&oh=e1d4a8a01394ec0ddc367647fa76e53b&oe=5F141D14",
    name: "Shreeparna Chatterjee",
    role: "Outreach Coordinator",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/53306933_10157102282113415_7093364572127494144_o.jpg?_nc_cat=100&_nc_sid=7aed08&_nc_ohc=D-oYbZdwvxoAX8dbYLj&_nc_ht=scontent-bom1-2.xx&oh=d039016ca0de9746e25690ceb8c3f7c2&oe=5F149434",
    name: "Gaurav Ganguly",
    role: "Media Coordinator",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t31.0-8/10498518_10203320126178752_1175711432273694237_o.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_ohc=JSrlfiOSsgwAX9n81K5&_nc_ht=scontent-bom1-2.xx&oh=777ddb564c5d8c42053a91a178d222e8&oe=5F14C56E",
    name: "Deepesh Sangtani",
    role: "Graphics Coordinator",
  },
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=omTi1IrSoQ4AX9kfnSz&_nc_ht=scontent-bom1-2.xx&oh=a112f19b6d8896afd0f0a8feab477e8c&oe=5F0D7EC2",
    name: "Soumyadeep Bagchi",
    role: "Content Coordinator",
  },
  {
    url:
      "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-8/457595_4704292938479_1629433074_o.jpg?_nc_cat=103&_nc_sid=210fed&_nc_ohc=YAD2pNG3nz8AX_TfqIs&_nc_ht=scontent-bom1-1.xx&oh=de0bc43ccdd7d70b66e9c93e213d53bd&oe=5F153019",
    name: "Rajeshwar Rudra",
    role: "Website Coordinator",
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
              <Typography
                variant="subtitle2"
                style={{
                  marginBottom: theme.spacing(2),
                }}
              >
                {td.role}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Sharpnerd;
