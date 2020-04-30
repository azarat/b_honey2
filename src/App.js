import React from 'react';
import logo from './logo_plain.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { NavLink, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LogoSrc from './logo_plain.png';

import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d79828',
    },
  },
});

function Logo() {
  return (
    <img src={LogoSrc} />
  );
}

function Slider() {
  return (
    <div>+38 (068) 888 88 88</div>
  );
}

function HeaderContacts() {
  return (
    <div>+38 (068) 888 88 88</div>
  );
}

function MainMenu() {
  return (
    <Router>
      <ButtonGroup variant="text" component="nav" color="primary" aria-label="text primary button group">
        <Button component={NavLink} to="/home">Главная</Button>
        <Button>Магазин</Button>
        <Button>Оплата и доставка</Button>
        <Button>Контакты</Button>
      </ButtonGroup>
      <Switch>
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

function AppGrid() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center" component="header">
          <Grid item className={classes.paper} xs={3}>
            <Logo />
          </Grid>
          <Grid item className={classes.paper} xs={6}>
            <MainMenu />
          </Grid>
          <Grid item className={classes.paper} xs={3}>
            <HeaderContacts />
          </Grid>
        </Grid>


        <Grid item component="main">
          <Slider />
        </Grid>


        <Grid item component="footer">
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default AppGrid;
