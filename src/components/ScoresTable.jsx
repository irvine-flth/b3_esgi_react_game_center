import React from 'react';

const ScoresTable = ({ players, scores, game }) => {
  if (!scores || !scores.TicTacToe || !scores.MemoryGame) {
    return <p>Scores not available</p>;
  }
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th></th>
          {players.map((player, i) => (
            <th key={i}>
              {player}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(game === 'all' || game === 'tictactoe') && (
          <tr>
            <td>TicTacToe</td>
            {players.map((player, i) => (
              <td key={i}>
                {scores.TicTacToe[player] || 0}
              </td>
            ))}
          </tr>
        )}
        {(game === 'all' || game === 'memorygame') && (
          <tr>
            <td>MemoryGame</td>
            {players.map((player, i) => (
              <td key={i}>
                Nombre de coups maximum : {scores.MemoryGame[player] || 0}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScoresTable;