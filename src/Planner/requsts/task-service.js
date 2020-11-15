import axios from "axios";
import authHeader from "../../Account/auth-header";

const API_URL = "https://your-planner-service.herokuapp.com/";


class TaskService {
    hello(){
        return axios.get(API_URL+"home", {headers: authHeader()});
    }

}
export default new TaskService();