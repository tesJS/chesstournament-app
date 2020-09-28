import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import ListPlayers from './ListOfPlayers';
import Pairings from './Pairings';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: auto;
  right: 0px;
  padding: 5px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [], newPlayer: false };
  }

  playRound() {
    const Player = function (name, elo, club, score) {
      name = this.name;
      elo = this.elo;
      club = this.club;
      score = this.score;
    };
    const counter = 0;
    const temp = [...this.state.players];
    const players = temp.map(el => new Player(el.name, el.elo, el.club));
    console.log(players);
  }

  DOMstrings = {
    inputName: '#name',
    inputElo: '#eloRating',
    inputClub: '#club',
  };

  submitHandler(event) {
    event.preventDefault();
    this.playRound();
    let newState = { ...this.state };
    let player = { name: '', elo: '', club: '' };
    let inputName = document.querySelector(this.DOMstrings.inputName);
    let inputElo = document.querySelector(this.DOMstrings.inputElo);
    let inputClub = document.querySelector(this.DOMstrings.inputClub);

    player.name = inputName.value;
    player.elo = inputElo.value;
    player.club = inputClub.value;

    if (inputName.value !== '' && inputElo.value !== '') {
      newState.players.push(player);
      newState.newPlayer = true;

      inputName.value = '';
      inputElo.value = '';
      inputClub.value = '';
      this.setState(newState);
    } else if (!(inputName.value !== '' && inputElo.value !== '')) {
      window.alert("Player's name and elo-rating are required!");
    }
  }

  render() {
    console.log(this.state);
    let paired = this.state.players.map(el => {
      return <Pairings player1={el.name} player2={el.name}></Pairings>;
    });
    let listPlayers = this.state.players.map((el, ind) => {
      return (
        <div key={ind}>
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
          <div>
            <Form submit={e => this.submitHandler(e)}></Form>
          </div>
          <div>
            Complete List of Round Pairings: <br></br>
            {paired}
            <StyledInput type='button' value='Finish'></StyledInput>
          </div>
          <div> {listPlayers} </div>
          <div>
            <h2>Lower Half Section</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
