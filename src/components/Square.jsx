import React from 'react';

const Square = ({ value, onSquareClick, isWinner }) => {
  return (
    <button
      className={`square ${isWinner ? "winner" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

export default Square;