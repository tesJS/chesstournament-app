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
      showResult: false,
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
    console.log('Show Result button clicked!');
    if (!this.state.showPlayersList) {
      newState.showPlayersList = true;
      newState.showResult = true;
      this.setState(newState);
    }
  }

  render() {
    console.log('The state: ', this.state);

    let pairedList = [],
      players,
      round = new Round(
        this.state.players,
        this.state.counter,
        this.state.currentRoundGames
      ),
      round1,
      listPlayers,
      showPlayersList = [];

    round1 = round.generateRoundGames();
    players = round.getPlayers();

    if (this.state.showPlayersList) {
      if (round1 != null) {
        this.state.currentRoundGames.push(round1);

        if (this.state.showResult) {
          pairedList = players.map((el, id) => {
            return (
              <div key={el.id}>
                <ListPlayers>
                  {el.name} - {el.score}
                </ListPlayers>
              </div>
            );
          });
          this.state.showResult = false;
        } else {
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
        <h2>Chess Tournament Software</h2>

        <div className='app-container'>
          <div className='item'>
            <span class='addPlayers'> Add Players</span>
            <Form submit={e => this.submitHandler(e)}></Form>
          </div>

          <div id='listOfGames' className='item listGames'>
            <span className='listPairs'> Complete List of Round Pairings </span>
            <p>
              <span className='listPairs'>
                Current Round {this.state.counter}
              </span>
            </p>
            {pairedList}
          </div>

          <div className='item'>
            <span className='listPlayers'>List of Players</span> {listPlayers}
          </div>

          <div className='item lowerHalf'>
            {/* <div>
              <h2>Lower Half Section</h2>{' '}
            </div> */}

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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
