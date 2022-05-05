import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getEvents } from "./EventManager";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <header>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/events/new" });
          }}
        >
          Register New Event
        </button>
      </header>
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`} className="event">
            <div className="event__date_time">
              Come out and Join the Fun on {event.date} at {event.time}
            </div>
            <div className="event__description_game">
              {event.description} and play {event.game.title}
            </div>
            <div className="event__organizer">
              Hosted by {event.organizer.id}
            </div>
          </section>
        );
      })}
    </article>
  );
};
