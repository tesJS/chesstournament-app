import axios from 'axios'

const PLAYERS_REST_API_URL = 'http://localhost:8080/player';

class PlayerService {

    constructor(){
        
    }
     async postPlayer(player){
        
       const data= axios.post(PLAYERS_REST_API_URL+'/add', player);
       return data;
          
    }
    
    async  getPlayers() {
            const response=  await axios.get(PLAYERS_REST_API_URL+"/list");
            const data= await response.data;
            return data;
        } 
    
}

export default new PlayerService();