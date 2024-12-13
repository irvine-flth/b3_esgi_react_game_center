import {useEffect, useState} from "react";
import ScoresTable from "../components/ScoresTable.jsx";
import {useGameContext} from "../providers/GameProvider.jsx";
import {Link, useNavigate} from "react-router-dom";
import Board from "../components/Board.jsx";

export default function TicTacToePage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [toggleSort, setToggleSort] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const { mode, players, scores, setScores } = useGameContext();

  useEffect(() => {
    if (!mode || mode === '' || mode === 'null') {
      navigate('/');
    }
  }, [])

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const pos = getPos(squares, history[move - 1]);
      description = "Go to move #" + move + " (" + pos[0] + ", " + pos[1] + ")";
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {currentMove === move ? (
          <p>You are at move #{currentMove}</p>
        ) : (
          <button className="btn btn-secondary m-2" onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (toggleSort) {
    moves = moves.reverse();
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-3">
        <h1>TicTacToe</h1>
        <Link className="btn btn-success" to='/home'>
          Accueil
        </Link>
      </div>
      <div className="row">
        <div className="col">
          <div className="game mt-4">
            <div className="game-board">
              <Board xIsNext={xIsNext} setScores={setScores} players={players} mode={mode} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
              <button className="btn btn-secondary m-2" onClick={() => setToggleSort(!toggleSort)}>Sort</button>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
        <div className="col">
          <ScoresTable players={players} scores={scores} game='tictactoe' />
        </div>
      </div>
    </div>
  );
}

function getPos(curSquares, prevSquares) {
  for (let i = 0; i < curSquares.length; i++) {
    if (curSquares[i] !== prevSquares[i]) {
      let x = Math.trunc(i/3);
      let y = i % 3;
      return [x + 1, y];
    }
  }
}