import axios from "axios";

const TOURNAMENT_REST_API_URL = "http://16.171.44.60:8080/tour";
const PLAYERS_REST_API_URL = "http://16.171.44.60:8080/player";

/* const PLAYERS_REST_API_URL = 'http://localhost:8080/player'; 
const TOURNAMENT_REST_API_URL = 'http://localhost:8080/tour';
 */
class PlayerService {
  async postPlayer(player) {
    const data = await axios.post(PLAYERS_REST_API_URL + "/api/add", player);
    return data;
  }

  async getPlayers(username) {
    const response = await axios.get(
      PLAYERS_REST_API_URL + "/api/list/" + username
    );
    const data = await response.data;
    return data;
  }

  async postTournament(tour) {
    axios.post(TOURNAMENT_REST_API_URL + "/api/save", tour);
  }

  async postTournamentResult(tourResult) {
    axios.post(TOURNAMENT_REST_API_URL + "/api/result/save", tourResult);
  }
}

export default new PlayerService();
