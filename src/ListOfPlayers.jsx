import React from 'react';
import './ListPlayers.css';
const ListPlayers = props => {
  return (
    <div>
      <span>List of Players</span>
      <div style={{marginBottom:25}}></div>
      {props.playersList}
    </div>
  );
};
export default ListPlayers;
