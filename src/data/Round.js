import Player from './Player';
import Game from './Game';

class Round {
  constructor(listOfPlayers, roundNo) {
    this.listOfPlayers = listOfPlayers;
    this.roundNo = roundNo;
    listOfPlayers.forEach(el => {
      el.setId();
    });
    console.log('Round Class', listOfPlayers);
  }
  nodesGenerator(players) {
    let player1, player2;
    let nodes = [];
    let noPlayers = players.length;
    var i,
      j = 0,
      byePlayer;
    let mid = noPlayers / 2;
    let gamesPerRound = players.length / 2;

    for (i = 0; i < noPlayers - 1; i++) {
      j++;
      player1 = players[i];
      player2 = players[j];
      nodes.push(new Game(player1, player2));
    }
    return nodes;
  }

  checkNodes(nodes) {
    let repeatGames = [];
    nodes.array.forEach((el, ind) => {
      if (el.player1.getOpponentList().includes(el.player2))
        repeatGames.push(ind);
    });
    return repeatGames;
  }

  totalPlayers(playersList) {
    let singlePlayer = false;
    let oddPlayersList = false;
    let evenPlayersList = false;
    let noPlayers = playersList.length;
    let repeat;

    if (noPlayers < 2) singlePlayer = true;
    else if (noPlayers % 2 !== 0) oddPlayersList = true;
    else if (noPlayers % 2 === 0) evenPlayersList = true;

    return {
      singlePlayer,
      oddPlayersList,
      evenPlayersList,
      sortPlayersByElo: function (plList) {
        plList.sort(function (pl1, pl2) {
          return pl2.elo - pl1.elo;
        });
      },
      sortPlayersByScore: function (plList) {
        plList.sort(function (pl1, pl2) {
          return pl1.score - pl2.score;
        });
      },
      sortPlayersByWhiteTurns: function (plList) {
        plList.sort(function (pl1, pl2) {
          return pl2.whiteTurns - pl1.whiteTurns;
        });
      },
    };
  }

  generateRoundGames() {
    let player1, player2, repeat;
    let roundGames = [];
    let noPlayers = this.listOfPlayers.length;
    let players = [...this.listOfPlayers];
    var i, j, byePlayer;
    let mid = noPlayers / 2;
    let gamesPerRound = roundGames.length;
    const {
      singlePlayer,
      oddPlayersList,
      evenPlayersList,
      sortPlayersByElo,
      sortPlayersByScore,
      sortPlayersByWhiteTurns,
    } = this.totalPlayers(players);

    if (singlePlayer) console.log('Need atleast 2 players to play a round!!!');
    else {
      //sort players according to elo for first round

      // set mid point for first round pairing
      if (evenPlayersList) {
        mid = noPlayers / 2;
      } else if (oddPlayersList) {
        sortPlayersByElo(players);
        mid = (noPlayers - 1) / 2;
        noPlayers--;
        byePlayer = players.pop();
      }
      //pair players for  round 1
      if (this.roundNo === 1) {
        sortPlayersByElo(players);
        for (i = 0; i <= noPlayers - 2; i++) {
          player1 = players[i];
          while (mid < players.length) {
            player2 = players[mid];
            roundGames.push(new Game(player1, player2));
            mid++;
            break;
          }
        }
      }
      // Procedure for rest of round
      else if (this.roundNo > 1) {
        // sort players according to score
        sortPlayersByScore(players);

        for (i = 0; i <= noPlayers - 2; i += 2) {
          player1 = players[i];
          for (j = i + 1; j <= noPlayers - 1; j += 2) {
            player2 = players[j];
            repeat = player1.oppList.includes(players[j]);
            if (!repeat && player1.id !== player2.id) {
              if (player1.whiteTurns > player2.whiteTurns)
                [player1, player2] = [player2, player1];
              player1.whiteTurns++;
              player1.setOpponentList(player2);
              player2.setOpponentList(player1);
              roundGames.push(new Game(player1, player2));
              break;
            }
          }
        }
      }
    }

    return roundGames;
  }
}

export default Round;
