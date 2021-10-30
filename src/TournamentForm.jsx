import React from 'react';
import './tour-form.css';

const TourForm = props => {
  return (
    <div className='form-container'>
      <h3> Tournament Form</h3>

      <form onSubmit={props.post}>
        <label htmlFor='name'>Tournament Name*</label>
        <br />
        <input type='text' id='name' name='Name' placeholder='Tournament name...' />
        <br />
        <label>Tournament Description*</label>
        <br />
        <input
          id='tournamentDesc'
          type='text'
          name='tournamentDesc'
          placeholder='Description..'
        />
        <br />
        <label>Number of Players</label>
        <br />
        <input
          id='club'
          type='text'
          name='Club'
          placeholder='Total players number...'
        />
        <br />
        <label>Number of Rounds</label>
        <br />
        <input
          id='rounds'
          type='text'
          name='rounds'
          placeholder='Total number of rounds...'
        />
        <br />

        <input className='postButton' type='submit' name='Submit' />

        <br />
      </form>
    </div>
  );
};
export default TourForm;
