
export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  setPlayersColor() {
    if (this.player1.getWhiteTurns() > this.player2.getWhiteTurns()){
      console.log(this.player1.name + " has " + this.player1.getWhiteTurns()+ "- white turns than "+ this.player2.name +" who has "+ 
      this.player2.getWhiteTurns() + " so it is swapped");
      [this.player1, this.player2] = [this.player2, this.player1];
    }
      
    
  }

  

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
