import React from 'react';
import './Form.css';

const Form = props => {
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

        <input className='submitButon' type='submit' name='Submit' />

        <br />
      </form>
    </div>
  );
};
export default Form;
