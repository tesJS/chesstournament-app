import React from "react";

import { useDispatch } from "react-redux";
import "./Pairings.css";
import { tournamentActions } from "../store/tournamentReducer";

//represents each paring from the list of pairs of players of the current round 
const Pairings = (props) => {
  const dispatch = useDispatch();
  //select option handler
  const selectHandler = (event) => {
    let result = event.target.value;
    let str = event.target.parentNode.className;

    let obj = {};
    let ids = str.split(" ");
    obj.id = ids;

    dispatch(tournamentActions.updateStoreResults({ str, result }));
  };

  return (
    <div className={props.players} style={{}}>
      <label className="item1" htmlFor="result">
        {props.player1}
      </label>
      <select
        onChange={selectHandler}
        className="item1"
        name="result"
        id="result"
        required
        autoFocus
      >
        <option value="default">vs.</option>
        <option value="win">1-0</option>
        <option value="draw">1/2-1/2</option>
        <option value="lose">0-1</option>
      </select>
      <label className="item1" htmlFor="result">
        {props.player2}
      </label>
    </div>
    // </div>
  );
};
export default Pairings;
