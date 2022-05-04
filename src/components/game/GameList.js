import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getGames } from "./GameManager.js";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, []);

  return (
    <article className="games">
      <header>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/games/new" });
          }}
        >
          Register New Game
        </button>
      </header>
      <ul>
        {games.map((game) => {
          return (
            <li>
              <section key={`game--${game.id}`} className="game">
                <div className="game__title">
                  {game.title} by {game.maker}
                </div>
                <div className="game__players">
                  {game.number_of_players} players needed
                </div>
                <div className="game__skillLevel">
                  Skill level is {game.skill_level}
                </div>
              </section>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
