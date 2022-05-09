import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editEvent, getSingleEvent } from "./EventManager";
import { getGames } from "../game/GameManager";

export const EventEdit = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);

  // get original event with original data
  const [currentEvent, setCurrentEvent] = useState({});
  const eventId = useParams();
  // get single event
  useEffect(() => {
    getSingleEvent(eventId.eventId).then((data) => setCurrentEvent(data));
  }, []);

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  const changeEventState = (domEvent) => {
    const newEvent = Object.assign({}, currentEvent);
    newEvent[domEvent.target.name] = domEvent.target.value;
    setCurrentEvent(newEvent);
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Edit Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
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
            value={currentEvent.date}
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
            value={currentEvent.time}
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
            value={currentEvent.game_id}
            placeholder="Select Game Type..."
            onChange={changeEventState}
          >
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
            game: parseInt(currentEvent.game_id),
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
          };

          // Send POST request to your API
          editEvent(event).then(() => history.push(`/events`));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
