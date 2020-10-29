import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import ListPlayers from './ListOfPlayers';
import Pairings from './Pairings';
import styled from 'styled-components';
import Player from './data/Player';
import Round from './data/Round';

const StyledInput = styled.input`
  width: 200px;
  height: 50px;
  background-color: dodgerblue;
  color: white;
  right: 0px;
  padding: 5px;
  font-size: large;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [
        new Player('Tesfaye Tassew', 1985, 'Helsingin Shakki Klubbi'),
        new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
        new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
        new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
        new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'),
      ],
      counter: 0,
      showPlayersList: false,
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

  /* playRound() {
    const Player = function (name, elo, club, score, opponent) {
      this.id = uniqid();
      this.name = name;
      this.elo = elo;
      this.club = club;
      this.score = score;
    };
    const counter = 0;
    const temp = [...this.state.players];
    const players = temp.map(el => new Player(el.id, el.elo, el.club));
  } */

  submitHandler(event) {
    event.preventDefault();
    //this.playRound();
    let newState = { ...this.state };

    //let uniqid = require('uniqid');

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
  pairedHandler() {
    let newState = { ...this.state };

    if (!this.state.showPlayersList) {
      /* newState.pairButton = true;
      newState.resultButton = false; */
      newState.showPlayersList = true;
      newState.counter++;
      this.setState(newState);
    }
    console.log('Pair Button', this.state);

    //document.querySelector('.submitResults').disabled = true;
  }

  /* updatePlayers(e) {
    console.log(e.target.value);
  } */

  selectHandler(e) {
    /* document
      .querySelector('.listGames')
      .addEventListener('onchange', this.updatePlayers); */

    let result = e.target.value;
    let str = e.target.parentNode.className;
    let players = [...this.state.players];

    let obj = {};
    let ids = str.split(' ');
    obj.id = ids;

    let searchIndex = this.storeResults.findIndex(el => {
      return el.id === str;
    });
    if (searchIndex >= 0) this.storeResults.splice(searchIndex, 1);
    if (result !== 'default') this.storeResults.push({ id: str, result });
    console.log(this.storeResults);
  }

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
    } else if (!newState.showPlayersList) alert('Proceed to Next Round!');
    else alert('Enter all games result!');

    /*  this.state.players.forEach(el => {
      console.log(el);
    }); */
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

  render() {
    console.log('Result Button State', this.state);
    console.log('Paired List:- ', this.pairedList);
    console.log('This.storeResults :-', this.storeResults);
    console.log('Counter:- ', this.state.counter);
    const style = { border: '1px solid blue' };
    let pairedList = [];
    if (this.state.showPlayersList) {
      {
        let round = new Round(this.state.players, this.state.counter);
        let round1 = round.generateRoundGames();

        for (var i = 0; i < round1.length; i++) {
          pairedList.push(
            <Pairings
              key={`${round1[i].player1.id} + ${round1[i].player2.id}`}
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

            <div className='pairButton'>
              {' '}
              <StyledInput
                id='pairButton'
                onClick={this.pairedHandler.bind(this)}
                type='button'
                value='Pair players'
              ></StyledInput>{' '}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/* 

{
    let pairedList = [];
    if (this.state.pairButton) {
      let player1 = [];
      let singlePlayer = false;
      let oddPlayersList = false;
      let evenPlayersList = false;
      let player2 = [];
      let players = [...this.state.players];
      let length = players.length;

      if (length < 2) singlePlayer = true;
      else if (length % 2 !== 0) oddPlayersList = true;
      else evenPlayersList = true;

      if (!singlePlayer) {
        if (evenPlayersList) {
          players.forEach((el, ind) => {
            if (ind % 2 == 0) player1.push(el);
            else player2.push(el);
          });
        }
      }

      if (oddPlayersList) {
        let unpairedPlayer = players.pop();
        console.log('Unpaired Player', unpairedPlayer);
        players.forEach((el, ind) => {
          if (ind % 2 == 0) player1.push(el);
          else player2.push(el);
        });
      }

      for (var i = 0; i < player1.length; i++)
        pairedList.push(
          <Pairings
            key={`${player1[i].id} + ${player2[i].id}`}
            player1={player1[i].name}
            player2={player2[i].name}
            players={`${player1[i].id} ${player2[i].id}`}
            selected={this.selectHandler.bind(this)}
          ></Pairings>
        );
    }

    console.log('The state', this.state);

    let listPlayers = this.state.players.map((el, ind) => {
      return (
        <div key={el.id}>
          <ListPlayers>
            {el.name} {el.elo} {el.club}
          </ListPlayers>
        </div>
      );
    }); 
    
    
    
  selectHandler(e) {
     document
      .querySelector('.listGames')
      .addEventListener('onchange', this.updatePlayers); 
    
    this.pairedListSize++;
    let result = e.target.value;
    let str = e.target.parentNode.className;
    let players = [...this.state.players];

let obj={};
    let ids = str.split(' ');
    obj.id=ids;
    this.storeResults.push({id:ids,result});

    
    let player1 = players.filter(el => {
      return el.id === ids[0];
    });
    let player2 = players.filter(el => {
      return el.id === ids[1];
    });

    /* if (result == 'win') console.log(player1[0].name + ' wins');
    else if (result == 'lose') console.log(player2[0].name + ' wins'); 

    switch (result) {
      case 'win':
        console.log('Player 1 wins');
        player1[0].setWhiteTurns();
        player1[0].setScore(1);
        break;
      case 'lose':
        console.log('Player 2 wins');
        player1[0].setWhiteTurns();
        player2[0].setScore(1);
        break;
      case 'draw':
        player1[0].setWhiteTurns();
        player1[0].setScore(0.5);
        player2[0].setScore(0.5);

        break;
    }
    console.log('Player1 ', player1[0]);
    console.log('Player2 ', player2[0]);
    /* console.log('the payers from the state', players);
    console.log(ids);
    console.log('Player1 type ', typeof player1); 
  }

*/
