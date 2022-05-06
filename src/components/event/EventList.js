import React, { useEffect, useState } from "react";
import { icons } from "react-icons";
import { useHistory, Link } from "react-router-dom";
import { getEvents } from "./EventManager";
import { FaEdit } from "react-icons/fa";

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
          <table key={`event--${event.id}`} className="event">
            <tr>
              <td className="event__date_time">
                Come out and Join the Fun on {event.date} at {event.time}
              </td>
              <td className="event__description_game">
                {event.description} and play {event.game.title}
              </td>
              <td className="event__organizer">
                Hosted by {event.organizer.user.username}
              </td>
              <td>
                <Link to={`/edit/${event.id}`}>Edit</Link>
              </td>
            </tr>
          </table>
        );
      })}
    </article>
  );
};
