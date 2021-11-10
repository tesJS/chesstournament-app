import React from 'react';

const PairingListSection=function (props) {
    return (<div >
            <span className='listPairs'>
              {' '}
              <span>Complete List of Round Pairings</span>{' '}
            </span>
            <div>
              <span className='listPairs'>
                Current Round {props.round}
              </span>
            </div>
            {props.pairsList}
            
          </div>);
}
export default PairingListSection;
