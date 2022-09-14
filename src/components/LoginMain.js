import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Login from "../Login";
import "../Main.css";
import Signup from "../Signup";

const LoginMain = (props) => {
  const localState = useSelector((state) => state.tournament);

  return (
    <Fragment>
      <div className="header items">
        <h2> Chess Tournament Software </h2>
      </div>

      {!localState.signup && <Login></Login>}
      {localState.signup && <Signup></Signup>}
      <div></div>
    </Fragment>
  );
};

export default LoginMain;
