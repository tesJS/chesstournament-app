import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import ListTourPlayers from "./ListTourPlayers";
import LowerSection from "./LowerSection";
import PairingListSection from "./PairingListSection";

function Home(props) {
  
  return (
    <div className="container">
      <div className="pairingListSection item">
        <PairingListSection />
      </div>

      <div className="listOfPlayersSection item">
        <ListTourPlayers />
      </div>

      <div className="lowerHalfSection item">
        <LowerSection />
      </div>
    </div>
  );
}
export default Home;
