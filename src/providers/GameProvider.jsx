import {createContext, useContext, useEffect, useReducer, useState} from "react";

const GameContext = createContext();

export const GameProvider = ({children}) => {
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem("players")) || []);
  const [scores, setScores] = useState(() => {
    const storedScores = JSON.parse(localStorage.getItem("scores"));
    return storedScores && storedScores.TicTacToe && storedScores.MemoryGame
      ? storedScores
      : { TicTacToe: {}, MemoryGame: {} };
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return (
    <GameContext.Provider value={{ mode, setMode, players, setPlayers, scores, setScores }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext);