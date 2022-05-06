import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { EventList } from "./event/EventList.js";
import { GameForm } from "./game/GameForm.js";
import { GameEdit } from "./game/UpdateGame.js";
import { EventForm } from "./event/EventForm.js";
import { EventEdit } from "./event/UpdateEvent.js";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <Route exact path="/">
          <GameList />
        </Route>

        <Route exact path="/games">
          <GameList />
        </Route>

        <Route exact path="/games/new">
          <GameForm />
        </Route>

        <Route exact path="/edit/:gameId(\d+)">
          <GameEdit />
        </Route>

        <Route exact path="/events">
          <EventList />
        </Route>

        <Route exact path="/events/new">
          <EventForm />
        </Route>

        <Route exact path="/edit/:eventId(\d+)">
          <EventEdit />
        </Route>
      </main>
    </>
  );
};
