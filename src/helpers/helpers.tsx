import React from "react";
import { ReactComponent as Bee } from "../images/bee.svg";
import { ReactComponent as Asolvi } from "../images/asolvi.svg";
import { ReactComponent as Octopus } from "../images/octopus.svg";
import { ReactComponent as Fish } from "../images/fish.svg";
import { ReactComponent as Flower } from "../images/flower.svg";
import { ReactComponent as Blossoms } from "../images/blossoms.svg";
import { ReactComponent as LadyBug } from "../images/ladybug.svg";
import { ReactComponent as Computer } from "../images/computer.svg";

export const numberLists = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];

const shuffleArray = (array: React.FunctionComponent[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const artList = [
  Bee,
  Asolvi,
  Octopus,
  Fish,
  Flower,
  Blossoms,
  LadyBug,
  Computer,
];

const halfSet = () => {
  const images = artList.slice();
  shuffleArray(images);
  return images;
};

export const generateSet = () => {
  return halfSet().concat(halfSet());
};
