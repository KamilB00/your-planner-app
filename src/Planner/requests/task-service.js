import axios from "axios";
import authHeader from "../../Account/auth-header";

const API_URL = "https://your-planner-service.herokuapp.com/";


class TaskService {
    hello(){
        return axios.get(API_URL+"home", {headers: authHeader()});
    }
    getAllTasks() {
        return axios.get(
          API_URL + "tasks/getAllTasks",
          {headers:  authHeader()
          }
        )
      }
    
      addTask(taskName, taskCategory, taskDuration, taskDate) {
        return axios.post(API_URL + "tasks/addTask",
        { headers: authHeader(),
          done: false,
          name: taskName,
          category: taskCategory,
          duration: taskDuration,
          date: taskDate
        })
      }
  

}
export default new TaskService();