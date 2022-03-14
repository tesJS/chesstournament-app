import React from "react";
import { useSelector } from "react-redux";

const PairingListSection = function (props) {
  const pairsList = useSelector((state) => state.tournament.pairedList);
  const roundNo = useSelector((state) => state.tournament.roundNo);
  console.log("PairingListSection");
  console.log(pairsList);
  return (
    <div>
      <span className="listPairs">
        {" "}
        <span>Complete List of Round Pairings</span>{" "}
      </span>
      <div style={{ marginBottom: 20 }}>
        <span className="listPairs">Current Round {roundNo}</span>
      </div>
      {pairsList}
    </div>
  );
};
export default PairingListSection;
