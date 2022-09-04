import React,{Fragment} from "react";

import "./Main.css";
import { useDispatch, useSelector } from "react-redux";

import Main from "./Main";

import Login from "./components/Login";

import { tournamentActions } from "./store/tournamentReducer";

const App = () => {
  const localState = useSelector((state) => state.tournament);
  const dispatch = useDispatch();
  dispatch(tournamentActions.addTournamentForm());

  return (
    <Fragment>
      {localState.login && <Main />}
      {!localState.login && <Login />}
    </Fragment>
  );
};

export default App;
