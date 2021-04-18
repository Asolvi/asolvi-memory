import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Grid, makeStyles } from "@material-ui/core";
import { generateSet, numberLists } from "../helpers/helpers";
import { CardInfo, CardState } from "../Types";

const useStyles = makeStyles({
  card: {
    height: "150px",
    width: "150px",
    backgroundColor: "white",
  },
  cardContainer: {
    width: "656px",
    margin: "auto",
  },
});

const createCardStateList = (imageList: React.FunctionComponent[]) =>
  Array.from(Array(16).keys()).map((index) => ({
    index: index,
    cardState: CardState.Back,
    image: imageList[index],
  }));

interface CardGridProps {
  handleOpen: () => void;
  incrementMoves: () => void;
}

export default function CardGrid(props: CardGridProps) {
  const classes = useStyles();
  const [images, setImages] = useState<CardInfo[]>(
    createCardStateList(generateSet())
  );
  const [firstClicked, setFirstClicked] = useState<CardInfo>();
  const [secondClicked, setSecondClicked] = useState<CardInfo>();
  const [countComplete, setCountComplete] = useState(0);

  const editCardState = (index: number, cardState: CardState) => {
    const imagesCopy = [...images];
    imagesCopy[index].cardState = cardState;
    return imagesCopy;
  };

  useEffect(() => {
    const checkCards = async () => {
      if (firstClicked?.image === secondClicked?.image) {
        setImages(editCardState(firstClicked!.index, CardState.Completed));
        setImages(editCardState(secondClicked!.index, CardState.Completed));
        setCountComplete((count) => count + 1);
        if (countComplete === 7) {
          props.handleOpen();
        }
      } else {
        await new Promise((r) => setTimeout(r, 500));
        setImages(editCardState(firstClicked!.index, CardState.Back));
        setImages(editCardState(secondClicked!.index, CardState.Back));
      }

      setFirstClicked(undefined);
      setSecondClicked(undefined);
    };

    if (firstClicked !== undefined && secondClicked !== undefined) {
      console.log("checkCards() ran");
      checkCards();
    }
  }, [firstClicked, secondClicked]);

  const registerClick = (cardInfo: CardInfo) => {
    if (firstClicked === undefined) {
      setImages(editCardState(cardInfo.index, CardState.Front));
      setFirstClicked(cardInfo);
    } else if (secondClicked === undefined) {
      setImages(editCardState(cardInfo.index, CardState.Front));
      setSecondClicked(cardInfo);
      props.incrementMoves();

      if (firstClicked?.index === cardInfo.index) {
        setImages(editCardState(cardInfo.index, CardState.Back));
        setFirstClicked(undefined);
        setSecondClicked(undefined);
      }
    }
  };

  return (
    <Grid container spacing={1} className={classes.cardContainer}>
      {numberLists.map((list, i) => (
        <Grid key={i} container item spacing={2}>
          {list.map((index) => (
            <Grid key={index} item>
              <Card
                className={classes.card}
                cardInfo={images[index]}
                registerClick={registerClick}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
