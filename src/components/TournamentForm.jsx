import cloneDeep from "clone-deep";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TournamentService from "../data/TournamentService";
import "../Main.css";
import { httpActions } from "../store/httpReducer";
import { tournamentActions } from "../store/tournamentReducer";

const TourForm = (props) => {
  const state = useSelector((state) => state.tournament);
  const dispatch = useDispatch();
  let tourdetailsField = useRef();
  let noplayersField = useRef();
  let noroundsField = useRef();
  let touridField = useRef();
  let touridLabel = useRef();
  let [errorMessage, setErrorMessage] = useState("");

  const submitTourHandler = (event) => {
    event.preventDefault();
    let tourForm = {};

    let username = state.username;
    let noplayers = cloneDeep(parseInt(noplayersField.current.value));
    let tourdetails = cloneDeep(tourdetailsField.current.value);
    let norounds = cloneDeep(noroundsField.current.value);
    let tourid = cloneDeep(touridField.current.value);

    if (tourid !== "" && norounds !== "") {
      tourForm = {
        noplayers,
        tourdetails,
        norounds,
        tourid,
        username,
      };

      TournamentService.checkTourId(tourid)
        .then((result) => {
          if (result) {
            tourdetailsField.current.value = "";
            noplayersField.current.value = "";
            noroundsField.current.value = "";
            touridField.current.value = "";
            dispatch(tournamentActions.addTournamentForm(tourForm));
          } else {
            console.log(" After TournamentService.checkTourId failed:");
            setErrorMessage(" Not Unique tourid!!! ");
          }
        })
        .catch((error) => {
          dispatch(httpActions.displayError(error.message));
        });
    } else {
      setErrorMessage("Tournament's id and number of rounds are required!");
    }
  };
  return (
    <div className="form-container">
      <h3> Tournament Form</h3>

      <form onSubmit={submitTourHandler}>
        <label>Tournament Description*</label>
        <br />
        <input
          ref={tourdetailsField}
          id="tournamentDesc"
          type="text"
          name="tournamentDesc"
          placeholder="Description.."
        />
        <br />

        <label>Number of Players</label>
        <br />
        <input
          ref={noplayersField}
          id="noplayers"
          type="text"
          name="Club"
          placeholder="Total players number..."
        />
        <br />

        <label>Number of Rounds</label>
        <br />
        <input
          ref={noroundsField}
          id="rounds"
          type="text"
          name="rounds"
          placeholder="Total number of rounds..."
        />
        <br />

        <label>Tournament ID</label>
        <br />
        <input
          ref={touridField}
          id="tourid"
          type="text"
          name="tourid"
          placeholder="Tournament ID..."
        />
        <label ref={touridLabel} id="tourForm-touridLabel">
          {" "}
          {errorMessage}{" "}
        </label>
        <br />

        <input className="postButton" type="submit" name="Submit" />

        <br />
      </form>
    </div>
  );
};

export default TourForm;
