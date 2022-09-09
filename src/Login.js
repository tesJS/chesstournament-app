import React, {Fragment,useState  } from "react";
import { tournamentActions } from "./store/tournamentReducer"
import { useDispatch, useSelector } from "react-redux";
import { checkLoginUser } from "./store/tournamentReducer";
import "./Main.css";
import User from "./data/User";

const Login = (props) => {

  const signupButton=useState(false);
  const [username,setUserName]= useState();
  const [password,setPassword]= useState();

  function usernameHandler(event) {
    setUserName( event.target.value);
  }
  function passwordHandler(event) {
    setPassword( event.target.value);
  }
  const localState = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  const loginFormSubmitHandler = (event) => {
    event.preventDefault();
    let user= new User(username,password,"GUEST");
    dispatch(checkLoginUser(user));
  };

  const handleSignupButton = (event) => {
    event.preventDefault();
    console.log(localState);
    console.log("Signup Button from Login.js");
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
        <input type="text" id="username" name="username" onBlur={usernameHandler} ></input>
        <br />
        <br></br>
        <label htmlFor="password">Password: </label>
        <input className="login-password" type="password" id="password" onBlur={passwordHandler} ></input>
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
      <div>
        
      </div>
    
    </Fragment>
  );
    
};

export default Login
