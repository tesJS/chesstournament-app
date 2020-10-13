import Player from './Player';

export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  setPlayersColor() {
    if (this.player1.getWhiteTurns() > this.player2.getWhiteTurns())
      [this.player1, this.player2] = [this.player2, this.player1];
    else if (this.player1.getWhiteTurns() <= this.player2.getWhiteTurns())
      [this.player1, this.player2] = [this.player1, this.player2];
  }

  /*  alreadyPlayed() {
    opponentsList = [...this.player1.getOpponentList()];
    if (
      opponentsList.some(el => {
        el.id === this.player2.id;
      })
    )
      return false;
    else return true;
  } */

  setResult(result) {
    if (result === 'win') {
      this.player1.score += 1;
    } else if (result === 'draw') {
      this.player1.score += 0.5;
      this.player2.score += 0.5;
    } else if (result === 'lose') {
      this.player2.score += 1;
    }
  }
}
