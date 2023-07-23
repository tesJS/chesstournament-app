import axios from "axios";

//const USERS_REST_API_URL = "http://16.171.44.60:8080/user";
const USERS_REST_API_URL = "http://localhost:8080/user";

class UserService {
  async checkUserData(user) {
    const response = await axios.post(USERS_REST_API_URL + "/check", user);
    const data = await response.data;

    return data;
  }

  async postUserData(user) {
    axios.post(USERS_REST_API_URL + "/add", user);
  }
}

export default new UserService();
