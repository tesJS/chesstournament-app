import axios from 'axios'

const PLAYERS_REST_API_URL = 'http://localhost:8080/player';
//const TOURNAMENT_REST_API_URL = 'http://localhost:8080/tour';

class PlayerService {

    

     async postPlayer(player){
        
       const data= axios.post(PLAYERS_REST_API_URL+'/add', player);
       return data;
          
    }

    
    
    async  getPlayers() {
            const response=  await axios.get(PLAYERS_REST_API_URL+"/list");
            const data= await response.data;
            return data;
        } 






    async postTournament(tour){
    
       axios.post('http://localhost:8080/tour/save', tour);
     
          
    }

    async postTournamentResult(tourResult){
    
     axios.post('http://localhost:8080/tour/result/save', tourResult);
     
          
    }
    

    
}

export default new PlayerService();