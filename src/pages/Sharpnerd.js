import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Container, Grid, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(14),
    textAlign: "center",
    color: "white"
  },
  image: {
    width: "80%",
    margin: "1.66% auto",
    paddingBottom: "70%",
    backgroundSize: "cover",
    borderRadius: "100%",
    border: "3px solid white",
    position: "relative"
  }
}));

const teamData = [
  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t1.0-9/84559131_2891292430909373_129223587272851456_o.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=boqPQT9LGM0AX_B4odl&_nc_ht=scontent-bom1-2.xx&oh=ad49973acd77ef44d938ecd196f3cf3e&oe=5F350BC2",
    name: "Songjukta Bagchi",
    role: "Festival/Outreach Coordinator"
  },
  {
    url:
      "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-8/11060906_878768038844566_3235081251159877607_o.jpg?_nc_cat=103&_nc_sid=7aed08&_nc_ohc=KAsK3eBzURMAX-JkuJA&_nc_ht=scontent-bom1-1.xx&oh=e1d4a8a01394ec0ddc367647fa76e53b&oe=5F141D14",
    name: "Shreeparna Chatterjee",
    role: "Content Coordinator"
  },

  {
    url:
      "https://scontent-bom1-2.xx.fbcdn.net/v/t31.0-8/10498518_10203320126178752_1175711432273694237_o.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_ohc=JSrlfiOSsgwAX9n81K5&_nc_ht=scontent-bom1-2.xx&oh=777ddb564c5d8c42053a91a178d222e8&oe=5F14C56E",
    name: "Deepesh Sangtani",
    role: "Graphics Coordinator"
  },

  {
    url:
      "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-8/457595_4704292938479_1629433074_o.jpg?_nc_cat=103&_nc_sid=210fed&_nc_ohc=YAD2pNG3nz8AX_TfqIs&_nc_ht=scontent-bom1-1.xx&oh=de0bc43ccdd7d70b66e9c93e213d53bd&oe=5F153019",
    name: "Rajeshwar Rudra",
    role: "Website Coordinator"
  },
  {
    url:
      "https://scontent-bom1-1.xx.fbcdn.net/v/t31.0-8/30073181_10156294671503415_7344703849130192093_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=Fxb0dOHnjzkAX89ffL8&_nc_ht=scontent-bom1-1.xx&oh=0c185ba65e727f2efe27d7f5c0d22a49&oe=5F16BF5A",
    name: "Gaurav Ganguly",
    role: "Media Coordinator"
  },
  {
    url:
      "https://scontent-del1-1.xx.fbcdn.net/v/t1.0-9/44102155_2202736176467753_6515576825253462016_n.jpg?_nc_cat=109&_nc_sid=7aed08&_nc_ohc=h0jndg05Jx0AX-NHHSP&_nc_ht=scontent-del1-1.xx&oh=dca59ff6c5ec6ef81d78b6acf485bff2&oe=5F334FD4",
    name: "Ruchira Bhattacharyya",
    role: "Social Media Coordinator"
  },
  {
    url:
      "https://scontent-del1-1.xx.fbcdn.net/v/t1.0-1/16299025_10209965808760850_3848713532812389782_n.jpg?_nc_cat=101&_nc_sid=dbb9e7&_nc_ohc=qm21OMwg0NQAX_7FKZj&_nc_ht=scontent-del1-1.xx&oh=2f367b5a632cd0225c986298b882f246&oe=5F32B47C",
    name: "Joydeep Pal",
    role: "Finance Coordinator"
  }
];

const Sharpnerd = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container maxWidth={"md"} className={classes.root}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} className={classes.aboutUs}>
          <Box>
            <Typography variant="h4" component="h3">
              Welcome to SHARP_NER<i>d</i> Productions
            </Typography>

            <Typography variant="subtitle1">
              <p>
                We are a team of people who have come together to share a common
                interest in the world of films and stories. We believe in
                content and expressions which can take the daily mundane and
                turn it into a creative venture, and have dipped our feet into
                film-making for this purpose.
              </p>
              <p>
                The core group consists of folks who have tried their hands at
                almost every possible avenue of artistic engagement and have
                merged diverse interests into this production house. Our goal is
                to inspire, create, and network as we grow to become a better
                team.
              </p>
              <p>
                As a production house, we have participated in several
                well-known competitions and a few local film festivals, and we
                will continue to do so. Whether it is genres like Mystery,
                Thriller, Comedy films, we have experimented with our
                story-telling styles and production abilities to challenge
                ourselves every time.
              </p>
              <p>
                We will continue to write, document, direct, edit, and produce
                work that invigorates us and our desires to keep on keeping on.
              </p>{" "}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">The Team</Typography>
        </Grid>
        {teamData.map(td => {
          return (
            <Grid item xs={6} md={4}>
              <Box
                className={classes.image}
                style={{
                  backgroundImage: `url(${td.url})`
                }}
              >
                .
              </Box>
              <Typography
                variant="h6"
                style={{
                  marginTop: theme.spacing(2)
                }}
              >
                {td.name}
              </Typography>
              <Typography
                variant="subtitle2"
                style={{
                  marginBottom: theme.spacing(2)
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
