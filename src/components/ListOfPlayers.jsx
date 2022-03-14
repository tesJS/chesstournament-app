import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ListPlayers.css";

const ListPlayers = (props) => {
  const httpError = useSelector((state) => state.http.httpError);
  const httpErrorMessage = useSelector((state) => state.http.httpErrorMessage);
  const players = useSelector((state) => state.tournament.players);
  const submitButton = useSelector(
    (state) => state.tournament.submitResultButtonClicked
  );
  let listHtml, playersList;

  const [plrs, setPlrs] = useState(players);

  useEffect(() => {
    setPlrs(players);
  }, [players, submitButton]);

  if (players.length) {
    console.log("In ListPlayers Section. Players List: ");
    console.log(players);
    let sortedPlayersByScore = [...plrs];

    sortedPlayersByScore.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });

    playersList = sortedPlayersByScore.map((el) => {
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
