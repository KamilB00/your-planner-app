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
          title: action.text,
          completed: false,
          id: action.id,
          category: action.category,
          isRunning: false,
          duration: action.duration,
          isTimeLimited: action.isTimeLimited,
          date: action.date,
        }),
      };
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
