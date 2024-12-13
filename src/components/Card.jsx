import React from 'react';

const Card = ({ value, onCardClick, visible, paired, unpaired }) => {
  return (
    <button
      className={`square ${paired && "paired"} ${unpaired && "unpaired"}`}
      onClick={onCardClick}
    >
      {visible && value}
    </button>
  );
};

export default Card;