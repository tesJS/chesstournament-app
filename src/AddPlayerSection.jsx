import React from 'react';
import './Add-player-form.css';

const AddPlayerSection = props => {
  return (

    <div className='players-section'>
      <h3> Add Players</h3>
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

        <input className='postButton' type='submit' name='Submit' />

        <br />
      </form>
    </div>

  );
};
export default AddPlayerSection;
