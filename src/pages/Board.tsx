import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState } from "react";
import CardGrid from "../components/CardGrid";
import SimpleModal from "../components/Modal";
import { Page } from "../Types";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "white",
  },
}));

interface BoardProps {
  setPage: (page: Page) => void;
}

function Board(props: BoardProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const incrementMoves = () => {
    setMoves((m) => m + 1);
  };

  return (
    <div>
      <h2 className={classes.header}>Moves: {moves}</h2>
      <CardGrid handleOpen={handleOpen} incrementMoves={incrementMoves} />
      <SimpleModal
        open={open}
        moves={moves}
        handleClose={handleClose}
        setPage={props.setPage}
      />
    </div>
  );
}

export default Board;
