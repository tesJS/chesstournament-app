import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import './App.css';
import Pairings from './Pairings';
import PlayerService from './data/PlayerService';
import Player from './data/Player';
import Round from './data/Round';
import TourForm from './TournamentForm';
import AddPlayerSection from './AddPlayerSection';
import Home from './Home';
import Tournament from './data/Tournament';
import TournamentResult from './data/TournamentResult';

/* 

     newState.players = [
     new Player('Tesfaye Asfaw', 1985, 'Helsingin Shakki Klubbi'),
     new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
     new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
     new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
     new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'),
     new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'),
   ];


[ {"id":1,"name":"Anatoly Karpov","elo":"2678","club":"USSR Chess Federation"},
  
,
  {"id":3,"name":"Solomon Assefa","elo":"2340","club":"Ethiopian Chess Federation"},
  { "id":4,"name":"Leykun Assefa","elo":"2340","club":"Ethiopian Chess Federation"},
  {"id":5,"name":"Yimam","elo":"2078","club":"Ethiopian Chess Federation"},
  { "id":6,"name":"Kramnik","elo":"2340","club":"USSR Chess Federation"}
]
 
new Player('Tesfaye Asfaw', 1985, 'Helsingin Shakki Klubbi'),
       new Player('Garry Kasparov', 2854, 'St Lous Chess Club'),
       new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'),
       new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'),
       new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'),
       new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'), */
/* new Player('Kiros Alemayehu', 1500, 'Tigray Chess Federation'),
new Player('Hagos Berhe', 1700, 'Tigray Chess Federation'), */

/* let players=[];
players.push(new Player('Tesfaye Asfaw', 1985, 'Helsingin Shakki Klubbi'));
players.push(new Player('Garry Kasparov', 2854, 'St Lous Chess Club'));
players.push(new Player('Vladmir Kramnik', 2809, 'Russian Federation Chess'));
players.push(new Player('Elleni Nega', 1678, 'Ethiopian Chess Federation'));
players.push(new Player('Solomon Assefa', 2178, 'Ethiopian Chess Federation'));
players.push( new Player('Tewolde Abay', 2300, 'Tigray Chess Federation'));
for(let i=0;i<players.length;i++)    
PlayerService.postPlayer(players[i]); */


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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      counter: 0,
      finalRound: false,
      showResult: false,
      showPlayersList: false,
      currentRoundGames: [],
      pairButtonClicked: false,
      showResultButtonClicked: false,
      submitResultButtonClicked: false,
      resetButtonClicked: false,
      tournamentID: ""
    };
    console.log('Constructor:- ', document);
    /* this.state.players.forEach(el => {
      el.setId();
    }); */
  }

  storeResults = [];
  DOMstrings = {
    inputName: '#name',
    inputElo: '#eloRating',
    inputClub: '#club',
  };


  componentDidMount() {

    PlayerService.getPlayers().then((response) => {
      let newState = { ...this.state };
      let players = [];

      for (let i = 0; i < response.length; i++) {
        players.push(new Player(response[i].name, response[i].elo, response[i].club))
        players[i].id = response[i].id;
      }
      newState.players = players;
      console.log("From ComponentDidMount oldState:- ", this.state);
      console.log("From ComponentDidMount newState:- ", newState);
      this.setState(newState);

    });
  }

  //Save each players score to tournamentreults table in chesstourDB 
  saveButtonHandler(players) {
    let tourid = this.state.tournamentID;
    let playerid;
    if (tourid !== "") {

      players.forEach((el) => {

        playerid= parseInt(el.id);
        PlayerService.postTournamentResult(new TournamentResult(playerid,tourid, el.score));

      });
    }
  }


  //Save tournament form data to Tournament table in chesstourDB 
  submitTourHandler(event) {
    event.preventDefault();
    let newState = { ...this.state };
    let tourdetails = document.querySelector('#tournamentDesc');
    let noplayersField = document.querySelector("#noplayers");
    let norounds = document.querySelector("#rounds");
    let tourid = document.querySelector("#tourid");
    let noplayers = parseInt(noplayersField.value);

    PlayerService.postTournament(new Tournament(noplayers, tourdetails.value, norounds.value, tourid.value));


    newState.tournamentID = tourid.value;// to link registering the tournamentresults table  to this tournament
    tourdetails.value = '';
    noplayersField.value = '';
    norounds.value = '';
    tourid.value = ''
    
    this.setState(newState)


  }
  submitPlayerHandler(event) {
    event.preventDefault();



    let newState = { ...this.state };


    let inputName = document.querySelector(this.DOMstrings.inputName);
    let inputElo = document.querySelector(this.DOMstrings.inputElo);
    let inputClub = document.querySelector(this.DOMstrings.inputClub);

    let player = new Player(inputName.value, inputElo.value, inputClub.value);
    PlayerService.postPlayer(player); // save it to database 
    //player.setId();

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

    console.log("State returned after  TourFormHandler:- ", this.state);
    if (!newState.pairButtonClicked) {
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
      return el.id == str;
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
      return el.id == ids[0];
    });
    let player2 = players.filter(el => {
      return el.id == ids[1];
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

      newState.showResultButtonClicked = true;
      console.log('The state from showResultButton', newState);
      this.setState(newState);
    } else alert('Enter round results or reset the tournament!');
  }
  resetHandler() {
    let newState = { ...this.state };

    newState.counter = 0;
    newState.resetButtonClicked = true;
    newState.currentRoundGames = [];
    newState.players.forEach((el) => {
      el.score = 0;
    });
    console.log('The state from resetHandler', newState);
    this.setState(newState);
  }

  render() {
    let pairedList = [], players,
      round = new Round(
        this.state.players,
        this.state.counter,
        this.state.currentRoundGames
      ),
      round1,
      round2 = new Round(this.state.players, 1, null);

    players = round2.getPlayers();

    let listPlayers = players.map((el, ind) => {
      return (
        <div key={el.id}>

          {el.name} {el.elo} {el.club} {el.score}

        </div>
      );
    });
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
        let newState = { ...this.state };
        newState.counter--;
        newState.finalRound = true;
        this.setState(newState);
        alert(
          'Maximum Round Reached!!! \n Press Show Button to see full standings!'
        );
      }
    } else if (this.state.showResultButtonClicked) {
      pairedList = players.map((el, id) => {
        return (
          <div className="playersList" key={el.id}>

            {el.name} - {el.score}

          </div>
        );
      });
    }



    return (
      <div className="App">
        <Router>

          <div className="header items">

            <h2> Chess Tournament Software </h2>
            <ul className="App-header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tour">Tournament Form</Link>
              </li>
              <li>
                <Link to="/add">Add</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>


          </div>

          <div className="body items">

            <Switch>

              <Route
                exact path="/"
                render={(props) =>
                  <Home {...props}
                    listOfPlayers={listPlayers}
                    pairedHandler={this.pairedHandler.bind(this)}
                    resetHandler={this.resetHandler.bind(this)}
                    counter={this.state.counter}
                    roundResultHandler={this.roundResultHandler.bind(this)}
                    pairedList={pairedList}
                    showResultHandler={this.showResultHandler.bind(this)}
                    saveButtonHandler={this.saveButtonHandler.bind(this, this.state.players)} />
                }
              />
              <Route exact path="/add"
                render={(props) => <AddPlayerSection {...props} submit={this.submitPlayerHandler.bind(this)} />} />

              <Route exact path="/tour" exact render={(props) => <TourForm {...props} submitTourForm={this.submitTourHandler.bind(this)} />} />

            </Switch>
          </div>



        </Router></div>

    );

  }
}

export default App;
