import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import PlayerService from "./data/PlayerService";
import Player from "./data/Player";
import TourForm from "./components/TournamentForm";
import AddPlayerSection from "./components/AddPlayerSection";
import Home from "./components/Home";
import Tournament from "./data/Tournament";
import cloneDeep from "clone-deep";
import ContactForm from "./components/ContactForm";
import { httpActions } from "./store/httpReducer";
import { loadPlayers, tournamentActions } from "./store/tournamentReducer";

const Main = () => {
  
  let [playerAdded,setPlayerAdded]=useState(false);
  const state = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  const DOMstrings = {
    inputName: "#name",
    inputElo: "#eloRating",
    inputClub: "#club",
  };
  console.log("====================================");
  console.log("Tournament State");
  console.log(state);
  console.log("====================================");
  // run once all components are loaded to display players list from the database or show errors if not succeeded

  //ajax request is sent by PlayersService to Postgres database to fetch players data
  // Here I use Spring boot for backend control program so Backend programs must run first to fetch data
  // Otherwise Network error is thrown
  useEffect(() => {
     dispatch(loadPlayers(state.username));
  }, [dispatch,state.username]);

  const submitPlayerHandler = (event) => {
    event.preventDefault();

    let inputName = document.querySelector(DOMstrings.inputName);
    let inputElo = document.querySelector(DOMstrings.inputElo);
    let inputClub = document.querySelector(DOMstrings.inputClub);
    let inputUsername=state.username;
    let player = {name:inputName.value, elo:inputElo.value, club:inputClub.value,username:inputUsername};
    
    
    PlayerService.postPlayer(player) 
    .then((result)=>{
      console.log(result);
      console.log("PlayerService.postPlayer(player) ");
      dispatch(loadPlayers(state.username));
    })   
    .catch((error) => {
      
      console.log("PlayerService.postPlayer(player) ");
      dispatch(loadPlayers(state.username));
      dispatch(httpActions.displayError(error.message));
    }); // save it to database



    if (inputName.value !== "" && inputElo.value !== "") {
      //dispatch(tournamentActions.addPlayer(player));
      inputName.value = "";
      inputElo.value = "";
      inputClub.value = "";
    } else if (inputName.value === "" && inputElo.value === "") {
      window.alert("Player's name and elo-rating are required!");
    }
  };

  //Save tournament form data to the Redux Store but not yet to Tournament table in chesstourDB
  // which will be done at the end of the tournament by saveButtonHandler in LowerSection Button

  const submitTourHandler = (event) => {
    event.preventDefault();
    let tourForm = {};
    let tourdetailsField = document.querySelector("#tournamentDesc");
    let noplayersField = document.querySelector("#noplayers");
    let noroundsField = document.querySelector("#rounds");
    let touridField = document.querySelector("#tourid");
    let inputUsername=state.username;
    let noplayers = cloneDeep(parseInt(noplayersField.value));
    let tourdetails = cloneDeep(tourdetailsField.value);
    let norounds = cloneDeep(noroundsField.value);
    let tourid = cloneDeep(touridField.value);

    tourForm = new Tournament(noplayers, tourdetails, norounds, tourid, inputUsername);
    tourdetailsField.value = "";
    noplayersField.value = "";
    noroundsField.value = "";
    touridField.value = "";

    dispatch(tournamentActions.addTournamentForm(tourForm));
  };
  const logoutHandler = () => {
    /* let pairButton = document.querySelector(".pairButton");
      pairButton.disabled = false; */
    dispatch(tournamentActions.resetHandler());
    dispatch(tournamentActions.logout());
    
  };

  return (
    <div className="App">
      <Router>
        <div className="header items">
          <h2> Chess Tournament Software </h2>
          <ul className="App-header">
            <li>
              <Link style={{ color: "blue", textDecoration: "none" }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/tour"
                style={{ color: "blue", textDecoration: "none" }}
              >
                Tournament Form
              </Link>
            </li>
            <li>
              <Link to="/add" style={{ color: "blue", textDecoration: "none" }}>
                Add
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ color: "blue", textDecoration: "none" }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <input  
          onClick={logoutHandler}         
          className="logout-button"
          type="button"
          value={"Log out"}
        ></input>
        </div>

        <div className="body items">
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/add"
              render={(props) => (
                <AddPlayerSection {...props} submit={submitPlayerHandler} />
              )}
            />

            <Route
              exact
              path="/tour"
              render={(props) => (
                <TourForm {...props} submitTourForm={submitTourHandler} />
              )}
            />

            <Route exact path="/contact" component={ContactForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Main;
