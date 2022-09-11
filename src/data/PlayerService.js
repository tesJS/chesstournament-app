import axios from 'axios'

const PLAYERS_REST_API_URL = 'http://localhost:8080/player';
//const TOURNAMENT_REST_API_URL = 'http://localhost:8080/tour';

class PlayerService {

    

     async postPlayer(player){
        
       const data= await axios.post(PLAYERS_REST_API_URL+'/api/add', player);
       return data;
          
    }

    
    
    async  getPlayers(username) {
            const response=  await axios.get(PLAYERS_REST_API_URL+"/api/list/"+username);
            const data= await response.data;            
            return data;
        } 






    async postTournament(tour){
    
       axios.post('http://localhost:8080/tour/api/save', tour);
     
          
    }

    async postTournamentResult(tourResult){
    
     axios.post('http://localhost:8080/tour/api/result/save', tourResult);
     
          
    }
    

    
}

export default new PlayerService();