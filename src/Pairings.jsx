import React from 'react';

import './Pairings.css';

const Pairings = props => {
  return (
    //<div className='container1'>
    <div className={props.players}>
      <label className='item' htmlFor='result'>
        {props.player1}
      </label>
      <select
        onChange={props.selected}
        className='item'
        name='result'
        id='result'
        required
        autoFocus
      >
        <option value='default'>vs.</option>
        <option value='win'>win</option>
        <option value='draw'>draw</option>
        <option value='lose'>lose</option>
      </select>
      <label className='item' htmlFor='result'>
        {props.player2}
      </label>
    </div>
    // </div>
  );
};
export default Pairings;
