import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  Button,
  Link,
  Hidden,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import Home from "./Home";

const useStyles = makeStyles(theme => {
  return {
    menuBar: {
      backgroundColor: "#0000006b"
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between"
    },
    logoWrapper: {
      backgroundColor: "#0000006b",
      borderRadius: theme.spacing(1),
      "& .MuiTypography-root": {
        padding: theme.spacing(1, 2),
        color: theme.palette.common.white
      }
    },
    mobileMenuButton: {
      backgroundColor: "#0000006b",
      borderRadius: theme.spacing(3)
    },
    menuOpts: {
      width: "25vw",
      minWidth: "400px",
      backgroundColor: "#0000006b",
      padding: theme.spacing(1),
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: theme.spacing(1)
    },
    menuEls: {
      color: "white"
    }
  };
});

const Main = ({ data }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = e => {
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
                type="button"
                variant="contained"
                size="small"
                color="primary"
              >
                Submit Film
              </Button>
              <Link href="#" className={classes.menuEls}>
                <Typography>About</Typography>
              </Link>
              <Link href="#" className={classes.menuEls}>
                Rules
              </Link>
              <Link href="#" className={classes.menuEls}>
                FAQ
              </Link>
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
              >
                <MenuItem onClick={handleMenuClose}>
                  <Button
                    href="#"
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Submit Film
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button href="#" fullWidth color="primary" variant="text">
                    About
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button href="#" fullWidth color="primary" variant="text">
                    Rules
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button href="#" fullWidth color="primary" variant="text">
                    FAQ
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route to="/" component={props => <Home data={data} {...props} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
