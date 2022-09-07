import { useDispatch, useSelector } from "react-redux";
import { tournamentActions } from "./store/tournamentReducer";
function Signup(props) {
  const dispatch = useDispatch();

  const localState = useSelector((state) => state.tournament);

  const submitSignupHandler = () => {
    
    
  };
  const backbuttonHandler = () => {
    dispatch(tournamentActions.signup(false));
    
  };
  return (
    <div className="signuppage-container">
      
      <form onSubmit={submitSignupHandler}>
        <label htmlFor="username">User Name: </label>
        <input className="signup-username" type="text" id="username" name="username"></input>
        <br />        <br></br>

        <label htmlFor="password1">Password: </label>
        <input className="signup-password1" type="password" id="password1"></input>
        <br></br><br/>

        <label htmlFor="password2">Confirm Password: </label>
        <input className="signup-password2" type="password" id="password2"></input>

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
