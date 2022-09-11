import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tournamentActions, checkSignupUser } from "./store/tournamentReducer";
import User from "./data/User";

function Signup(props) {
  const dispatch = useDispatch();
  let passwordsMatch = false;
  const localState = useSelector((state) => state.tournament);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

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

    if (password.length > 3 && password.value === confirmPassword.value) {
      dispatch(checkSignupUser(user));
    }
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
