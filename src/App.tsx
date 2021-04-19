import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import { HighscoreProvider } from "./contexts/HighscoreContext";
import Board from "./pages/Board";
import Highscore from "./pages/Highscores";
import { Page } from "./Types";
import { updateAppPage } from "./redux/actions";
import { RootState } from "./redux/reducers";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.info.main,
  },
  subheader: {
    color: theme.palette.info.light,
  },
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.header} variant="h2">
        Welcome to Asolvi Memory!
      </Typography>
      <Typography className={classes.subheader} variant="h3">
        Do you have what it takes to beat the highscore?
      </Typography>
    </div>
  );
};

const getTitle = (page: Page) => {
  switch (page) {
    case Page.Board:
      return "Let's go!";
    case Page.HighScore:
      return "Do you see your name?";
    default:
      return "Welcome";
  }
};

const App: React.FC<PropsFromRedux> = (props) => {
  useEffect(() => {
    document.title = getTitle(props.currentPage);
  }, [props.currentPage]);

  useEffect(() => {
    setTimeout(() => {
      props.updateAppPage(Page.Board);
    }, 3000);
  }, []);

  const getPage = (page: Page) => {
    switch (page) {
      case Page.Board:
        return <Board />;
      case Page.HighScore:
        return <Highscore />;
      default:
        return <Welcome />;
    }
  };

  return (
    <HighscoreProvider>
      <div className="App">{getPage(props.currentPage)}</div>
    </HighscoreProvider>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  currentPage: store.appPage,
});

const mapToDispatch = {
  updateAppPage,
};

type PropsFromRedux = ReturnType<typeof mapStateToProps> & typeof mapToDispatch;

const connector = connect(mapStateToProps, mapToDispatch);

export default connector(App);
