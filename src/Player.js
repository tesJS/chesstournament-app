export default class Player {
  constructor(name, elo, club) {
    this.name = name;
    this.elo = elo;
    this.club = club;
    this.id = createID();
  }
  get score() {
    return;
  }
}
