import ListDBPlayers from "./ListDBPlayers";
import "./SelectPlayers.css";
import {useDispatch } from "react-redux";
import {  tournamentActions } from "../store/tournamentReducer";

const  SelectPlayers=(props)=>{
    const dispatch = useDispatch();
    function addAllHandler(e) {
        dispatch(tournamentActions.selectAllDBPlayers())
        
    }
    return (
        <div>
            <ListDBPlayers />
            
            <button onClick={addAllHandler} className="add btn">Add All</button>
        </div>
    )
};

export default SelectPlayers