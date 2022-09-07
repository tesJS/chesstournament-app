import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./lower-section.css";
import Pairings from "../components/Pairings";
import Round from "../data/Round";
import TournamentResult from "../data/TournamentResult";
import PlayerService from "../data/PlayerService";
import { tournamentActions } from "../store/tournamentReducer";
import cloneDeep from "clone-deep";
import { httpActions } from "../store/httpReducer";
import { isNull } from "underscore";

const LowerSection = function (props) {
  const dispatch = useDispatch();
  const tourForm = useSelector((state) => state.tournament.tournamentForm);
  const counter = useSelector((state) => state.tournament.counter);
  const players = useSelector((state) => state.tournament.players);
  const tourState = useSelector((state) => state.tournament);

  //Save each players score to tournamentResults table in chesstourDB
  const saveButtonHandler = (event) => {
    let localTourForm = cloneDeep(tourForm);

    
//check if the tournaent form is submited or not
    if (localTourForm) {
      let tourid = localTourForm.tourid;
      let norounds = localTourForm.norounds;
      let playerid;
      //If the user enters tournament id and the minimum number of rounds played is equal or greater than the one 
      //filled in the tournament form
      if (tourid !== "" && counter >= norounds) {
        try {
          players.forEach((el) => {
            playerid = parseInt(el.id);
            PlayerService.postTournamentResult(
              new TournamentResult(playerid, tourid, el.score.toString())
            ).catch((error) => {
              dispatch(httpActions.displayError(error));
            });
          });
          PlayerService.postTournament(localTourForm);
          dispatch(tournamentActions.resetHandler()); //and then reset the page
        } catch (error) {
          dispatch(httpActions.displayError(error.message));
        }
      } else
        alert(
          "Enter the tournament form id and play the minimum no of rounds not less than the one entered in the tournament form!!!"
        );
    } else alert("Enter the tournament form field on the tournament page!!!");
  };

  //*******************************Submit Results Button after the round games list - to enter the round games result
  const roundResultHandler = () => {
    let newState = cloneDeep(tourState);
    let noPlayers = newState.players.length;
    let gamesPerRound = Math.floor(noPlayers / 2);

    if (newState.pairButtonClicked) {
      let pairButton = document.querySelector(".pairButton");
      pairButton.disabled = false;}

      //if all games results are selected
      if (newState.storeResults.length === gamesPerRound) {

        //update the selected result for the corresponding players
      
        newState.storeResults.forEach(el => {       
       
          let obj = el;
          let result = obj.result;
    
          let str = obj.id;
          let players = newState.players;
          let ids = str.split(" ");
    
          let player1 = players.filter((el) => {
            return el.id.toString() === ids[0];
          });
          let player2 = players.filter((el) => {
            return el.id.toString() === ids[1];
          });
          
          //sets the players opponent list and color counts
          player1[0].whiteTurns++;
          player1[0].oppList.push(player2[0].name);
          player2[0].oppList.push(player1[0].name);
    
          let curOppIndex=player1[0].oppList.length-1
    
          switch (result) {
            case "win":
              player1[0].score++;          
              player1[0].oppList[curOppIndex]+=" - win (w)";
              player2[0].oppList[curOppIndex]+=" - lose (b)";
              break;
            case "lose":
              player1[0].oppList[curOppIndex]+=" - lose (w)";
              player2[0].oppList[curOppIndex]+=" - win (b)";          
              player2[0].score++;
              break;
            case "draw":
              player1[0].oppList[curOppIndex]+=" - draw (w)";
              player2[0].oppList[curOppIndex]+=" - draw (b)";          
              player1[0].score += 0.5;
              player2[0].score += 0.5;
              break;
            default:
              break;
          }

        });

        if(newState.byePlayer)
        {
           newState.players.forEach(el=>{
          if(newState.byePlayer.id===el.id)
          el.score+=1;
        });
        }
       
        newState.pairedList = [];
        newState.submitResultButtonClicked = true;
        newState.pairButtonClicked = false;
        newState.storeResults = [];
        dispatch(tournamentActions.submitButtonUpdate(newState));
      } 
      
      else {
        window.alert("Enter all games' results!");
      }
    };

  const showResultHandler = () => {
    dispatch(tournamentActions.showResult());
  };

  const resetHandler = () => {
    dispatch(tournamentActions.resetHandler());
  };

  //**********************************Pair Players Buton-Handler**********************************************
  const pairedHandler = () => {
    let newState = cloneDeep(tourState),
      currentRoundGames,
      serializedCurrentRoundGames;
      let byePlayer=null;
    newState.showResultButtonClicked = false;

    if (newState.counter === 1) {
      let firstRound = new Round(newState.players, newState.counter, null);
      currentRoundGames = firstRound.generateRoundGames(); 
      byePlayer=firstRound.getByePlayer();     

    } else {
      let otherRounds = new Round(
        newState.players,
        newState.counter,
        newState.currentRoundGames
      );
      currentRoundGames = otherRounds.generateRoundGames();
      byePlayer=otherRounds.getByePlayer(); 
    }

    //if round games   generator does not return null
    if (currentRoundGames != null) {
      newState.counter++;
      //For redux store serializabillity sake I convert currentRoundGames to an array of games objects
      // and then set pairedList array for the PairingListSection
      serializedCurrentRoundGames = currentRoundGames.map((game) => ({
        player1: game.player1,
        player2: game.player2,
      }));
      newState.pairedList = serializedCurrentRoundGames;
      newState.currentRoundGames.push(serializedCurrentRoundGames);
      newState.pairButtonClicked = true;
      newState.byePlayer=byePlayer;
      newState.submitResultButtonClicked = false;

      let pairButton = document.querySelector(".pairButton");
      let saveButton = document.querySelector(".showSaveButton");
      pairButton.disabled = true;
      //if user entered tournament form and minimum number of rounds played then enable save button
      if (
        newState.counter >= newState.tournamentRounds &&
        newState.tournamentRounds !== -1
      )
        saveButton.disabled = false;


      dispatch(tournamentActions.pairButtonUpdate(newState));
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
