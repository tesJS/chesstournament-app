import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerService from "../data/PlayerService";
import { httpActions } from "../store/httpReducer";
import { loadPlayers } from "../store/tournamentReducer";
import "./Add-player-form.css";
import Player from "./PlayerC";
import SelectPlayers from "./SelectPlayers";


const AddPlayerSection = (props) => {
  let players = useSelector((state) => state.tournament.players);
  let selectedPlayers = [];
  let inputName = useRef();
    let inputElo = useRef();
    let inputClub = useRef();
    const state = useSelector((state) => state.tournament);
    const dispatch = useDispatch();
    let inputUsername = state.username;

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
  const submitPlayerHandler = (event) => {
    event.preventDefault();    

    if (inputName.current.value !== "" && inputElo.current.value !== "") {
      let player = {
        name: inputName.current.value,
        elo: inputElo.current.value,
        club: inputClub.current.value,
        username: inputUsername,
      };

      PlayerService.postPlayer(player)
        .then((result) => {
          
          dispatch(loadPlayers(state.username));
        })
        .catch((error) => {
         
          dispatch(loadPlayers(state.username));
          dispatch(httpActions.displayError(error.message));
        }); // save it to database

      inputName.current.value = "";
      inputElo.current.value = "";
      inputClub.current.value = "";
    } else {
      window.alert("Player's name and elo-rating are required!");
    }
  };

  return (
    <div className="main-section-addplayer">
      <div className=" items">
        <h3> Add Players</h3>
        <form onSubmit={submitPlayerHandler}>
          <label htmlFor="name">Name*</label>
          <br />
          <input type="text" ref={inputName} id="name" name="Name" placeholder="Your name..." />
          <br />
          <label>Elo-rating*</label>
          <br />
          <input
            id="eloRating"
            type="text"
            name="EloRating"
            placeholder="Your elo rating.."
            ref={inputElo}
          />
          <br />
          <label>Club</label>
          <br />
          <input
            id="club"
            type="text"
            name="Club"
            placeholder="Your chess club.."
            ref={inputClub}
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
