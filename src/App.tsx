import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "./App.css";
import { HighscoreProvider } from "./contexts/HighscoreContext";
import Board from "./pages/Board";
import Highscore from "./pages/Highscores";
import { Page } from "./Types";

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

class App extends React.Component {
  state = {
    currentPage: Page.Welcome,
  };

  setCurrentPage = (page: Page) => {
    this.setState({
      currentPage: page,
    });
  };

  componentDidMount() {
    this.updateDocumentTitle();
    setTimeout(() => {
      this.setCurrentPage(Page.Board);
    }, 3000);
  }

  componentDidUpdate(_: any, prevState: { currentPage: Page }) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.updateDocumentTitle();
    }
  }

  updateDocumentTitle() {
    const { currentPage } = this.state;
    document.title = getTitle(currentPage);
  }

  getPage = (page: Page) => {
    switch (page) {
      case Page.Board:
        return <Board setPage={this.setCurrentPage} />;
      case Page.HighScore:
        return <Highscore setPage={this.setCurrentPage} />;
      default:
        return <Welcome />;
    }
  };

  render() {
    return (
      <HighscoreProvider>
        <div className="App">{this.getPage(this.state.currentPage)}</div>
      </HighscoreProvider>
    );
  }
}

export default App;
