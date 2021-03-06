import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import { useScores } from "../contexts/HighscoreContext";
import { Page } from "../Types";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.info.light,
  },
  button: {
    backgroundColor: theme.palette.success.light,
  },
}));

interface HighScoreProps {
  setPage: (page: Page) => void;
}

export default function Highscore(props: HighScoreProps) {
  const classes = useStyles();
  const scoreContext = useScores();

  return (
    <div className={classes.paper}>
      <h2>Highscores</h2>
      <table>
        <tr>
          <th>Placement</th>
          <th>Name</th>
          <th>Moves</th>
        </tr>
        {scoreContext.scores.map(({ name, moves }, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{moves}</td>
          </tr>
        ))}
      </table>

      <Button
        variant="contained"
        onClick={() => props.setPage(Page.Board)}
        endIcon={<ReplayIcon />}
      >
        Try again
      </Button>
    </div>
  );
}
