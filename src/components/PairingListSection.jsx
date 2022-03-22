import React from "react";
import { useSelector } from "react-redux";

const PairingListSection = function (props) {
  const pairsList = useSelector((state) => state.tournament.pairedList);
  const counter = useSelector((state) => state.tournament.counter);
  console.log("PairingListSection");
  console.log(pairsList);
  return (
    <div>
      <span className="listPairs">
        {" "}
        <span>Complete List of Round Pairings</span>{" "}
      </span>
      <div style={{ marginBottom: 20 }}>
        <span className="listPairs">Current Round {counter - 1}</span>
      </div>
      {pairsList}
    </div>
  );
};
export default PairingListSection;
