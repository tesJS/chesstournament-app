import React, { Fragment } from "react";
import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import Main from "./Main";
import LoginMain from "./components/LoginMain";
import { tournamentActions } from "./store/tournamentReducer";

const App = () => {
  const localState = useSelector((state) => state.tournament);

  return (
    <Fragment>
      {localState.login && <Main />}
      {!localState.login && <LoginMain />}
    </Fragment>
  );
};

export default App;
