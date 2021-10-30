import React from 'react';


const ListPlayers = props => {
  return (
    <div>
            <span>List of Players</span> 
            {props.playersList}
   </div>
    
  );
};
export default ListPlayers;
