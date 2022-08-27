import React, { Fragment, useRef } from "react";
import uniqid from "uniqid";
import { useDispatch } from "react-redux";
import "./Pairings.css";
import { tournamentActions } from "../store/tournamentReducer";
const Pairings = (props) => {
  const dispatch = useDispatch();

  let options = [
    { label: "vs.", value: "default" },
    { label: "1-0", value: "win" },
    { label: "1/2-1/2.", value: "draw" },
    { label: "0-1", value: "lose" },
  ];

  let filteredArray=options.filter(el=>el.value===props.selected)
  let defaultValue=filteredArray[0].value;

  //select option handler
  const selectHandler = (event) => {
    let result = event.target.value;
    let str = event.target.parentNode.className;

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
        value={defaultValue}
        name="result"
        id="result"
        required
        autoFocus
      >
        {options.map((el) => (
          <option key={uniqid()} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
      <label className="item1" htmlFor="result">
        {props.player2}
      </label>
    </div>
    // </div>
  );
};
export default Pairings;
