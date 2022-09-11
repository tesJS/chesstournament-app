import { createSlice } from "@reduxjs/toolkit";
import PlayerService from "../data/PlayerService";
import UserService from "../data/UserSevice";
import { httpActions } from "./httpReducer";


const initialState = {
  login:false,
  username:"",
  players: [],
  dbPlayers:[],
  byePlayer:{},
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
  signup:false,
  storeResults: [],
  tournamentForm: null,
};

export const tournamentReducer = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    signup(state,action){
      state.signup=action.payload;
    },
    login(state,action){
     
      state.login=true;
      state.username=action.payload;
      
    },
    logout(state,action){
     
      state.login=false;
      state.byePlayer={};
      state.username="";
      
      
    },
    showResult(state) {
      let sortedPlayersByScore = state.players.sort(function (pl1, pl2) {
        return pl2.score - pl1.score;
      });
      if (!state.pairButtonClicked) {
        state.showResultButtonClicked = true;
      } else alert("Enter round results or reset the tournament!");
    },
    //pair button update operations
    pairButtonUpdate(state, action) {
      state.counter = action.payload.counter;
      state.currentRoundGames = action.payload.currentRoundGames;
      state.pairButtonClicked = action.payload.pairButtonClicked;
      state.byePlayer=action.payload.byePlayer;
      state.submitResultButtonClicked =
        action.payload.submitResultButtonClicked;
      state.pairedList = action.payload.pairedList;
      state.storeResults = action.payload.storeResults;
      state.showResultButtonClicked = action.payload.showResultButtonClicked;
/* console.log(action.payload);
      state=cloneDeep( action.payload);  */ 
    },

    submitButtonUpdate(state,action){

      state.counter = action.payload.counter;
      state.players=action.payload.players;
      state.currentRoundGames = action.payload.currentRoundGames;
      state.pairButtonClicked = action.payload.pairButtonClicked;
      state.byePlayer=action.payload.byePlayer;
      state.submitResultButtonClicked =
        action.payload.submitResultButtonClicked;
      state.pairedList = action.payload.pairedList;
      state.storeResults = action.payload.storeResults;
      state.showResultButtonClicked = action.payload.showResultButtonClicked;  
          
        
       
        },
    

   
    updateStoreResults(state, action) {
      let result = action.payload.result;
      let str = action.payload.str;

      //searchIndex searches the index if storeresults is not empty or -1 
      let searchIndex = state.storeResults.findIndex((el) => {
        return el.id ===str;
      });
      if (searchIndex >= 0) state.storeResults.splice(searchIndex, 1);// removes the previous selected result of the same players
      if (result !== "default") state.storeResults.push({ id: str, result });// push the selected to the state -> storeResults
    },
    resetHandler(state) {
      
      state.counter = 1;
      state.resetButtonClicked = false;
      state.showResultButtonClicked = false;
      state.submitResultButtonClicked = false;
      state.pairButtonClicked = false;
      state.currentRoundGames = [];
      state.storeResults = [];
      state.currentRoundGames=[];
      state.showPlayersList = false;
      state.tournamentForm = null;
      /* state.players.forEach((el) => {
        el.score = 0; //each player's score is reset
        el.oppList = []; //each player's list is reset
        el.whiteTurns = 0; //each player's list is reset
      }); */
      state.players=[];
      state.pairedList = [];
    },
    addTournamentForm(state, action) {
      state.tournamentForm = action.payload;
    },
    loadPlayers(state, action) {
      state.dbPlayers = action.payload;
    },
    addTourPlayersList(state,action){
      state.players.push(...action.payload);
    },
    removeTourPlayersList(state,action){
      let player=action.payload;
      console.log("Inside  removeTourPlayersList");
      console.log(player[0]);
      state.players=state.players.filter(plr=>player[0].id!==plr.id);
      console.log(state);
    },
    selectAllDBPlayers(state,action){
      state.players=state.dbPlayers;
    },
    addPlayer(state, action) {
      state.players.push(action.payload);
    },
  },
});

export const loadPlayers = (username) => async (dispatch) => {
  PlayerService.getPlayers(username)
    .then((response) => {
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
    .catch((error) => {
      dispatch(httpActions.displayError(error.message));
    });
};

export const checkLoginUser=(user)=>async (dispatch)=>{
  
    console.log(user);

  UserService.checkUserData(user).then((response)=>{
    if(response.userPasswordMatches)    
    dispatch(tournamentReducer.actions.login(response.user.username));
  });
};
export const checkSignupUser=(user)=>async (dispatch)=>{
  
    console.log(user);

  UserService.checkUserData(user).then((response)=>{
    
    console.log("checkUserData response");
    console.log(response);
    //if there are no existing users with the same name then save the user to db and log him in
    if(response.user==null)  {
      UserService.postUserData(user).catch((error) => {
        dispatch(httpActions.displayError(error.message));
      }); // save the new user to database
      dispatch(tournamentReducer.actions.login(user.username));
    }  
    
  });
};



export const tournamentActions = tournamentReducer.actions;

export default tournamentReducer.reducer;
