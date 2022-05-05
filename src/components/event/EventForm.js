import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getGames } from "../game/GameManager";
import { createEvent } from "./EventManager";

export const EventForm = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [newEvent, setNewEvent] = useState({
    game_id: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const changeEventState = (domEvent) => {
    const newEventObject = Object.assign({}, newEvent);
    newEventObject[domEvent.target.name] = domEvent.target.value;
    setNewEvent(newEventObject);
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={newEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Game Date: </label>
          <input
            type="text"
            name="date"
            required
            className="form-control"
            value={newEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input
            type="text"
            name="time"
            required
            className="form-control"
            value={newEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <select
            name="game_id"
            required
            className="form-control"
            value={newEvent.game_id}
            placeholder="Select Game Type..."
            onChange={changeEventState}
          >
            <option value="0">Choose a Game!</option>
            {games.map((game, index) => {
              return (
                <option key={index} value={game.id} name="game_id">
                  {game.title}
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

          const event = {
            game: parseInt(newEvent.game_id),
            description: newEvent.description,
            date: newEvent.date,
            time: newEvent.time,
          };

          // Send POST request to your API
          createEvent(event).then(() => history.push("/events"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
