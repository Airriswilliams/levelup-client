import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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
      <h2>Game List</h2>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Players Needed</th>
            <th>Skill Level</th>
          </tr>
        </thead>

        {games.map((game) => {
          return (
            <tbody key={`game--${game.id}`} className="game">
              <tr>
                <td className="game__title">
                  {game.title} by {game.maker}
                </td>
                <td className="game__players">{game.number_of_players}</td>
                <td className="game__skillLevel">{game.skill_level}</td>
                <td>
                  <Link to={`/edit/${game.id}`}>Edit</Link>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </article>
  );
};
