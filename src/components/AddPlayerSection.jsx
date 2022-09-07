import React from "react";
import "./Add-player-form.css";
import SelectPlayers from "./SelectPlayers";
import { useSelector } from "react-redux";
import Player from "./PlayerC";

const AddPlayerSection = (props) => {
  let players = useSelector((state) => state.tournament.players);
  let selectedPlayers = [];

  selectedPlayers = players.map((el) => {
    return (
      <div className="list" key={el.id}>
        <Player
          key={el.id}
          id={el.id}
          name={el.name}
          elo={el.elo}
          club={el.club}
          parent="SelectedPlayersList"
        ></Player>
      </div>
    );
  });
  const submit = (event) => {
    props.submit(event);
  };
  return (
    <div className="main-section-addplayer">
      <div className=" items">
        <h3> Add Players</h3>
        <form onSubmit={submit}>
          <label htmlFor="name">Name*</label>
          <br />
          <input type="text" id="name" name="Name" placeholder="Your name..." />
          <br />
          <label>Elo-rating*</label>
          <br />
          <input
            id="eloRating"
            type="text"
            name="EloRating"
            placeholder="Your elo rating.."
          />
          <br />
          <label>Club</label>
          <br />
          <input
            id="club"
            type="text"
            name="Club"
            placeholder="Your chess club.."
          />
          <br />

          <input className="postButton" type="submit" name="Submit" />

          <br />
        </form>
      </div>
      <div className="items">
        <SelectPlayers />
      </div>
      <div>
        <p className="selected-title">Players Selected For This Tournament</p>
        {selectedPlayers}
      </div>
    </div>
  );
};
export default AddPlayerSection;
