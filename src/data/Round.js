import Player from './Player';
import Game from './Game';

class Round {
  constructor(listOfPlayers, roundNo) {
    this.listOfPlayers = listOfPlayers;
    this.roundNo = roundNo;
  }

  generateRoundGames() {
    let player1, player2, game;
    let singlePlayer = false;
    let oddPlayersList = false;
    let evenPlayersList = false;
    let roundGames = [];
    let noPlayers = this.listOfPlayers.length;
    let players = this.listOfPlayers;
    var i;
    let mid = noPlayers / 2;

    if (noPlayers < 2) singlePlayer = true;
    else if (noPlayers % 2 !== 0) oddPlayersList = true;
    else if (noPlayers % 2 === 0) evenPlayersList = true;

    if (singlePlayer) console.log('Need atleast 2 players to play a round!!!');
    else if (this.roundNo === 1 && !singlePlayer) {
      players.sort((pl1, pl2) => {
        return pl1.elo - pl2.elo;
      });
      if (evenPlayersList) {
        mid = noPlayers / 2;

        for (i = 0; i < mid; i++) {
          player1 = players[i];
          while (mid < players.length) {
            player2 = players[mid];
            roundGames.push(new Game(player1, player2));
            mid++;
            break;
          }
        }
      } else if (oddPlayersList) {
        mid = (noPlayers - 1) / 2;
        for (i = 0; i < mid; i++) {
          player1 = players[i];
          while (mid < players.length - 1) {
            player2 = players[mid];
            roundGames.push(new Game(player1, player2));
            mid++;
            break;
          }
        }
      }
    }

    return roundGames;
  }
}

export default Round;
