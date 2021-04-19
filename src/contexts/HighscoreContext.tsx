import React, { useContext, useState } from "react";
import { Score } from "../Types";

const dummyScores = [
  { name: "AAA", moves: 15 },
  { name: "AAA", moves: 20 },
  { name: "AAA", moves: 25 },
  { name: "AAA", moves: 30 },
  { name: "AAA", moves: 35 },
  { name: "AAA", moves: 40 },
  { name: "AAA", moves: 45 },
  { name: "AAA", moves: 50 },
  { name: "AAA", moves: 55 },
  { name: "AAA", moves: 60 },
  { name: "AAA", moves: 65 },
];

interface HighScoreContextType {
  scores: Score[];
  addHighscore: (name: string, moves: number) => void;
}

const HighscoreContext = React.createContext<HighScoreContextType | undefined>(
  undefined
);

interface HighScoreProviderProps {
  children: JSX.Element;
}

export const HighscoreProvider = (props: HighScoreProviderProps) => {
  const [scores, setScores] = useState(dummyScores);

  const addHighscore = (name: string, moves: number) => {
    const newScores = [...scores];
    newScores.push({ name, moves });
    newScores.sort((a, b) =>
      a.moves > b.moves
        ? 1
        : a.moves === b.moves
        ? a.moves > b.moves
          ? 1
          : -1
        : -1
    );
    setScores(newScores.slice(0, 10));
  };

  return (
    <HighscoreContext.Provider
      value={{ scores: scores, addHighscore: addHighscore }}
    >
      {props.children}
    </HighscoreContext.Provider>
  );
};

export const useScores = () => {
  const context = useContext(HighscoreContext);
  if (context === undefined) {
    throw new Error("useHighscore must be used within a HighscoreProvider");
  }
  return context;
};

export default HighscoreContext;
