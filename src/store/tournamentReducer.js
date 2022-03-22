import { createSlice } from "@reduxjs/toolkit";
import PlayerService from "../data/PlayerService";
import { httpActions } from "./httpReducer";

const initialState = {
  players: [],
  counter: 1,
  finalRound: false,
  showResult: false,
  showPlayersList: false,
  currentRoundGames: [],
  pairButtonClicked: false,
  showResultButtonClicked: false,
  submitResultButtonClicked: false,
  resetButtonClicked: false,
  pairedList: [],
  storeResults: [],
  tournamentForm: null,
};

export const tournamentReducer = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    showResult(state) {
      let sortedPlayersByScore = state.players.sort(function (pl1, pl2) {
        return pl2.score - pl1.score;
      });
      if (!state.pairButtonClicked) {
        state.showResultButtonClicked = true;

        state.pairedList = sortedPlayersByScore.map((el) => {
          return (
            <div className="playersList" key={el.id}>
              {el.name} - {el.score}
            </div>
          );
        });
      } else alert("Enter round results or reset the tournament!");
    },
    update(state, action) {
      state.counter = action.payload.counter;
      state.currentRoundGames = action.payload.currentRoundGames;
      state.pairButtonClicked = action.payload.pairButtonClicked;

      state.submitResultButtonClicked =
        action.payload.submitResultButtonClicked;
      state.pairedList = action.payload.pairedList;
      state.storeResults = action.payload.storeResults;
      state.showResultButtonClicked = action.payload.showResultButtonClicked;
    },
    selectProsessor(state, action) {
      let obj = action.payload;
      let result = obj.result;

      let str = obj.id;
      let players = state.players;
      let ids = str.split(" ");

      let player1 = players.filter((el) => {
        return el.id == ids[0];
      });
      let player2 = players.filter((el) => {
        return el.id == ids[1];
      });

      switch (result) {
        case "win":
          player1[0].setWhiteTurns();
          player1[0].setScore(1);
          break;
        case "lose":
          player1[0].setWhiteTurns();
          player2[0].setScore(1);
          break;
        case "draw":
          player1[0].setWhiteTurns();
          player1[0].setScore(0.5);
          player2[0].setScore(0.5);
          break;
      }
    },
    updateStoreResults(state, action) {
      let event = action.payload;
      let result = event.target.value;
      let str = event.target.parentNode.className;

      let obj = {};
      let ids = str.split(" ");
      obj.id = ids;

      let searchIndex = state.storeResults.findIndex((el) => {
        return el.id == str;
      });
      if (searchIndex >= 0) state.storeResults.splice(searchIndex, 1);
      if (result !== "default") state.storeResults.push({ id: str, result });
      console.log("State.storeResults ");
      console.log({ id: str, result });
    },
    resetHandler(state) {
      let pairButton = document.querySelector(".pairButton");
      pairButton.disabled = false;
      state.counter = 1;
      state.resetButtonClicked = false;
      state.showResultButtonClicked = false;
      state.submitResultButtonClicked = false;
      state.pairButtonClicked = false;
      state.currentRoundGames = [];
      state.showPlayersList = false;
      state.tournamentForm = null;
      state.players.forEach((el) => {
        el.score = 0; //each player's score is reset
        el.oppList = []; //each player's list is reset
        el.whiteTurns = 0; //each player's list is reset
      });
      state.pairedList = [];
    },
    addTournamentForm(state, action) {
      state.tournamentForm = action.payload;
    },
    loadPlayers(state, action) {
      state.players = action.payload;
    },
    addPlayer(state, action) {
      state.players.push(action.payload);
    },
  },
});

export const loadPlayers = () => async (dispatch) => {
  PlayerService.getPlayers()
    .then((response) => {
      let tourPlayers = [];

      for (let i = 0; i < response.length; i++) {
        tourPlayers.push(
          new Player(response[i].name, response[i].elo, response[i].club)
        );
        tourPlayers[i].id = response[i].id;
      }

      dispatch(tournamentReducer.actions.loadPlayers(tourPlayers));
      dispatch(httpActions.removeError());
    })
    .catch((error) => {
      //console.log("Error occured from catch-" + error);
      dispatch(httpActions.displayError(error.message));
    });
};

export const tournamentActions = tournamentReducer.actions;

export default tournamentReducer.reducer;
