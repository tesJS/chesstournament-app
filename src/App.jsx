import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LoginMain from "./components/LoginMain";
import Main from "./Main";
import "./Main.css";

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
