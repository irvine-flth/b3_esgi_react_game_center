import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useGameContext} from "../providers/GameProvider.jsx";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { setMode, setPlayers } = useGameContext();
  const [localMode, setLocalMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let players = [];
    if (localMode === 'multiplayer') {
      let player1 = e.target.elements.player1.value;
      let player2 = e.target.elements.player2.value;

      players = [player1, player2];
    } else {
      players = ['Solo Player'];
    }

    setMode(localMode);
    setPlayers(players);

    navigate('/home');
  }

  return (
    <div className="container">
      <h1>Bienvenue sur le Game Center !</h1>

      <form onSubmit={handleSubmit}>
        <fieldset className="border border-2 p-3">
          <legend>Paramètres</legend>
          <div className="mb-3 row">
            <div className="col-md-2">
              <input type="radio" id="solo" onClick={() => setLocalMode('solo')} name="mode" value="solo"/>
              <label htmlFor="solo">Solo</label>
            </div>

            <div className="col-md-2">
              <input type="radio" id="multiplayer" onClick={() => setLocalMode('multiplayer')} name="mode"
                     value="multiplayer"/>
              <label htmlFor="multiplayer">Multijoueur</label>
            </div>
          </div>
          {localMode === 'multiplayer' && (
            <div className="mb-3 row">
              <div className="col-md-3">
                <label htmlFor="player1" className="form-label">Joueur 1</label>
                <input required type="text" name="player1" id="player1" placeholder="Nom du joueur 1" className="form-control"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="player2" className="form-label">Joueur 2</label>
                <input required type="text" name="player2" id="player2" placeholder="Nom du joueur 2" className="form-control"/>
              </div>
            </div>
          )}
          <div className="mb-3">
            <button className="btn btn-success">Commencer</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default WelcomePage;