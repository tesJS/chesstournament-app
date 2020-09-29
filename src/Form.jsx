import React from 'react';
import './Form.css';
import styled from 'styled-components';

const Form = props => {
  const StyledInput = styled.input`
    width: auto;
    background-color: blue;
    color: white;
    right: 0px;
    padding: 5px;
  `;
  let DOMstrings = {
    inputName: '#name',
    inputElo: '#eloRating',
    inputClub: '#club',
  };

  return (
    <div className='form-container'>
      <form onSubmit={props.submit}>
        <label htmlFor='name'>Name*</label>
        <br />
        <input type='text' id='name' name='Name' placeholder='Your name...' />
        <br />
        <label>Elo-rating*</label>
        <br />
        <input
          id='eloRating'
          type='text'
          name='EloRating'
          placeholder='Your elo rating..'
        />
        <br />
        <label>Club</label>
        <br />
        <input
          id='club'
          type='text'
          name='Club'
          placeholder='Your chess club..'
        />
        <br />

        <StyledInput type='submit' name='Submit' />

        <br />
      </form>
    </div>
  );
};
export default Form;
