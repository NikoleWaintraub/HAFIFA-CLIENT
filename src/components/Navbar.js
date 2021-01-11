import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Home from './CoursesComp'
import Profile from './ProfileComp'
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, Menu } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
    history.push('/home')
  };

  const handleProfile = (event) => {
    history.push('/profile')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.root}>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                label={auth ? 'התחבר' : 'התנתקר'} />
            </FormGroup>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  נרשמים ונהנים
          </Typography>
                {auth && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit">
                      <HomeIcon />
                    </IconButton>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleProfile}
                      tp='/profile'
                      color="inherit">
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu open={false}
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      onClose={handleClose}
                    >
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </div>
        </Grid>
      </Grid>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}
