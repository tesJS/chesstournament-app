import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/user/';
//const TOURNAMENT_REST_API_URL = 'http://localhost:8080/tour';

class UserService { 
    
    async  checkUserData( user) {
             const response=  await axios.post(USERS_REST_API_URL+'check',user);
            const data= await response.data;
            
            return data;            
        } 
    

    async postUserData(user){
    
     axios.post('http://localhost:8080/user/add', user);
     
          
    }

    
}

export default new UserService();