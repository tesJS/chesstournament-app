import React from 'react';

import './Pairings.css';
import styled from 'styled-components';

const Pairings = props => {
  return (
    //<div className='container1'>
    <div>
      <label className='item1' htmlFor='result'>
        {props.alt1}
      </label>
      <select className='item2' name='result' id='result'>
        <option value='default' selected='selected'>
          vs.
        </option>
        <option value='win'>win</option>
        <option value='draw'>draw</option>
        <option value='lose'>lose</option>
      </select>
      <label className='item3' htmlFor='result'>
        {props.alt2}
      </label>
    </div>
    // </div>
  );
};
export default Pairings;
