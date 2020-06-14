import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Link as ScrollLink, scroller } from "react-scroll";

import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Home from "./Home";

const useStyles = makeStyles((theme) => {
  return {
    menuBar: {
      backgroundColor: "#000000de",
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between",
    },
    logoWrapper: {
      backgroundColor: "#0000006b",
      borderRadius: theme.spacing(1),
      "& .MuiTypography-root": {
        padding: theme.spacing(1, 2),
        color: theme.palette.common.white,
      },
    },
    mobileMenuButton: {
      backgroundColor: "#0000006b",
      borderRadius: theme.spacing(3),
    },
    mobileMenu: {
      "& .MuiPaper-root": {
        backgroundColor: theme.palette.common.sectionBackground,
      },
    },
    menuOpts: {
      width: "25vw",
      minWidth: "400px",
      backgroundColor: "#0000006b",
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: theme.spacing(1),
    },
    menuEls: {
      color: theme.palette.common.textColor,
      cursor: "pointer",
      [theme.breakpoints.up("md")]: {
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  };
});

const Main = ({ data }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <BrowserRouter>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <Hidden smDown>
            <Box className={classes.logoWrapper}>
              <Typography variant="h6">{data.fest_name}</Typography>
            </Box>
            <Box className={classes.menuOpts}>
              <Button
                href="#"
                variant="contained"
                size="small"
                color="primary"
                onClickCapture={(e) => {
                  e.preventDefault();
                  scroller.scrollTo("submit", {
                    duration: 1000,
                    smooth: true,
                    delay: 0,
                    offset: -70,
                  });
                }}
              >
                Submit Film
              </Button>

              <ScrollLink
                to="follow"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
                className={classes.menuEls}
              >
                <Typography>About</Typography>
              </ScrollLink>

              <ScrollLink
                to="rules"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
                className={classes.menuEls}
              >
                Rules
              </ScrollLink>

              <ScrollLink
                to="faq"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
                className={classes.menuEls}
              >
                FAQ
              </ScrollLink>
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
                className={classes.menuEls}
              >
                Contact Us
              </ScrollLink>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.logoWrapper}>
              <Typography variant="body1">{data.fest_name}</Typography>
            </Box>
            <Box className={classes.mobileMenuButton}>
              <IconButton
                aria-label="menu"
                color="primary"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={openMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className={classes.mobileMenu}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClickCapture={(e) => {
                      e.preventDefault();
                      scroller.scrollTo("submit", {
                        duration: 1000,
                        smooth: true,
                        delay: 0,
                        offset: -70,
                      });
                    }}
                  >
                    Submit Film
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="text"
                    onClickCapture={(e) => {
                      e.preventDefault();
                      scroller.scrollTo("follow", {
                        duration: 1000,
                        smooth: true,
                        delay: 0,
                        offset: -70,
                      });
                    }}
                  >
                    About
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="text"
                    onClickCapture={(e) => {
                      e.preventDefault();
                      scroller.scrollTo("rules", {
                        duration: 1000,
                        smooth: true,
                        delay: 0,
                        offset: -70,
                      });
                    }}
                  >
                    Rules
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="text"
                    onClickCapture={(e) => {
                      e.preventDefault();
                      scroller.scrollTo("faq", {
                        duration: 1000,
                        smooth: true,
                        delay: 0,
                        offset: -70,
                      });
                    }}
                  >
                    FAQ
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="text"
                    onClickCapture={(e) => {
                      e.preventDefault();
                      scroller.scrollTo("contact", {
                        duration: 1000,
                        smooth: true,
                        delay: 0,
                        offset: -70,
                      });
                    }}
                  >
                    Contact us
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route to="/" component={(props) => <Home data={data} {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
