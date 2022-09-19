import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tournamentActions, checkSignupUser } from "./store/tournamentReducer";
import User from "./data/User";
import "./Main.css";

function Signup(props) {
  const dispatch = useDispatch();
  let errorLabel = useRef();
  const [error, setError] = useState("");
  let passwordsMatch = false;
  const localState = useSelector((state) => state.tournament);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    console.log("Signup useEffect");
    console.log(localState.httpErrorMessage);
    setError(localState.httpErrorMessage);
  }, [dispatch, localState.httpError]);

  function usernameHandler(event) {
    setUserName(event.target.value);
  }
  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function confirmPasswordHandler(event) {
    setConfirmPassword(event.target.value);
  }

  const submitSignupHandler = (event) => {
    event.preventDefault();
    let user = new User(username, password, "GUEST");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else if (password.length < 3) {
      setError("Please enter loner password!");
    } else dispatch(checkSignupUser(user));
  };
  const backbuttonHandler = () => {
    dispatch(tournamentActions.signup(false));
  };
  return (
    <div className="signuppage-container">
      <form onSubmit={submitSignupHandler}>
        <label htmlFor="username">User Name: </label>
        <input
          className="signup-username"
          type="text"
          id="username"
          name="username"
          onBlur={usernameHandler}
        ></input>
        <br /> <br></br>
        <label htmlFor="password1">Password: </label>
        <input
          className="signup-password1"
          type="password"
          id="password1"
          onBlur={passwordHandler}
        ></input>
        <br></br>
        <br />
        <label htmlFor="password2">Confirm Password: </label>
        <input
          className="signup-password2"
          type="password"
          id="password2"
          onBlur={confirmPasswordHandler}
        ></input>
        <br></br>
        <input
          className="signup-submit-button"
          type="submit"
          value={"Signup"}
        ></input>
        <label ref={errorLabel} id="signup-errorLabel">
          {error}
        </label>
      </form>
      <input
        onClick={backbuttonHandler}
        className="signup-back-button"
        type="button"
        value={"Back"}
      ></input>
    </div>
  );
}

export default Signup;
