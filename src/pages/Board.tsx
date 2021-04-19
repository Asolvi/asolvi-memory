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

function Board() {
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
      <SimpleModal open={open} moves={moves} handleClose={handleClose} />
    </div>
  );
}

export default Board;
