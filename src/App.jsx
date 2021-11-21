import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
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
import cloneDeep from 'clone-deep';
import ContactForm from './ContactForm';
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
      tournamentID: '',
      tournamentRounds: -1,
      pairedList: [],
    };
  }
  tournamentForm;
  storeResults = [];
  DOMstrings = {
    inputName: '#name',
    inputElo: '#eloRating',
    inputClub: '#club',
  };

  componentDidMount() {
    PlayerService.getPlayers().then(response => {
      let newState = { ...this.state };
      let players = [];

      for (let i = 0; i < response.length; i++) {
        players.push(
          new Player(response[i].name, response[i].elo, response[i].club)
        );
        players[i].id = response[i].id;
      }
      newState.players = players;
      /* let saveButton = document.querySelector('.showSaveButton');
      saveButton.disabled=true; */
      this.setState(newState);
    });
  }

  //Save each players score to tournamentreults table in chesstourDB
  saveButtonHandler(players) {
    let tourid = this.state.tournamentID;
    let noRounds = this.state.tournamentRounds;
    let playerid;

    //If the user enters tournament id and the minimum number of rounds played is equal or greater than the one filled in the tournament form
    if (tourid !== '' && this.state.counter >= noRounds) {
      this.state.players.forEach(el => {
        playerid = parseInt(el.id);
        PlayerService.postTournamentResult(
          new TournamentResult(playerid, tourid, el.score.toString())
        );
      });
      PlayerService.postTournament(this.tournamentForm);
      this.resetHandler(); //and then reset the page
    } else
      alert(
        'Enter the tournament form or play the minimum no of rounds not less than the one in the tournament form!!!'
      );
  }

  //Save tournament form data to Tournament table in chesstourDB
  submitTourHandler(event) {
    event.preventDefault();
    let newState = { ...this.state };
    let tourdetailsField = document.querySelector('#tournamentDesc');
    let noplayersField = document.querySelector('#noplayers');
    let noroundsField = document.querySelector('#rounds');
    let touridField = document.querySelector('#tourid');

    let noplayers = cloneDeep(parseInt(noplayersField.value));
    let tourdetails = cloneDeep(tourdetailsField.value);
    let norounds = cloneDeep(noroundsField.value);
    let tourid = cloneDeep(touridField.value);

    /* PlayerService.postTournament(
      new Tournament(noplayers, tourdetails.value, norounds.value, tourid.value)
    ); */
    this.tournamentForm = new Tournament(
      noplayers,
      tourdetails,
      norounds,
      tourid
    );
    newState.tournamentID = tourid; // to link registering the tournamentresults table  to this tournament
    newState.tournamentRounds = norounds; // to link registering the tournamentresults table  to this tournament
    tourdetailsField.value = '';
    noplayersField.value = '';
    noroundsField.value = '';
    touridField.value = '';

    this.setState(newState);
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
    let newState = { ...this.state },
      currentRoundGames;
    newState.counter++;
    if (newState.counter == 1) {
      let firstRound = new Round(newState.players, newState.counter, null);
      currentRoundGames = firstRound.generateRoundGames();
      newState.players = firstRound.getPlayers(); // to validate the list of players participating in the round
    } else {
      let otherRounds = new Round(
        newState.players,
        newState.counter,
        newState.currentRoundGames
      );
      currentRoundGames = otherRounds.generateRoundGames();
    }

    //if round games   generator does not return null
    if (currentRoundGames != null) {
      newState.currentRoundGames.push(currentRoundGames);
      newState.pairButtonClicked = true;
      newState.submitResultButtonClicked = false;
      newState.pairedList = [];
      //store list of paired players to pairedList variable
      for (var i = 0; i < currentRoundGames.length; i++) {
        newState.pairedList.push(
          <Pairings
            key={`${currentRoundGames[i].player1.id} ${currentRoundGames[i].player2.id}`}
            player1={currentRoundGames[i].player1.name}
            player2={currentRoundGames[i].player2.name}
            players={`${currentRoundGames[i].player1.id} ${currentRoundGames[i].player2.id}`}
            selected={this.selectHandler.bind(this)}
          ></Pairings>
        );
      }
      let pairButton = document.querySelector('.pairButton');
      let saveButton = document.querySelector('.showSaveButton');
      pairButton.disabled = true;
      //if user entered tournament form and minimum number of rounds played then enable save button
      if (
        newState.counter >= newState.tournamentRounds &&
        newState.tournamentRounds !== -1
      )
        saveButton.disabled = false;
      this.setState(newState);
    }
    //if round games   generator does return null, max round reached
    else {
      alert(
        'Maximum Round Reached!!! \n Press Show Button to see full standings or save button to save the tournament data!!!'
      );
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
      return el.id == str;
    });
    if (searchIndex >= 0) this.storeResults.splice(searchIndex, 1);
    if (result !== 'default') this.storeResults.push({ id: str, result });
  }

  //called in connection with resethandler method to reset state parameters
  setStatus(newState) {
    newState.resetButtonClicked = false;
    newState.showResultButtonClicked = false;
    newState.submitResultButtonClicked = false;
    newState.pairButtonClicked = false;
    newState.currentRoundGames = [];
    newState.showPlayersList = false;
    newState.players.forEach(el => {
      el.score = 0; //each player's score is reset
      el.oppList = []; //each player's list is reset
      el.whiteTurns = 0; //each player's list is reset
    });
    newState.pairedList = [];
  }
  //Submit Results Button after the round games list - to enter the round games result
  roundResultHandler(e) {
    let newState = { ...this.state };
    let noPlayers = this.state.players.length;
    let gamesPerRound = Math.floor(noPlayers / 2);

    if (newState.pairButtonClicked) {
      let pairButton = document.querySelector('.pairButton');
      pairButton.disabled = false;
      if (this.storeResults.length === gamesPerRound) {
        this.storeResults.forEach(el => {
          this.selectProsessor(el);
        });
        newState.pairedList = [];
        newState.submitResultButtonClicked = true;
        newState.pairButtonClicked = false;
        this.storeResults = [];
        this.setState(newState);
      } else {
        window.alert("Enter all games' results!");
      }
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
    let sortedPlayersByScore = newState.players.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });
    if (!newState.pairButtonClicked) {
      newState.showResultButtonClicked = true;

      newState.pairedList = sortedPlayersByScore.map((el, id) => {
        return (
          <div className='playersList' key={el.id}>
            {el.name} - {el.score}
          </div>
        );
      });

      this.setState(newState);
    } else alert('Enter round results or reset the tournament!');
  }
  resetHandler() {
    let newState = { ...this.state };
    let pairButton = document.querySelector('.pairButton');
    pairButton.disabled = false;
    newState.counter = 0;
    this.setStatus(newState);

    console.log('The state from Reset Handler', newState);
    this.setState(newState);
  }

  render() {
    console.log(
      '*****************************The state from Render method**************************************',
      this.state
    );

    let sortedPlayersByScore = this.state.players.sort(function (pl1, pl2) {
      return pl2.score - pl1.score;
    });

    let listPlayers = sortedPlayersByScore.map((el, ind) => {
      return (
        <div className='list' key={el.id}>
          {el.name} {el.elo} {el.club} {el.score}
        </div>
      );
    });

    return (
      <div className='App'>
        <Router>
          <div className='header items'>
            <h2> Chess Tournament Software </h2>
            <ul className='App-header'>
              <li>
                <Link style={{ color: 'white', textDecoration: 'none' }} to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/tour'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Tournament Form
                </Link>
              </li>
              <li>
                <Link
                  to='/add'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Add
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className='body items'>
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Home
                    {...props}
                    listOfPlayers={listPlayers}
                    pairedHandler={this.pairedHandler.bind(this)}
                    resetHandler={this.resetHandler.bind(this)}
                    counter={this.state.counter}
                    roundResultHandler={this.roundResultHandler.bind(this)}
                    pairList={this.state.pairedList}
                    showResultHandler={this.showResultHandler.bind(this)}
                    saveButtonHandler={this.saveButtonHandler.bind(
                      this,
                      this.state.players
                    )}
                  />
                )}
              />
              <Route
                exact
                path='/add'
                render={props => (
                  <AddPlayerSection
                    {...props}
                    submit={this.submitPlayerHandler.bind(this)}
                  />
                )}
              />

              <Route
                exact
                path='/tour'
                exact
                render={props => (
                  <TourForm
                    {...props}
                    submitTourForm={this.submitTourHandler.bind(this)}
                  />
                )}
              />

              <Route exact path='/contact' component={ContactForm} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
