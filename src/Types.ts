import React from "react";

export enum Page {
  Board,
  HighScore,
  Welcome,
}

export enum CardState {
  Back,
  Front,
  Completed,
}

export interface CardInfo {
  index: number;
  cardState: CardState;
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export interface Score {
  name: string;
  moves: number;
}
