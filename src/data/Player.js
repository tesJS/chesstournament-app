export default class Player {
  constructor(name, elo, club) {
    this.name = name;
    this.elo = elo;
    this.club = club;
    this.oppList = [];
    this.id = "";
    this.score = 0;
    this.whiteTurns = 0;
    
  }
  getScore() {
    return this.score;
  }
  setScore(value) {
    this.score += value;
  }
  getId() {
    return this.id;
  }

  setOpponentList(opp) {
    this.oppList.push(opp.name);
    opp.oppList.push(this.name);
  }
  getOpponentList() {
    return this.oppList;
  }
  setWhiteTurns() {
    this.whiteTurns++;
  }
  getWhiteTurns() {
    return this.whiteTurns;
  }
  
}
