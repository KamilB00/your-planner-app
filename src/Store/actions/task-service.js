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

export const addTask = (text,category,duration,date) => async (dispatch) => {
  
   await axios.post( API_URL +"tasks/", {done: false,name: text,category: category,duration: duration,date: date},{headers: authHeader()})
  //  .then(
  //    dispatch({type: 'ADD_TASK', payload: {text: text,category: category, duration: duration,isTimeLimited: duration > 0 ? true : false,date: date}})
  //  )
}
export const toggleTask = (id) => async dispatch => {
  const response = await axios.put(API_URL + "tasks/",{headers: authHeader()})
  dispatch({type: 'TOGGLE_TASK', payload: response.data});
} 

export const editTask = (formValues) => async dispatch => {
    const response = await axios.put(API_URL + "tasks/",formValues,{headers: authHeader()})

    dispatch({type: 'EDIT_TASK', payload: response.data});
}

export const removeTask = (id) => async dispatch => {
     await axios.delete(API_URL + `tasks/${id}`,{headers: authHeader()}).then(
     dispatch({type: 'REMOVE_TASK', payload: {id: id}})
     );
}

