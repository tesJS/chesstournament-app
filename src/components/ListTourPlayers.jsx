import cloneDeep from "clone-deep";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";


const ListTourPlayers = (props) => {
  const httpErrorMessage = useSelector((state) => state.http.httpErrorMessage);
  let players = useSelector((state) => state.tournament.players);
  let listHtml, playersList;

  players = cloneDeep(players);

  if (players.length) {
    players.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });

    playersList = players.map((el) => {
      return (
        <div key={el.id} className="list">
          {el.name} {el.elo} {el.club} {el.score}          
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
    <div className="lp-main">
      <span>List of Players</span>
      <div style={{ marginBottom: 25 }}>{}</div>
      {players.length ? playersList : listHtml}
    </div>
  );
};
export default ListTourPlayers;
