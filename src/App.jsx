import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import ListPlayers from './ListOfPlayers';
import Pairings from './Pairings';

import Player from './data/Player';
import Round from './data/Round';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* new Player('Tesfaye Tassew', 1985, 'Helsingin Shakki Klubbi'),
        new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
        new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
        new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
        new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'),
        new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'),
        new Player('Kiros Alemayehu', 1500, 'Tigray Chess Federation'),
        new Player('Hagos Berhe', 1700, 'Tigray Chess Federation'), */
      players: [
        new Player('A', 1985, 'Helsingin Shakki Klubbi'),
        new Player('B', 2854, 'St Lous Chess Club'),
        new Player('C', 2809, 'Russian Federation Chess'),
        new Player('D', 1678, 'Ethiopian Chess Federation'),
        new Player('E', 2178, 'Ethiopian Chess Federation'),
        new Player('F', 2300, 'Tigray Chess Federation'),
        new Player('G', 2200, 'British Chess Federation'),
        new Player('H', 2310, 'Italian Chess Federation'),
      ],
      counter: 0,
      showPlayersList: false,
      currentRoundGames: [],
    };

    this.state.players.forEach(el => {
      el.setId();
    });
  }

  storeResults = [];
  DOMstrings = {
    inputName: '#name',
    inputElo: '#eloRating',
    inputClub: '#club',
  };

  submitHandler(event) {
    event.preventDefault();

    let newState = { ...this.state };

    let inputName = document.querySelector(this.DOMstrings.inputName);
    let inputElo = document.querySelector(this.DOMstrings.inputElo);
    let inputClub = document.querySelector(this.DOMstrings.inputClub);

    let player = new Player(inputName.value, inputElo.value, inputClub.value);
    player.setId();

    if (inputName.value !== '' && inputElo.value !== '') {
      newState.players.push(player);

      inputName.value = '';
      inputElo.value = '';
      inputClub.value = '';
      this.setState(newState);
    } else if (!(inputName.value !== '' && inputElo.value !== '')) {
      window.alert("Player's name and elo-rating are required!");
    }
  }

  //Pair Players Buton-Handler
  pairedHandler() {
    let newState = { ...this.state };

    if (!this.state.showPlayersList) {
      /* newState.pairButton = true;
      newState.resultButton = false; */
      newState.showPlayersList = true;
      newState.counter++;
      this.setState(newState);
    }
  }
  //select option handler
  selectHandler(e) {
    let result = e.target.value;
    let str = e.target.parentNode.className;

    let obj = {};
    let ids = str.split(' ');
    obj.id = ids;

    let searchIndex = this.storeResults.findIndex(el => {
      return el.id === str;
    });
    if (searchIndex >= 0) this.storeResults.splice(searchIndex, 1);
    if (result !== 'default') this.storeResults.push({ id: str, result });
  }
  //Submit Results Button after the round games list - to enter the round games result
  roundResultHandler(e) {
    let newState = { ...this.state };
    let noPlayers = this.state.players.length;
    let gamesPerRound = Math.floor(noPlayers / 2);

    if (this.storeResults.length === gamesPerRound) {
      this.storeResults.forEach(el => {
        this.selectProsessor(el);
      });
      newState.showPlayersList = false;
      this.setState(newState);
      this.storeResults = [];
    } else {
      window.alert("Enter all games' results!");
    }
  }

  /* if (this.storeResults.length === gamesPerRound) {
      this.storeResults.forEach(el => {
        this.selectProsessor(el);
      });
      newState.showPlayersList = false;
      this.setState(newState);
      this.storeResults = [];
    } else if (!newState.showPlayersList) alert('Proceed to Next Round!');
    else alert('Enter all games result!');
  } */

  selectProsessor(obj) {
    let result = obj.result;
    let str = obj.id;
    let players = [...this.state.players];
    let ids = str.split(' ');

    let player1 = players.filter(el => {
      return el.id === ids[0];
    });
    let player2 = players.filter(el => {
      return el.id === ids[1];
    });

    switch (result) {
      case 'win':
        player1[0].setWhiteTurns();
        player1[0].setScore(1);
        break;
      case 'lose':
        player1[0].setWhiteTurns();
        player2[0].setScore(1);
        break;
      case 'draw':
        player1[0].setWhiteTurns();
        player1[0].setScore(0.5);
        player2[0].setScore(0.5);
        break;
    }
  }

  render() {
    console.log('The state: ', this.state);

    let pairedList = [];
    if (this.state.showPlayersList) {
      let round = new Round(
        this.state.players,
        this.state.counter,
        this.state.currentRoundGames
      );
      let round1 = round.generateRoundGames();

      if (round1 != null) {
        this.state.currentRoundGames.push(round1);

        for (var i = 0; i < round1.length; i++) {
          pairedList.push(
            <Pairings
              key={`${round1[i].player1.id} ${round1[i].player2.id}`}
              player1={round1[i].player1.name}
              player2={round1[i].player2.name}
              players={`${round1[i].player1.id} ${round1[i].player2.id}`}
              selected={this.selectHandler.bind(this)}
            ></Pairings>
          );
        }
      }
    }

    let listPlayers = this.state.players.map((el, ind) => {
      return (
        <div key={el.id}>
          <ListPlayers>
            {el.name} {el.elo} {el.club}
          </ListPlayers>
        </div>
      );
    });

    return (
      <div className='App'>
        <h2>Chess Tournament Software</h2>

        <div className='app-container'>
          <div className='item'>
            <Form submit={e => this.submitHandler(e)}></Form>
          </div>

          <div id='listOfGames' className='item listGames'>
            <span>Complete List of Round Pairings </span>
            <br />
            {pairedList}
            <button
              className='submitResults'
              onClick={this.roundResultHandler.bind(this)}
              type='button'
            >
              Submit Results
            </button>
          </div>

          <div className='item'> {listPlayers} </div>

          <div className='item lowerHalf'>
            <div>
              <h2>Lower Half Section</h2>{' '}
            </div>

            <div>
              {' '}
              <button
                className='Button'
                id='pairButton'
                onClick={this.pairedHandler.bind(this)}
                type='button'
                value='Pair players'
              >
                Pair Players
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
