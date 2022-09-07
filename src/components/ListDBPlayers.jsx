import { useSelector } from "react-redux";
import cloneDeep from "clone-deep";
import Player from "./PlayerC";

function ListDBPlayers(props) {
  const httpErrorMessage = useSelector((state) => state.http.httpErrorMessage);
  let players = useSelector((state) => state.tournament.dbPlayers);
  let listHtml, playersList;

  players = cloneDeep(players);

  if (players.length) {
    players.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });

    playersList = players.map((el) => {
      return (
        <div className="list" key={el.id}>
          <Player
            key={el.id}
            id={el.id}
            name={el.name}
            elo={el.elo}
            club={el.club}
            parent="DBPlayersList"
          ></Player>
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
}

export default ListDBPlayers;
