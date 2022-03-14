import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./lower-section.css";
import Pairings from "../components/Pairings";
import Round from "../data/Round";
import TournamentResult from "../data/TournamentResult";
import PlayerService from "../data/PlayerService";
import { tournamentActions } from "../store/tournamentReducer";
import cloneDeep from "clone-deep";

const LowerSection = function (props) {
  const dispatch = useDispatch();
  const tourState = useSelector((state) => state.tournament);
  const stateStoreResults = useSelector(
    (state) => state.tournament.storeResults
  );
  const httpErrorMessage = useSelector((state) => state.httpErrorMessage);

  //select option handler
  const selectHandler = (e) => {
    dispatch(tournamentActions.updateStoreResults(e));
  };

  //Save each players score to tournamentResults table in chesstourDB
  const saveButtonHandler = (players) => {
    let tourState = cloneDeep(tourState);
    let tourid = tourState.tournamentID;
    let noRounds = tourState.tournamentRounds;
    let playerid;

    //If the user enters tournament id and the minimum number of rounds played is equal or greater than the one filled in the tournament form
    if (tourid !== "" && tourState.counter >= noRounds) {
      players.forEach((el) => {
        playerid = parseInt(el.id);
        PlayerService.postTournamentResult(
          new TournamentResult(playerid, tourid, el.score.toString())
        );
      });
      PlayerService.postTournament(tourState.tournamentForm);
      resetHandler(); //and then reset the page
    } else
      alert(
        "Enter the tournament form or play the minimum no of rounds not less than the one in the tournament form!!!"
      );
  };

  //Submit Results Button after the round games list - to enter the round games result
  const roundResultHandler = () => {
    let newState = { ...tourState };
    let noPlayers = newState.players.length;
    let gamesPerRound = Math.floor(noPlayers / 2);

    if (newState.pairButtonClicked) {
      let pairButton = document.querySelector(".pairButton");
      pairButton.disabled = false;
      if (newState.storeResults.length === gamesPerRound) {
        newState.storeResults.forEach((el) => {
          selectProsessor(el);
        });
        newState.pairedList = [];
        newState.submitResultButtonClicked = true;
        newState.pairButtonClicked = false;
        newState.storeResults = [];
        dispatch(tournamentActions.update(newState));
      } else {
        window.alert("Enter all games' results!");
      }
    }
  };

  //called everytime the result selection list is called
  // used to set the players score according to the selected score value win lose or draw
  const selectProsessor = (obj) => {
    dispatch(tournamentActions.selectProsessor(obj));
  };

  const showResultHandler = () => {
    dispatch(tournamentActions.showResult());
  };

  const resetHandler = () => {
    dispatch(tournamentActions.resetHandler());
  };

  //Pair Players Buton-Handler
  const pairedHandler = () => {
    let newState = cloneDeep(tourState),
      currentRoundGames;
    newState.showResultButtonClicked = false;

    if (newState.counter === 1) {
      let firstRound = new Round(newState.players, newState.counter, null);
      currentRoundGames = firstRound.generateRoundGames();
      //newState.players = firstRound.getPlayers(); // to validate the list of players participating in the round
    } else {
      let otherRounds = new Round(
        newState.players,
        newState.counter,
        newState.currentRoundGames
      );
      currentRoundGames = otherRounds.generateRoundGames();
    }

    //if round games   generator does not return null
    if (currentRoundGames != null) {
      newState.counter++;
      newState.currentRoundGames.push(currentRoundGames);
      newState.pairButtonClicked = true;
      newState.submitResultButtonClicked = false;
      newState.pairedList = []; // clear pairedList array in case show Button is clicked before this pair button

      //store list of paired players to pairedList variable
      for (var i = 0; i < currentRoundGames.length; i++) {
        newState.pairedList.push(
          <Pairings
            key={`${currentRoundGames[i].player1.id} ${currentRoundGames[i].player2.id}`}
            player1={currentRoundGames[i].player1.name}
            player2={currentRoundGames[i].player2.name}
            players={`${currentRoundGames[i].player1.id} ${currentRoundGames[i].player2.id}`}
            selected={selectHandler}
          ></Pairings>
        );
      }
      let pairButton = document.querySelector(".pairButton");
      let saveButton = document.querySelector(".showSaveButton");
      pairButton.disabled = true;
      //if user entered tournament form and minimum number of rounds played then enable save button
      if (
        newState.counter >= newState.tournamentRounds &&
        newState.tournamentRounds !== -1
      )
        saveButton.disabled = false;
      dispatch(tournamentActions.update(newState));
    }
    //if round games   generator does return null, max round reached
    else {
      alert(
        "Maximum Round Reached!!! \n Press Show Button to see full standings or save button to save the tournament data!!!"
      );
    }
  };

  return (
    <div className="lowerhalf">
      <button
        className="pairButton"
        id="pairButton"
        onClick={pairedHandler}
        type="button"
        value="Pair players"
      >
        Pair Players
      </button>

      <button
        className="submitButton"
        onClick={roundResultHandler}
        type="button"
      >
        Submit Results
      </button>

      <button
        className="showResultButton"
        onClick={showResultHandler}
        type="button"
      >
        Show Results
      </button>
      <button
        className="showSaveButton"
        onClick={saveButtonHandler}
        type="button"
      >
        Save
      </button>
      <button className="resetButton" onClick={resetHandler} type="button">
        Reset
      </button>
    </div>
  );
};

export default LowerSection;
