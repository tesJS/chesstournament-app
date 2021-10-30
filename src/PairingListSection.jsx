import React from 'react';

const PairingListSection=function (props) {
    return (<div >
            <span className='listPairs'>
              {' '}
              <span>Complete List of Round Pairings</span>{' '}
            </span>
            <p>
              <span className='listPairs'>
                Current Round {props.round}
              </span>
            </p>
            <p>{props.pairingList}</p>
          </div>);
}
export default PairingListSection;
