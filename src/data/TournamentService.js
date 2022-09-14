import axios from 'axios'



const TOURNAMENT_REST_API_URL = 'http://localhost:8080/tour/';

class TournamentService { 
    
    async  checkTourId( tourid) {
            const response=  await axios.get(TOURNAMENT_REST_API_URL+'checkTourid/'+tourid);
            const data= await response.data;
            
            return data;            
        } 
    


    
}

export default new TournamentService();