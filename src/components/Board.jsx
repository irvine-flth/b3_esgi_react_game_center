import React, {useEffect, useState} from 'react';
import Square from "./Square.jsx";

function getWinnerSquares(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ xIsNext, squares, onPlay, players, setScores, mode }) => {
  const [winnerRecorded, setWinnerRecorded] = useState(false);
  const [winner, setWinner] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winnerSquares = getWinnerSquares(squares);

  useEffect(() => {
    if (winnerSquares && !winnerRecorded) {
      const winnerSymbol = squares[winnerSquares[0]];
      const winningPlayer = winnerSymbol === "X" ? players[0] : (mode === "multiplayer" ? players[1] : "O");

      if (winningPlayer) {
        setWinnerRecorded(true);

        setScores((prevScores) => {
          const newScores = { ...prevScores };

          const game = "TicTacToe";


          if (!newScores[game]) {
            newScores[game] = {};
          }

          if (!newScores[game][winningPlayer]) {
            newScores[game][winningPlayer] = 0;
          }

          newScores[game][winningPlayer] += 1;
          return newScores;
        });

        setWinner(winningPlayer);
      }
    }
  }, [winnerSquares, winnerRecorded, players, mode, squares, setScores]);


  let status;

  if (winnerSquares) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? players[0] : (mode === "multiplayer" ? players[1] : "O")}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                key={index}
                isWinner={winnerSquares?.includes(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;