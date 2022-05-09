import React, { useEffect, useState } from "react";
import { icons } from "react-icons";
import { useHistory, Link } from "react-router-dom";
import { getEvents, deleteEvent, joinEvent, leaveEvent } from "./EventManager";
import { FaEdit } from "react-icons/fa";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  const deleteHandler = (id) => {
    deleteEvent(id)
      .then(getEvents)
      .then((data) => setEvents(data));
  };

  const joinButton = (id) => {
    return (
      <button
        onClick={() =>
          joinEvent(id)
            .then(getEvents)
            .then((data) => setEvents(data))
        }
      >
        Join Event
      </button>
    );
  };

  const leaveButton = (id) => {
    return (
      <button
        onClick={() =>
          leaveEvent(id)
            .then(getEvents)
            .then((data) => setEvents(data))
        }
      >
        Leave Event
      </button>
    );
  };

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
            <tbody>
              <tr>
                <td>
                  {/* use "joined" property on each event to display a join button or leave button on each */}
                  {event.joined ? leaveButton(event.id) : joinButton(event.id)}
                </td>
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
                  <Link to={`/events/${event.id}`}>Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteHandler(event.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </article>
  );
};
