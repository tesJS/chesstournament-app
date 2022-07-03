import { createSlice } from '@reduxjs/toolkit';
import PlayerService from '../data/PlayerService';
import { httpActions } from './httpReducer';
import Player from '../data/Player';
import cloneDeep from 'clone-deep';
import uniqid from 'uniqid';

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
  name: 'tournament',
  initialState,
  reducers: {
    showResult(state) {
      let sortedPlayersByScore = state.players.sort(function (pl1, pl2) {
        return pl2.score - pl1.score;
      });
      if (!state.pairButtonClicked) {
        state.showResultButtonClicked = true;
      } else alert('Enter round results or reset the tournament!');
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
      let players = cloneDeep(state.players);
      let ids = str.split(' ');

      let player1 = players.filter(el => {
        return el.id == ids[0];
      });
      let player2 = players.filter(el => {
        return el.id == ids[1];
      });
      player1[0].oppList.push(player2[0].name);
      player2[0].oppList.push(player1[0].name);

      switch (result) {
        case 'win':
          player1[0].whiteTurns++;
          player1[0].score++;
          break;
        case 'lose':
          player1[0].whiteTurns++;
          player2[0].score++;
          break;
        case 'draw':
          player1[0].whiteTurns++;
          player1[0].score += 0.5;
          player2[0].score += 0.5;
          break;
      }

      state.players = players;
    },
    updateStoreResults(state, action) {
      let result = action.payload.result;
      let str = action.payload.str;

      let searchIndex = state.storeResults.findIndex(el => {
        return el.id == str;
      });
      if (searchIndex >= 0) state.storeResults.splice(searchIndex, 1);
      if (result !== 'default') state.storeResults.push({ id: str, result });
    },
    resetHandler(state) {
      let pairButton = document.querySelector('.pairButton');
      pairButton.disabled = false;
      state.counter = 1;
      state.resetButtonClicked = false;
      state.showResultButtonClicked = false;
      state.submitResultButtonClicked = false;
      state.pairButtonClicked = false;
      state.currentRoundGames = [];
      state.showPlayersList = false;
      state.tournamentForm = null;
      state.players.forEach(el => {
        el.score = 0; //each player's score is reset
        el.oppList = []; //each player's list is reset
        el.whiteTurns = 0; //each player's list is reset
      });
      state.pairedList = [];
      state.storeResults = [];
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

export const loadPlayers = () => async dispatch => {
  PlayerService.getPlayers()
    .then(response => {
      let tourPlayers = [];

      for (let i = 0; i < response.length; i++) {
        tourPlayers.push({
          id: response[i].id,
          name: response[i].name,
          elo: response[i].elo,
          club: response[i].club,
          score: 0,
          whiteTurns: 0,
          oppList: [],
        });
      }

      dispatch(tournamentReducer.actions.loadPlayers(tourPlayers));
      dispatch(httpActions.removeError());
    })
    .catch(error => {
      dispatch(httpActions.displayError(error.message));
    });
};

export const tournamentActions = tournamentReducer.actions;

export default tournamentReducer.reducer;
