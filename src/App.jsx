import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import ListPlayers from './ListOfPlayers';
import Pairings from './Pairings';
import styled from 'styled-components';

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
    this.state = { players: [], pairedButton: false };
  }

  playRound() {
    const Player = function (name, elo, club, score, opponent) {
      name = this.name;
      elo = this.elo;
      club = this.club;
      score = this.score;
    };
    const counter = 0;
    const temp = [...this.state.players];
    const players = temp.map(el => new Player(el.name, el.elo, el.club));
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
      newState.pairedButton = false;

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
    newState.pairedButton = true;
    this.setState(newState);
  }

  render() {
    let pairedList = [];
    if (this.state.pairedButton) {
      let player1 = [];
      let player2 = [];
      this.state.players.forEach((el, ind) => {
        if (ind % 2 == 0) player1.push(el);
        else player2.push(el);
      });
      console.log(player1, player2);

      for (var i = 0; i < player1.length; i++)
        pairedList.push(
          <Pairings alt1={player1[i].name} alt2={player2[i].name}></Pairings>
        );
    }

    console.log(this.state);

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
            {pairedList}
          </div>
          <div> {listPlayers} </div>
          <div className='lowerHalf'>
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
