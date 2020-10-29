import React from 'react';

import './Pairings.css';

const Pairings = props => {
  return (
    //<div className='container1'>
    <div
      className={props.players}
      style={{ border: '2px solid blue', margin: '10px' }}
    >
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
        <option value='win'>1-0</option>
        <option value='draw'>1/2-1/2</option>
        <option value='lose'>0-1</option>
      </select>
      <label className='item' htmlFor='result'>
        {props.player2}
      </label>
    </div>
    // </div>
  );
};
export default Pairings;
