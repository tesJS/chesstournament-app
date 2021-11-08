import React from 'react';
import './ListPlayers.css';
const ListPlayers = props => {
  return (
    <div>
      <span>List of Players</span>
      {props.playersList}
    </div>
  );
};
export default ListPlayers;
