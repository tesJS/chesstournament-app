import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AddPlayerSection from "./components/AddPlayerSection";
import ContactForm from "./components/ContactForm";
import Home from "./components/Home";
import TourForm from "./components/TournamentForm";
import "./Main.css";
import { loadPlayers, tournamentActions } from "./store/tournamentReducer";

const Main = () => {
  const state = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  console.log("====================================");
  console.log("Tournament State from Main Component");
  console.log(state);
  console.log("====================================");
  // run once all components are loaded to display players list from the database or show errors if not succeeded

  //ajax request is sent by PlayersService to Postgres database to fetch players data
  // Here I use Spring boot for backend control program so Backend programs must run first to fetch data
  // Otherwise Network error is thrown
  useEffect(() => {
    dispatch(loadPlayers(state.username));
  }, [dispatch, state.username]);

  //Save tournament form data to the Redux Store but not yet to Tournament table in chesstourDB
  // which will be done at the end of the tournament by saveButtonHandler in LowerSection Button

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
              render={(props) => <AddPlayerSection {...props} />}
            />

            <Route
              exact
              path="/tour"
              render={(props) => <TourForm {...props} />}
            />

            <Route exact path="/contact" component={ContactForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Main;
