import React from "react";
import { ReactComponent as CardBack } from "../images/card.svg";
import { CardInfo, CardState } from "../Types";

interface CardProps {
  className: string;
  registerClick: (cardInfo: CardInfo) => void;
  cardInfo: CardInfo;
}

export default function Card(props: CardProps) {
  switch (props.cardInfo.cardState) {
    case CardState.Back:
      return (
        <CardBack
          onClick={() => props.registerClick(props.cardInfo)}
          className={props.className}
        />
      );

    case CardState.Front:
      return (
        <props.cardInfo.image
          onClick={() => props.registerClick(props.cardInfo)}
          className={props.className}
        />
      );

    default:
      return <props.cardInfo.image className={props.className} />;
  }
}
