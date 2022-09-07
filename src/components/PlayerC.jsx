import {useDispatch,  useSelector } from "react-redux";
import {  tournamentActions } from "../store/tournamentReducer";
function PlayerC(props) {
    const dbPlayers = useSelector((state) => state.tournament.dbPlayers);
    const players = useSelector((state) => state.tournament.players);
    const dispatch = useDispatch();
    let player, playerInSelectedList=false;

    let dbPlayerClickHandler=(event)=>{

        
        //to find the player clicked fron the dbPlayers List
        player=dbPlayers.filter(el=>{
            return el.id===props.id;
        })

        playerInSelectedList=players.some(el=>{
            return el.id===props.id;
        })
        
        
        if(!playerInSelectedList)
       dispatch(tournamentActions.addTourPlayersList(player))

       else if(props.parent==='SelectedPlayersList'){
        console.log("I ma inside SelectedPlayersList ");
        dispatch(tournamentActions.removeTourPlayersList(player))
       }
        
        

      }
      

    return ( 
        <div onClick={dbPlayerClickHandler}>
            {props.name} {props.elo} {props.club} 
        </div>
     );
}

export default PlayerC;