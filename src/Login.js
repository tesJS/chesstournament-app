import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./data/User";
import "./Main.css";
import { checkLoginUser, tournamentActions } from "./store/tournamentReducer";

const Login = (props) => {
  let errorLabel = useRef();

  const localState = useSelector((state) => state.http);
  const dispatch = useDispatch();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login useffect is called");
    if (localState.httpError) {
      setError(localState.httpErrorMessage);
    }
  }, [dispatch, localState.httpErrorMessage, localState.httpError]);

  function usernameHandler(event) {
    setUserName(event.target.value);
  }
  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  const loginFormSubmitHandler = (event) => {
    
    event.preventDefault();
    let user = new User(username, password, "GUEST");
    dispatch(checkLoginUser(user));
  };

  const handleSignupButton = (event) => {
    event.preventDefault();
    dispatch(tournamentActions.signup(true));
  };
  return (
    <Fragment>
      <div className="header items">
        <h2> Chess Tournament Software </h2>
      </div>

      <div className="loginpage-container">
        <form onSubmit={loginFormSubmitHandler}>
          <label htmlFor="username">User Name: </label>
          <input
            type="text"
            id="username"
            name="username"
            onBlur={usernameHandler}
          ></input>

          <br />
          <br></br>
          <label htmlFor="password">Password: </label>
          <input
            className="login-password"
            type="password"
            id="password"
            onBlur={passwordHandler}
          ></input>
          <br />
          <br />
          <label ref={errorLabel} id="login-errorLabel">
            {error}
          </label>
          <input
            className="login-submit-button"
            type="submit"
            value={"Login"}
          ></input>
        </form>
        <input
          onClick={handleSignupButton}
          className="login-signup-button"
          type="button"
          value={"Signup"}
        ></input>
      </div>
      <div></div>
    </Fragment>
  );
};

export default Login;
