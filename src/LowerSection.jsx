
import React from 'react';
import './lower-section.css';
const LowerSection=function (props) {
    return (<div className='lowerhalf'>
    
      
      <button
      
        className='pairButton'
        id='pairButton'
        onClick={props.pairButtonHandler}
        type='button'
        value='Pair players'
      >
        Pair Players
      </button>
    
    <button
      className='submitButton'
      onClick={props.submitButtonHandler}
      type='button'
    >
      Submit Results
    </button>

    <button
      className='showResultButton'
      onClick={props.showResultHandler}
      type='button'
    >
      Show Results
    </button>
    <button
      className='resetButton'
      onClick={props.resetHandler}
      type='button'
    >
      Reset
    </button>
  </div>);
}

export default LowerSection;




