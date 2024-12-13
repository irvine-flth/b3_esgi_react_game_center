import {useEffect, useReducer, useState} from "react";
import Card from "../components/Card.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ScoresTable from "../components/ScoresTable.jsx";
import {useGameContext} from "../providers/GameProvider.jsx";
import button from "bootstrap/js/src/button.js";

function shuffle(array) {
  let shuffledArray = [];

  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  shuffledArray = array;
  return shuffledArray;
}

const initialState = (initialArray) => ({
  cards: shuffle([...initialArray]),
  revealed: Array(initialArray.length).fill(false),
  pairedIndices: [],
  unpairedIndices: [],
  firstStep: null,
  secondStep: null,
  counter: 0,
  internalCounter: 0,
  gameOver: false,
  winned: false
});

function gameReducer(state, action) {
  switch (action.type) {
    case "REVEAL_CARD":
      const newRevealed = [...state.revealed];
      newRevealed[action.index] = true;
      return {
        ...state,
        revealed: newRevealed,
        firstStep: state.firstStep === null ? action.index : state.firstStep,
        secondStep: state.firstStep !== null ? action.index : state.secondStep,
        internalCounter: state.internalCounter + 1,
      };

    case "PAIR_CARDS":
      return {
        ...state,
        pairedIndices: [...state.pairedIndices, state.firstStep, state.secondStep],
        firstStep: null,
        secondStep: null,
        counter: state.counter + 1,
      };

    case "UNPAIR_CARDS":
      const updatedRevealed = [...state.revealed];
      updatedRevealed[state.firstStep] = false;
      updatedRevealed[state.secondStep] = false;

      return {
        ...state,
        revealed: updatedRevealed,
        unpairedIndices: [],
        firstStep: null,
        secondStep: null,
        counter: state.counter + 1,
      };

    case "CHECK_GAME_OVER":
      if (state.revealed.every((val) => val === true)) {
        return { ...state, winned: true, gameOver: true };
      }
      return state;

    case "RESET_GAME":
      return initialState(action.initialArray);

    case "CLEAR_UNPAIRED":
      return {
        ...state,
        unpairedIndices: [],
      };

    default:
      return state;
  }
}

export default function MemoryGamePage() {
  const navigate = useNavigate();

  const initialArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [state, dispatch] = useReducer(gameReducer, initialArray, initialState);

  const { mode, players, scores, setScores } = useGameContext();

  if (currentPlayer === null) {
    setCurrentPlayer(players[0]);
  }

  useEffect(() => {
    if (!mode || mode === '' || mode === 'null') {
      navigate('/');
    }
  }, [])


  const {
    cards,
    revealed,
    pairedIndices,
    unpairedIndices,
    firstStep,
    secondStep,
    counter,
    internalCounter,
    gameOver,
    winned,
  } = state;

  useEffect(() => {
    if (secondStep !== null) {
      const timer = setTimeout(() => {
        if (cards[firstStep] === cards[secondStep]) {
          dispatch({ type: "PAIR_CARDS" });
        } else {
          dispatch({ type: "UNPAIR_CARDS" });
        }
        dispatch({ type: "CHECK_GAME_OVER" });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [secondStep]);

  const handleClick = (index) => {
    if (revealed[index] || secondStep !== null) return;
    dispatch({ type: "REVEAL_CARD", index });
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME", initialArray });
  };

  useEffect(() => {
    if (winned) {
      setScores((prevScores) => {
        const newScores = { ...prevScores };
        const game = "MemoryGame";

        if (!newScores[game]) {
          newScores[game] = {};
        }

        if (!newScores[game][currentPlayer]) {
          newScores[game][currentPlayer] = counter;
        }
        if (newScores[game][currentPlayer] > counter)
        newScores[game][currentPlayer] = counter;

        return newScores;
      });
    }
  }, [gameOver]);

  return (
    <div className="container">
      <div className="d-flex align-items-center gap-3">
        <h1>MemoryGame</h1>
        <Link className="btn btn-secondary" to='/home'>
          Accueil
        </Link>
        {players.map((player, index) => (
          <button
            key={index}
            className={`btn ${currentPlayer === player ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => {
              setCurrentPlayer(player);
              resetGame();
            }}
          >
            {player}
          </button>
        ))}
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-12">
          <div className="game">
            <div className="game-board">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="board-row">
                  {[0, 1, 2, 3].map((col) => {
                    const index = row * 4 + col;
                    return (
                      <Card
                        key={index}
                        value={cards[index]}
                        onCardClick={() => handleClick(index)}
                        visible={revealed[index]}
                        paired={pairedIndices.includes(index)}
                        unpaired={unpairedIndices.includes(index)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="game-info">
              {counter}
              <button className="btn btn-secondary" onClick={resetGame}>Reset</button>
            </div>
            {gameOver && (
              <div className="game-over-message">
                Bravo ! Vous avez réussi en {counter} coups
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6 col-sm-12 col-12">
          <ScoresTable game='memorygame' players={players} scores={scores} />
        </div>
      </div>
    </div>
  );
}
