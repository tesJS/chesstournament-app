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

  createAllGames(players) {
    let noPlayers = players.length;
    let allGames = [];
    //Create all possible games
    for (i = 0; i <= noPlayers - 2; i++) {
      player1 = players[i];
      for (j = i + 1; j <= noPlayers - 1; j++) {
        player2 = players[j];
        allGames.push(new Game(player1, player2));
      }
    }
    return allGames;
  }

  filterGames(games, player, players) {
    let o1ScoreDiff, o2ScoreDiff, o1EloDiff, o2EloDiff;

    //games which includes only players listed in the argument players
    let candidateGames = games.filter((el, ind) => {
      players.includes(el.player1 && el.player2);
      /*  if (el.player1 === player || el.player2 === player) return true;
      else return false; */
    });

    //list of games which include only the player in the argument
    let playerGames = candidateGames.filter((el, ind) => {
      if (el.player1 === player || el.player2 === player) return true;
      else return false;
    });

    var sortedPlayerGames = playerGames.sort((o1, o2) => {
      o1ScoreDiff = Math.abs(o1.player2.score - o1.player1.score);
      o1EloDiff = Math.abs(o1.player2.elo - o1.player1.elo);
      o2ScoreDiff = Math.abs(o2.player2.score - o2.player1.score);
      o2EloDiff = Math.abs(o2.player2.elo - o2.player1.elo);
      if (o1ScoreDiff == o2ScoreDiff) return o1EloDiff - o2EloDiff;
      else return o1ScoreDiff - o2ScoreDiff;
    });

    return sortedPlayerGames;
  }

  swapGameColors(game) {
    [game.player1, game.player2] = [game.player2, game.player1];
    return game;
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
        return [
          ...plList.sort(function (pl1, pl2) {
            return pl2.elo - pl1.elo;
          }),
        ];
      },
      sortPlayersByScore: function (plList) {
        return [
          ...plList.sort(function (pl1, pl2) {
            return pl2.score - pl1.score;
          }),
        ];
      },
      sortPlayersByWhiteTurns: function (plList) {
        return [
          ...plList.sort(function (pl1, pl2) {
            return pl2.whiteTurns - pl1.whiteTurns;
          }),
        ];
      },
    };
  }

  generateRoundGames() {
    let player1,
      player2,
      repeat = false,
      currPlaying = false;
    let roundGames = [],
      allGames = [];
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
    //sort players according to elo for first round
    // set mid point for first round pairing
    else if (evenPlayersList) {
      mid = noPlayers / 2;
    } else if (oddPlayersList) {
      sortPlayersByElo(players);
      mid = (noPlayers - 1) / 2;
      noPlayers--;
      byePlayer = players.pop();
    }
    allGames = this.createAllGames(players);

    //pair players for  round 1
    if (this.roundNo === 1) {
      sortPlayersByElo(players);

      for (i = 0; i <= noPlayers - 2; i++) {
        player1 = players[i];
        while (mid < players.length) {
          player2 = players[mid];
          var game = allGames.filter((el, ind) => {
            return el.player1.id == player1.id && el.player2.id == player2.id;
          });
          game.player1.whiteTurns++;
          roundGames.push(game);
          mid++;
          break;
        }
      }

      //take out the first round games from allGames
      roundGames.forEach(rd => {
        allGames.forEach((el, ind, arr) => {
          if (el.player1.id == rd.player1.id && el.player2.id == rd.player2.id)
            arr.splice(ind, 1);
        });
      });
    }

    // Procedure for the rest of the round
    else if (this.roundNo > 1) {
      // sort players according to score
      for (let player of players) {
        sortPlayersByScore(players);
        playerGames = this.filterGames(allGames, player, players);
        newPlayers = players.filter(
          (el, ind) =>
            el.player !== playerGames[0].player1 &&
            el.player !== playerGames[0].player2
        );
        players = newPlayers;
        roundGames.push(playerGames[0]);
      }
    }

    return roundGames;
  }
}

export default Round;
