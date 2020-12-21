import axios from "axios";
import authHeader from "../../Account/auth-header";

const API_URL = "https://your-planner-service.herokuapp.com/";


  export const  hello = () => {
    return axios.get(API_URL + "home", { headers: authHeader() });
  }
  export  const getAllTasks = () => {
    return axios.get(API_URL + "tasks/getAllTasks", { headers: authHeader() });
  }

  export const addTask = (taskName, taskCategory, taskDuration, taskDate) => {
    return axios.post(
      API_URL + "tasks/addTask",
      {
        done: false,
        name: taskName,
        category: taskCategory,
        duration: taskDuration,
        date: taskDate,
      },
      { headers: authHeader() }
    );
  }

  
  

