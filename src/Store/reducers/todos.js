const initialState = {
  allTasks: [],
  chosenTask: {}
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    
    case "ADD_TASK":
      return {
        ...state,
          allTasks: state.allTasks.concat({
          title: action.payload.text,
          completed: false,
          category: action.payload.category,
          isRunning: false,
          duration: action.payload.duration,
          isTimeLimited: action.payload.isTimeLimited,
          date: action.payload.date,
        }),
      };

      case 'FETCH_TASKS':
      let index  = state.allTasks.findIndex(task => task.id === action.payload.id);
      if (index > -1) {
          return state;
      }
      else {
        return {
          ...state,  allTasks: state.allTasks.concat({
            id: action.payload.id,
            title: action.payload.name,
            completed: action.payload.done,
            category: action.payload.category,
            isRunning: false,
            duration: action.payload.duration,
            isTimeLimited: action.payload.timeLimited,
            date: action.payload.date.slice(0,10),
          })
        }
      }
      

    case "TOGGLE_TODO":
      return {
        ...state,
        allTasks: state.allTasks.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case "REMOVE_TASK":
      return {
        ...state,
        allTasks: state.allTasks.filter((todo) => todo.id !== action.id),
      };

      case "USER_LOGOUT":
        return state = initialState;
          
    case "ALTER_TASK":
      return {
        ...state,
        allTasks: function() {
          let index = state.allTasks.map(t=>t.id).indexOf(action.task.id)
          if(index<0) return state.allTasks
          let tasks = state.allTasks;
          tasks[index] = action.task;
          return tasks; 
        }
      }

    case "SET_TASK_TIME":
      return {
        ...state,
        allTasks: state.allTasks.map(t=>t.id===action.task.id?{...t, durationLeft: action.task.durationLeft, completed: action.task.completed}: t)
      }
    
    case "SET_ALL_TASKS_RUNNING_FALSE":
      return{
        ...state,
        allTasks: state.allTasks.map((todo)=> 
        todo.isTimeLimited ? {...todo, isRunning: false} : todo
        )
      }
    case "SET_TASK_RUNNING":
      return {
        ...state,
        allTasks: state.allTasks.map(t=>t.id===action.task.id? {...t, isRunning: true}: t)
      }

    case "SET_CHOSEN_TASK":
      return {
        ...state,
        chosenTask: action.chosenTask,
      };

    default:
      return state;
  }
};

export default todos;
