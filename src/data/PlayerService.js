import axios from 'axios'

const PLAYERS_REST_API_URL = 'http://localhost:8080/player';

class PlayerService {

     postPlayer(player){
        
        axios.post(PLAYERS_REST_API_URL+'/add', player);
          
    }
    
    async  getPlayers() {
            const response=  await axios.get(PLAYERS_REST_API_URL+"/list");
            const data= await response.data;
            return data;
        } 
    
}

export default new PlayerService();