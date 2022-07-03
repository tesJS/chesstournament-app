import React, { useEffect } from 'react';
import Pairings from '../components/Pairings';
import { tournamentActions } from '../store/tournamentReducer';
import { useSelector, useDispatch } from 'react-redux';

const PairingListSection = function (props) {
  const dispatch = useDispatch();

  const currentRoundGames = useSelector(state => state.tournament.pairedList);
  const storeResults = useSelector(state => state.tournament.storeResults);
  const showResultButtonClicked = useSelector(
    state => state.tournament.showResultButtonClicked
  );
  const players = useSelector(state => state.tournament.players);
  let renderdPairedLists = [];
  const counter = useSelector(state => state.tournament.counter);
  let selected = 'default';

  if (currentRoundGames.length > 0 && !showResultButtonClicked) {
    renderdPairedLists = currentRoundGames.map(currentRoundGame => {
      selected = 'default';
      let key = `${currentRoundGame.player1.id} ${currentRoundGame.player2.id}`;
      storeResults.forEach(el => {
        if (el.id === key) selected = el.result;
      });

      return (
        <Pairings
          key={key}
          player1={currentRoundGame.player1.name}
          player2={currentRoundGame.player2.name}
          players={`${currentRoundGame.player1.id} ${currentRoundGame.player2.id}`}
          selected={selected}
        ></Pairings>
      );
    });
  } else if (showResultButtonClicked) {
    renderdPairedLists = players.map(el => (
      <div className='playersList' key={el.id}>
        {el.name} - {el.score}
      </div>
    ));
  }

  return (
    <div>
      <span className='listPairs'>
        {' '}
        <span>Complete List of Round Pairings</span>{' '}
      </span>
      <div style={{ marginBottom: 20 }}>
        <span className='listPairs'>Current Round {counter - 1}</span>
        {renderdPairedLists}
      </div>
    </div>
  );
};
export default PairingListSection;
