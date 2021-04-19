import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Page } from "../Types";
import { useScores } from "../contexts/HighscoreContext";
import { updateAppPage } from "../redux/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[6],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.success.main,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "15px",
  },
  textField: {
    backgroundColor: "white",
    width: "210px",
  },
  helperText: {
    color: "#800000",
  },
}));

interface SimpleModalProps {
  handleClose: () => void;
  open: boolean;
  moves: number;
}

export default function SimpleModal(props: SimpleModalProps) {
  const classes = useStyles();
  const scoreContext = useScores();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [helperText, setHelperText] = useState("");

  const submitScore = () => {
    if (name === "") {
      setHelperText("Please provide a name");
    } else {
      scoreContext.addHighscore(name, props.moves);
      dispatch(updateAppPage(Page.HighScore));
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        className={classes.modal}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="simple-modal-title">Congratulations</h2>
          <p id="simple-modal-description">You completed the board!</p>
          <TextField
            id="player-name"
            label="Name"
            variant="filled"
            className={classes.textField}
            onChange={(e) => {
              setHelperText("");
              setName(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submitScore}
          >
            Submit
          </Button>
          <p className={classes.helperText}>{helperText}</p>
        </div>
      </Modal>
    </div>
  );
}
