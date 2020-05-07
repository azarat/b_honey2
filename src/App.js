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
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Fade from 'react-reveal/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
  headerBg: {
    background: '#d79828'
  }
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
    transition: 0.45,
    opacity: 1
  })

  const { activeIndex, translate, transition, opacity } = state

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

  // -------------------------
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
  // -------------------------

  // -------------------------
  const handlerScroll = useCallback(
    (e) => {
      var relativeOpacity;
      var relativeScroll = window.innerHeight - window.scrollY;

      if (relativeScroll >= 0) {
        relativeOpacity = relativeScroll / window.innerHeight;
      } else {
        relativeOpacity = 0;
      }

      setState({
        ...state,
        opacity: relativeOpacity
      })
    },
    [state]
  );

  useEventListener('scroll', handlerScroll)
  // -------------------------

  return (
    <div className="slider">
      <SliderContainer
        opacity={opacity}
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

const Header = props => {
  return (
    <AppBar position="fixed" className="initial-scroll">
      <div className={props.classes.headerBg} css={css`
          opacity: ${props.opacityHeaderBg};
        `}></div>
      <Toolbar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item className={props.classes.paper} xs={2}>
            <Logo />
          </Grid>
          <Grid item className={[props.classes.paper, "menu-section"].join(' ')} xs={10}>
            <MainMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
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

const BlocksUnderSlider = () => {
  return (
    <Grid container className="blocks-under-slider">
      <Grid item xs={4}>
        <Fade left>
          <ScheduleIcon />
        </Fade>
        <Fade right>
          <div className="blocks-under-slider__item">
            <span className="blocks-under-slider__item__top">Режим работы</span>
            <span className="blocks-under-slider__item__bottom">Пн-пт: 9:00 - 17:00<br />Сб-вс: выходные</span>
          </div>
        </Fade>
      </Grid>
      <Grid item xs={4}>
        <Fade left>
          <CreditCardIcon />
        </Fade>
        <Fade right>
          <div className="blocks-under-slider__item">
            <span className="blocks-under-slider__item__top">Оплата</span>
            <span className="blocks-under-slider__item__bottom">Картой Visa/Mastercard<br />Наложеный платеж</span>
          </div>
        </Fade>
      </Grid>
      <Grid item xs={4}>
        <Fade left>
          <LocalShippingIcon />
        </Fade>
        <Fade right>
          <div className="blocks-under-slider__item">
            <span className="blocks-under-slider__item__top">Доставка</span>
            <span className="blocks-under-slider__item__bottom">По Украине<br />Новой Почтой</span>
          </div>
        </Fade>
      </Grid>
    </Grid>
  )
}

function AppGrid() {
  const classes = useStyles();

  const initialMargin = 100;
  const [marginParallax, setMarginParallax] = useState(initialMargin);
  const [opacityHeaderBg, setOpacityHeaderBg] = useState(0);

  // -------------------------
  const handlerMarginParallax = useCallback(
    ({e}) => {

      var relativeOpacity;
      var relativeMargin;
      var relativeScroll = window.innerHeight - window.scrollY;
      var multiplier = 2;

      if (relativeScroll > 0) {
        relativeMargin = (1 - relativeScroll / window.innerHeight) * multiplier;
      } else {
        relativeMargin = multiplier;
      }

      if (relativeMargin >= 1) {
        relativeMargin = 1;
      }

      relativeOpacity = 1 * relativeMargin;
      if (relativeOpacity >= 1) {
        relativeOpacity = 1;
      }


      setMarginParallax(initialMargin * (1 + relativeMargin));
      setOpacityHeaderBg(relativeOpacity);

    },
    [marginParallax, opacityHeaderBg]
  );

  useEventListener('scroll', handlerMarginParallax)
  // -------------------------

  const categories = [
    {
      title: 'Натуральный мед',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
    {
      title: 'Медовая паста',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
    {
      title: 'Мед со специями',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
    {
      title: 'Пчелиные полезности',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
    {
      title: 'Медовые соты',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
    {
      title: 'Сувениры',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.`
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

        <Header opacityHeaderBg={opacityHeaderBg} classes={classes} />

        <Slider slides={images} />

        <Grid container component="main">
          <Grid item xs={9}>
            <Paper className="section-main" elevation={3}
              css={css`
                margin-top: -${marginParallax}px;
              `}>

              <BlocksUnderSlider />


              {categories.map((category, index) => { return (
              <Paper className="categories-hompage" elevation={5}>
                <Grid container>
                    <Grid key={index} item xs={6} className="categories-hompage__category">
                      <Card elevation={0} square>
                        <CardContent className="categories-hompage__category__info">
                          <Typography component="h2" variant="h5">
                            <Fade left cascade>
                              {category.title}
                            </Fade>
                          </Typography>
                          <Typography variant="body2">
                            {category.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                </Grid>
              </Paper>
            )})}


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
