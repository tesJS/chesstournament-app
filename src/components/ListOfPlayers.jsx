import cloneDeep from "clone-deep";
import React from "react";
import { useSelector } from "react-redux";
import "./ListPlayers.css";

const ListPlayers = (props) => {
  const httpErrorMessage = useSelector((state) => state.http.httpErrorMessage);
  let players = useSelector((state) => state.tournament.players);
  let listHtml, playersList;

  console.log("In ListPlayers Section. Players List: ");
  console.log(players);
  players = cloneDeep(players);

  if (players.length) {
    players.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });

    playersList = players.map((el) => {
      return (
        <div className="list" key={el.id}>
          {el.name} {el.elo} {el.club} {el.score} {el.whiteTurns}w
        </div>
      );
    });
  } else {
    listHtml = (
      <p
        style={{
          color: "red",
          fontWeight: "bold",
        }}
      >
        {httpErrorMessage}
      </p>
    );
  }
  return (
    <div>
      <span>List of Players</span>
      <div style={{ marginBottom: 25 }}></div>
      {players.length ? playersList : listHtml}
    </div>
  );
};
export default ListPlayers;
