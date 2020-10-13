import React from 'react';
import './ListPlayers.css';

const ListPlayers = props => {
  return (
    <div className='container'>
      <div className='item-11'> {props.children} </div>
    </div>
  );
};
export default ListPlayers;
