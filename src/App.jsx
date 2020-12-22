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
      players: [
        new Player('Tesfaye Asfaw', 1985, 'Helsingin Shakki Klubbi'),
        new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
        new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
        new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
        new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'),
        new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'),
        /* new Player('Kiros Alemayehu', 1500, 'Tigray Chess Federation'),
        new Player('Hagos Berhe', 1700, 'Tigray Chess Federation'), */
      ],
      /*  players: [
        new Player('A', 1985, 'Helsingin Shakki Klubbi'),
        new Player('B', 2854, 'St Lous Chess Club'),
        new Player('C', 2809, 'Russian Federation Chess'),
        new Player('D', 1678, 'Ethiopian Chess Federation'),
        new Player('E', 2178, 'Ethiopian Chess Federation'),
        new Player('F', 2300, 'Tigray Chess Federation'),
        new Player('G', 2200, 'British Chess Federation'),
        new Player('H', 2310, 'Italian Chess Federation'),
      ], */
      counter: 0,
      finalRound: false,
      showResult: false,
      showPlayersList: false,
      currentRoundGames: [],
      pairButtonClicked: false,
      showResultButtonClicked: false,
      submitResultButtonClicked: false,
      resetButtonClicked: false,
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

    if (!newState.pairButtonClicked) {
      this.setStatus(newState);
      newState.pairButtonClicked = true;
      newState.counter++;
      console.log('The state from pairHandler', newState);
      this.setState(newState);
    } else alert('Enter round results or reset the tournament!');
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
  setStatus(newState) {
    newState.resetButtonClicked = false;
    newState.showResultButtonClicked = false;
    newState.submitResultButtonClicked = false;
    newState.pairButtonClicked = false;
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
      this.setStatus(newState);
      newState.submitResultButtonClicked = true;
      this.storeResults = [];
      console.log('The state from roundResultHandler', newState);
      this.setState(newState);
    } else {
      window.alert("Enter all games' results!");
    }
  }

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

  showResultHandler() {
    let newState = { ...this.state };
    if (!newState.pairButtonClicked || newState.finalRound) {
      this.setStatus(newState);
      newState.showResultButtonClicked = true;
      console.log('The state from showResultButton', newState);
      this.setState(newState);
    } else alert('Enter round results or reset the tournament!');
  }
  resetHandler() {
    let newState = { ...this.state };
    newState.counter = 0;
    newState.players = [
      new Player('Tesfaye Asfaw', 1985, 'Helsingin Shakki Klubbi'),
      new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
      new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
      new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
      new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'),
      new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'),
    ];
    this.setStatus(newState);
    newState.resetButtonClicked = true;
    newState.currentRoundGames = [];
    console.log('The state from resetHandler', newState);
    this.setState(newState);
  }

  render() {
    let pairedList = [],
      players,
      round = new Round(
        this.state.players,
        this.state.counter,
        this.state.currentRoundGames
      ),
      round1,
      listPlayers;
    let round2 = new Round(this.state.players, 1, null);

    players = round2.getPlayers();

    if (this.state.pairButtonClicked) {
      round1 = round.generateRoundGames();
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
      } else {
        this.state.counter--;
        this.state.finalRound = true;
        alert(
          'Maximum Round Reached!!! \n Press Show Button to see full standings!'
        );
      }
    } else if (this.state.showResultButtonClicked) {
      pairedList = players.map((el, id) => {
        return (
          <div key={el.id}>
            <ListPlayers>
              {el.name} - {el.score}
            </ListPlayers>
          </div>
        );
      });
    }

    listPlayers = players.map((el, ind) => {
      return (
        <div key={el.id}>
          <ListPlayers>
            {el.name} {el.elo} {el.club} {el.score}
          </ListPlayers>
        </div>
      );
    });

    return (
      <div className='App'>
        <h2> Chess Tournament Software </h2>
        <div className='app-container'>
          <div className='item'>
            <span> Add Players</span>
            <Form submit={e => this.submitHandler(e)}></Form>
          </div>

          <div id='listOfGames' className='item listGames'>
            <span className='listPairs'>
              {' '}
              <span>Complete List of Round Pairings</span>{' '}
            </span>
            <p>
              <span className='listPairs'>
                Current Round {this.state.counter}
              </span>
            </p>
            {pairedList}
          </div>

          <div className='item'>
            <span>List of Players</span> {listPlayers}
          </div>

          <div className='item lowerHalf'>
            <div>
              {' '}
              <button
                className='pairButton'
                id='pairButton'
                onClick={this.pairedHandler.bind(this)}
                type='button'
                value='Pair players'
              >
                Pair Players
              </button>
            </div>
            <button
              className='submitButton'
              onClick={this.roundResultHandler.bind(this)}
              type='button'
            >
              Submit Results
            </button>

            <button
              className='showResultButton'
              onClick={this.showResultHandler.bind(this)}
              type='button'
            >
              Show Results
            </button>
            <button
              className='resetButton'
              onClick={this.resetHandler.bind(this)}
              type='button'
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
