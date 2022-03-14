import React from "react";

import "./Pairings.css";

const Pairings = (props) => {
  const selected = (event) => {
    props.selected(event);
  };

  return (
    <div className={props.players} style={{}}>
      <label className="item1" htmlFor="result">
        {props.player1}
      </label>
      <select
        onChange={selected}
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
