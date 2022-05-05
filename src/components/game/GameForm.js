import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createGame, getGameTypes } from "./GameManager.js";

export const GameForm = () => {
  const history = useHistory();
  const [gameTypes, setGameTypes] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skill_level: 1,
    number_of_players: 0,
    title: "",
    maker: "",
    game_type_id: 0,
  });

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
  }, []);

  // Object.assign copies all properties from one source object to a target object and returns the modified target object.
  // Object.assign adds new properties to an existing object
  // A way to do a shallow copy of an Object or merge multiple objects
  // Object.assign({}, currentGame)...we have an empty object{}, then anything we place after the empty Object, the
  // properties and values from "currentGame" are going to be put inside the empty Object{}
  const changeGameState = (domEvent) => {
    const newGame = Object.assign({}, currentGame);
    newGame[domEvent.target.name] = domEvent.target.value;
    setCurrentGame(newGame);
  };
  // Ln 45 onchange(is a change event) is saying do something, onchange is a listener, you are instructing it to call changeGameState
  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Players: </label>
          <input
            type="number"
            name="number_of_players"
            required
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level: </label>
          <input
            type="number"
            name="skill_level"
            required
            className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <select
            name="game_type_id"
            required
            className="form-control"
            value={currentGame.game_type_id}
            placeholder="Select Game Type..."
            onChange={changeGameState}
          >
            <option value="0">Choose Type...</option>
            {gameTypes.map((type, index) => {
              return (
                <option key={index} value={type.id} name="game_type_id">
                  {type.label}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: parseInt(currentGame.skill_level),
            game_type: parseInt(currentGame.game_type_id),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
