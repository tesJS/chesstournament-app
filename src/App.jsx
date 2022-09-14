import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import LoginMain from "./components/LoginMain";
import Main from "./Main";
import "./Main.css";

const App = () => {
  const localState = useSelector((state) => state.tournament);
  console.log("====================================");
  console.log("Tournament State from App Component");
  console.log(localState);
  console.log("====================================");
  return (
    <Fragment>
      {localState.login && <Main />}
      {!localState.login && <LoginMain />}
    </Fragment>
  );
};

export default App;
