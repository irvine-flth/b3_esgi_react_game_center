import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import ScoresTable from "../components/ScoresTable.jsx";
import {useGameContext} from "../providers/GameProvider.jsx";

const HomePage = () => {
  const { mode, players, scores } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'null' || mode === '' || !mode) {
      navigate('/');
    }
  }, [])

  const handleExit = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="container w-50">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Home page</h1>
        <button onClick={handleExit} className="btn btn-danger">Exit</button>
      </div>
      <div className="mt-3">
        <h3>Scoreboard</h3>
        <ScoresTable game='all' players={players} scores={scores} />
      </div>
      <div className="w-50 d-flex flex-column">
        <h3>Jeux disponibles</h3>
        <Link className="card p-3" to={{
          pathname: '/tictactoe',
          state: {
            fromHome: true
          }
        }}>TicTacToe</Link>
        <Link className="card p-3 mt-3" to={{
          pathname: '/memorygame',
          state: {
            fromHome: true
          }
        }}>MemoryGame</Link>
      </div>
    </div>
  );
};

export default HomePage;