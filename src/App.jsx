import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import ListPlayers from './ListOfPlayers';
import Pairings from './Pairings';
import styled from 'styled-components';
import uniqid from 'uniqid';

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
    this.state = { players: [], pairButton: false };
  }
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
    let uniqid = require('uniqid');
    let player = { id: '', name: '', elo: '', club: '' };
    let inputName = document.querySelector(this.DOMstrings.inputName);
    let inputElo = document.querySelector(this.DOMstrings.inputElo);
    let inputClub = document.querySelector(this.DOMstrings.inputClub);

    player.name = inputName.value;
    player.elo = inputElo.value;
    player.club = inputClub.value;
    player.id = uniqid();

    if (inputName.value !== '' && inputElo.value !== '') {
      newState.players.push(player);
      newState.pairButton = false;

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
    newState.pairButton = true;
    this.setState(newState);
  }

  updatePlayers(e) {
    console.log(e.target.value);
  }

  selectHandler(e) {
    /* document
      .querySelector('.listGames')
      .addEventListener('onchange', this.updatePlayers); */
    let str = e.target.parentNode.className;
    let ids = str.split(' ');
    console.log(ids);
    console.log(e.target.value);
  }

  render() {
    let pairedList = [];
    if (this.state.pairButton) {
      let player1 = [];
      let singlePlayer = false;
      let oddPlayersList = false;
      let evenPlayersList = false;
      let player2 = [];
      let players = [...this.state.players];
      let length = players.length;
      console.log('Length', length);
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
      console.log('Player1', player1);
      console.log('Player2', player2);

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

    console.log(this.state);

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
            <br></br>
            {pairedList}
          </div>

          <div className='item'> {listPlayers} </div>

          <div className='item lowerHalf'>
            <div>
              <h2>Lower Half Section</h2>{' '}
            </div>

            <div className='pairButton'>
              {' '}
              <StyledInput
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
