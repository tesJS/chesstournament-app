import React, {Fragment,useState  } from "react";
import { tournamentActions } from "../store/tournamentReducer";
import { useDispatch, useSelector } from "react-redux";
import "../Main.css";
import Signup from "../Signup";
import Login from "../Login";

const LoginMain = (props) => {

  

  const localState = useSelector((state) => state.tournament);
  

 

  return (

    <Fragment>
       <div className="header items">
          <h2> Chess Tournament Software </h2>
          
        </div>
      
    {(!localState.signup)&&<Login></Login>}
      {(localState.signup)&&<Signup></Signup>}
      <div>
        
      </div>
    
    </Fragment>
  );
    
};

export default LoginMain;
