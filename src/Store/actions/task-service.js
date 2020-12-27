import { Store } from "@material-ui/icons";
import axios from "axios";
import authHeader from "../../Account/auth-header";
import {store} from '../../index';
  
const API_URL = "https://your-planner-service.herokuapp.com/";

export const  hello = () => {
  return axios.get(API_URL + "home", { headers: authHeader() });
}
export const fetchTasks = () => async dispatch =>{
  const response = await axios.get(API_URL + "tasks/", {headers: authHeader()});
  response.data.map((task) =>  
  dispatch({type: 'FETCH_TASKS', payload: task}))
}

export const addTask = (text,category,duration,date) => async dispatch => {
   const response = await axios.post( API_URL +"tasks/", {done: false,name: text,category: category,duration: duration,date: date},{headers: authHeader()});
  
   dispatch({type: 'ADD_TASK', payload: response.data});
}
export const toggleTask = (id) => async dispatch => {
  const response = await axios.put(API_URL + "tasks/",{headers: authHeader()})
  dispatch({type: 'TOGGLE_TASK', payload: response.data});
} 
export const editTask = (formValues) => async dispatch => {
    const response = await axios.put(API_URL + "tasks/",formValues,{headers: authHeader()})

    dispatch({type: 'EDIT_TASK', payload: response.data});
}

export const deleteTask = (id) => async dispatch => {
     await axios.delete(API_URL + `tasks/${id}`,{},{headers: authHeader()});
     dispatch({type: 'DELETE_TASK', payload: id});
}

