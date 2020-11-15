import axios from "axios";

const API_URL = "https://your-planner-service.herokuapp.com/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "users/signin?username=" + username + "&password=" + password
      );
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "users/signup", {
      username: username,
      email: email,
      password: password,
      roles: ["ROLE_CLIENT"]
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
