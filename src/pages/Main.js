import React, { useState } from "react";
import firebase from "firebase";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo2 from "../images/H_R.png";
import { scroller } from "react-scroll";

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
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Home from "./Home";
import SubmitForm from "./SubmitForm";
import Sharpnerd from "./Sharpnerd";
import Administrator from "./Administrator";

import { login } from "../components/actions";

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
      // "& .MuiTypography-root": {
      //   padding: theme.spacing(1, 2),
      //   color: theme.palette.common.white,
      //   fontWeight: 500,
      // },
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
      width: "35vw",
      minWidth: "550px",
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

const menuItemsHome = [
  { text: "Submit Film", anchor: "submit", type: "button" },
  { text: "Contact", anchor: "follow", type: "link" },
  { text: "About", anchor: "about", type: "link" },
  { text: "Dates", anchor: "dates", type: "link" },
  { text: "Rules", anchor: "rules", type: "link" },
  { text: "FAQ", anchor: "faq", type: "link" },
  { text: "Sharpnerd", anchor: "Sharpnerd", type: "button" },
];

const Main = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user && user.uid && user.email) {
      console.log("Found user:", user);
      //toggleIsLoggedIn({ uid: user.uid, email: user.email });
      dispatch(login({ uid: user.uid, email: user.email }));
    } else {
      console.log("Login user not found");
      //dispatch(toggle_loading(false));
    }
  });

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollEl = (e, pos) => {
    //e.preventDefault();
    console.log(pos);
    history.push(`/#${pos}`);
    scroller.scrollTo(pos, {
      duration: 1000,
      smooth: true,
      delay: 0,
      offset: -70,
    });
  };

  return (
    <>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <Hidden smDown>
            <Box className={classes.logoWrapper}>
              <Link href="/">
                <img src={logo2} style={{ height: "30px" }} />
              </Link>
            </Box>
            <Box className={classes.menuOpts}>
              {menuItemsHome.map((item) => {
                if (item.type === "button") {
                  return (
                    <Button
                      key={"d-" + item.text}
                      href={`/${item.anchor}`}
                      variant="contained"
                      size="small"
                      color="primary"
                    >
                      {item.text}
                    </Button>
                  );
                } else if (item.type === "link")
                  return (
                    <Link
                      key={"d-" + item.text}
                      href={`#${item.anchor}`}
                      className={classes.menuEls}
                      onClick={(e) => {
                        scrollEl(e, item.anchor);
                      }}
                    >
                      {item.text}
                    </Link>
                  );
              })}
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box className={classes.logoWrapper}>
              <Link href="/">
                <img src={logo2} style={{ height: "20px" }} />
              </Link>
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
                {menuItemsHome.map((item) => (
                  <MenuItem onClick={handleMenuClose}>
                    {item.type === "button" && (
                      <Button
                        key={"m-" + item.text}
                        href={`/${item.anchor}`}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        {item.text}
                      </Button>
                    )}
                    {item.type === "link" && (
                      <Button
                        href={`#${item.anchor}`}
                        key={"m-" + item.text}
                        fullWidth
                        color="primary"
                        variant="text"
                        onClick={(e) => {
                          scrollEl(e, item.anchor);
                        }}
                      >
                        {item.text}
                      </Button>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/submit" component={SubmitForm} />
        <Route path="/Sharpnerd" component={Sharpnerd} />
        <Route
          path="/administrator"
          component={(props) => <Administrator {...props} />}
        />
        <Route
          path="/"
          component={(props) => <Home data={data} {...props} />}
        />
      </Switch>
    </>
  );
};

export default Main;
