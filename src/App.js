import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from './logo_plain.svg';
import './App.scss';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { NavLink, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { fade, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import LogoSrc from './logo_txt.png';

import Home from "./Home";

/** @jsx jsx */;

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
})

function Logo() {
  return (
    <img src={LogoSrc} />
  )
}

const images = [
  '/images/slide2.jpg',
  '/images/slide3.jpg',
]

const Slide = ({ imgsrc }) => (
  <div
    css={css`
      height: 100%;
      width: 100%;
      background-image: url('${imgsrc}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
  />
)

const SliderContainer = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out ${props => props.transition}s;
  height: 100%;
  width: ${props => props.width}px;
  display: flex;
`

const Slider = props => {

  const getWidth = () => window.innerWidth

  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  })

  const { activeIndex, translate, transition } = state

  const nextSlide = () => {
    if (activeIndex === props.slides.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - 1) * getWidth(),
        activeIndex: props.slides.length - 1
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    })
  }


  const handlerSliderNavByKey = useCallback(
    ({keyCode}) => {

      if (keyCode == 37) {
        prevSlide()
      }

      if (keyCode == 39) {
        nextSlide()
      }
    },
    [state]
  );

  useEventListener('keydown', handlerSliderNavByKey)

  return (
    <div className="slider">
      <SliderContainer
        activeIndex={activeIndex}
        translate={translate}
        transition={transition}
        width={getWidth() * props.slides.length}
      >
      {props.slides.map((slide, i) => (
        <Slide key={slide + i} imgsrc={slide} />
      ))}
      </SliderContainer>
    </div>
  )
}

function HeaderContacts() {
  return (
    <div>+38 (068) 888 88 88</div>
  )
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

        <AppBar position="fixed" className="initial-scroll">
          <Toolbar>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item className={classes.paper} xs={3}>
                <Logo />
              </Grid>
              <Grid item className={[classes.paper, "menu-section"].join(' ')} xs={9}>
                <MainMenu />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <Slider slides={images} />

        <Grid container component="main">
          <Grid item xs={9}>
            <Paper elevation={3}>
              test
            </Paper>
          </Grid>
        </Grid>

        <Grid item component="footer">
        </Grid>
      </div>
    </ThemeProvider>
  );
}


// Hook
function useEventListener(eventName, handler, element = window){
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      const eventListener = event => savedHandler.current(event);

      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
};

export default AppGrid;
