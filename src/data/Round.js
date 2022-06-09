import Player from "./Player";
import Game from "./Game";

class Round {
  constructor(listOfPlayers, roundNo, allGamesPlayed) {
    this.listOfPlayers = listOfPlayers;
    this.roundNo = roundNo;
    this.allGamesPlayed = allGamesPlayed;
  }

  getPlayers() {
    return this.sortPlayers().sortPlayersByScore(this.listOfPlayers);
  }

  createAllGames(players) {
    let noPlayers = players.length;
    let allGames = [];
    let i, j, player1, player2;
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

  filterGames(allGames, player, players) {
    let o1ScoreDiff, o2ScoreDiff, o1EloDiff, o2EloDiff, bool1, bool2;
    let allGamesPlayed = this.allGamesPlayed.flat(),
      gamesYetToPlay,
      candidateGames,
      playerGames;

    //games which includes only players listed in the argument players
    if (
      allGamesPlayed.length > 0 &&
      players.length > 0 &&
      allGames.length > 0
    ) {
      gamesYetToPlay = allGames.filter((game, outerIndex) => {
        bool2 = !allGamesPlayed.some((playedGame, innerIdex) => {
          bool1 =
            (game.player1.id === playedGame.player1.id ||
              game.player1.id === playedGame.player2.id) &&
            (game.player2.id === playedGame.player1.id ||
              game.player2.id === playedGame.player2.id);
          return bool1;
        });
        return bool2;
      });

      candidateGames = gamesYetToPlay.filter((game) => {
        var bool1 = players.some((el) => {
          return el.id === game.player1.id;
        });
        var bool2 = players.some((el) => {
          return el.id === game.player2.id;
        });
        return bool1 && bool2;
      });
      playerGames = candidateGames.filter((game) => {
        return game.player1.id === player.id || game.player2.id === player.id;
      });

      /* playerGames = candidateGames.filter(game => {
        return game.player1.id === player.id || game.player2.id === player.id;
      }); */

      var sortedPlayerGames = playerGames.sort((o1, o2) => {
        o1ScoreDiff = Math.abs(o1.player2.score - o1.player1.score);
        o1EloDiff = Math.abs(o1.player2.elo - o1.player1.elo);
        o2ScoreDiff = Math.abs(o2.player2.score - o2.player1.score);
        o2EloDiff = Math.abs(o2.player2.elo - o2.player1.elo);
        if (o1ScoreDiff === o2ScoreDiff) return o1EloDiff - o2EloDiff;
        else return o1ScoreDiff - o2ScoreDiff;
      });
      return sortedPlayerGames;
    } else return null;
  }

  swapGameColors(game) {
    [game.player1, game.player2] = [game.player2, game.player1];
    return game;
  }

  sortPlayers() {
    return {
      shufflePlayers: function (playersList) {
        return [
          ...playersList.sort(function (pl1, pl2) {
            return Math.random() - 0.5;
          }),
        ];
      },
      sortPlayersByElo: function (playersList) {
        return [
          ...playersList.sort(function (pl1, pl2) {
            return pl2.elo - pl1.elo;
          }),
        ];
      },
      sortPlayersByScore: function (playersList) {
        return [
          ...playersList.sort(function (pl1, pl2) {
            return pl2.score - pl1.score;
          }),
        ];
      },
      sortPlayersByWhiteTurns: function (playersList) {
        return [
          ...playersList.sort(function (pl1, pl2) {
            return pl1.whiteTurns - pl2.whiteTurns;
          }),
        ];
      },
    };
  }
  //check if playersList is even odd or less than 2
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
    };
  }
  generateRoundGames() {
    let player1,
      players1,
      player2,
      players2,
      playerGames,
      game,
      pairedPlayers = [],
      unpairedPlayers = [],
      totalUnpairedPlayers = [],
      bool,
      byePlayer,
      pairDisorder = false,
      isNotPaired = true;

    let roundGames = [],
      allGames = [];
    let noPlayers = this.listOfPlayers.length;
    let players = this.listOfPlayers;
    var i,
      counter = 0;
    let mid = noPlayers / 2;
    let gamesPerRound;
    const { singlePlayer, oddPlayersList, evenPlayersList } =
      this.totalPlayers(players);
    const { sortPlayersByElo, sortPlayersByScore, shufflePlayers } =
      this.sortPlayers();

    if (singlePlayer) console.log("Need atleast 2 players to play a round!!!");
    //sort players according to elo for first round
    // set mid point for first round pairing
    else if (evenPlayersList) {
      players = sortPlayersByElo(players.slice());
      mid = noPlayers / 2;
      gamesPerRound = noPlayers / 2;
    } else if (oddPlayersList) {
      players = sortPlayersByElo(players.slice());
      mid = (noPlayers - 1) / 2;
      noPlayers--;
      gamesPerRound = noPlayers / 2;
      byePlayer = players.pop();
    }
    allGames = this.createAllGames(players);

    //pair players for  round 1
    if (this.roundNo === 1) {
      players = sortPlayersByElo(players.slice());

      for (i = 0; i <= noPlayers - 2; i++) {
        player1 = players[i];
        while (mid < players.length) {
          player2 = players[mid];

          game = allGames.filter((el) => {
            return el.player1.id == player1.id && el.player2.id == player2.id;
          });
          game = game[0];
          game.player1.oppList.push(player2.name);

          roundGames.push(game);
          mid++;
          break;
        }
      }
      return roundGames;
    }

    // Procedure for the rest of the round
    else if (this.roundNo > 1) {
      // sort players according to score

      while (isNotPaired) {
        counter++; // used to set pairdisorer boolean so as to break out of the while loop if the for loop fails to generate all the round games after 10 tries

        // for loop to generate the round's each game
        for (let j = 0; j < gamesPerRound; j++) {
          // In case of the last remaining two players in the players array
          //each iteration generates each round game
          if (players.length == 2) {
            bool = this.allGamesPlayed.flat().some((el) => {
              return (
                (el.player1.id === players[0].id ||
                  el.player1.id === players[1].id) &&
                (el.player2.id === players[0].id ||
                  el.player2.id === players[1].id)
              );
            });
            if (bool) {
              players = [];
            } else {
              roundGames.push(new Game(players[0], players[1]));
              players = [];
            }
          } else {
            if (counter === 1) {
              sortPlayersByScore(players);
            } else {
              players1 = [...players];

              players = shufflePlayers(players);
              players2 = [...players];
            }
            playerGames = this.filterGames(allGames, players[0], players);
            if (playerGames !== null) {
              if (playerGames.length > 0) {
                pairedPlayers.push(playerGames[0].player1);
                pairedPlayers.push(playerGames[0].player2);
                pairedPlayers = pairedPlayers.flat();
                roundGames.push(playerGames[0]);
              }
            }

            unpairedPlayers = players.filter((elt, ind) => {
              return !pairedPlayers.some((el) => {
                return elt.id === el.id;
              });
            });

            totalUnpairedPlayers = unpairedPlayers.flat();

            players = totalUnpairedPlayers;
          }
        } // end of for loop

        if (roundGames.length === gamesPerRound) {
          roundGames.forEach((el) => {
            el.player1.oppList.push(el.player2.name);
          });
          isNotPaired = false;
        } else if (counter < 10) {
          roundGames = [];
          players = this.listOfPlayers;
          pairedPlayers = [];
          unpairedPlayers = [];
          totalUnpairedPlayers = [];
        } else if (counter > 10) {
          pairDisorder = true;
          isNotPaired = false;
        }
      } //end of while loop
      if (!pairDisorder) {
        roundGames.forEach((game) => {
          game.setPlayersColor();
        }); // makes use of each player whiteturns counts to set which player takes the white pieces
        return roundGames;
      } else return null;
    }
  }
}

export default Round;
