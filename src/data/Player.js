import uniqid from 'uniqid';

export default class Player {
  oppList = [];
  id = '';
  elo = '';
  score = 0;
  whiteTurns = 0;
  constructor(name, elo, club) {
    this.name = name;
    this.elo = elo;
    this.club = club;
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
  setId() {
    var uniqid = require('uniqid');
    this.id = uniqid();
  }
  setOpponentList(opp) {
    this.oppList.push(opp);
    opp.oppList.push(this);
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
