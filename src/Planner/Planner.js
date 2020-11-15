import React from "react";
import { connect } from "react-redux";
import NavigationBar from "./navigationBar/NavigationBar";
import DateBar from "./dateBar/DateBar";
import ProgressBar from "./progressBar/ProgressBar";
import TasksList from "./plannerCore/TasksList";
import AddToDo from "./plannerCore/AddToDo"
import { Redirect } from "react-router-dom";
import Menu from './plannerCore/Menu';
import { Button } from "@material-ui/core";
import taskService from "./requsts/task-service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Planner = (props) => {
  
  const getFilterdByDateTasks = () => {
    return (props.tasks.filter((t) => t.date === props.day));
  }
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const getHello = () => {
    taskService.hello().then(response=>{
      setMessage(response)
      setOpen(true)
    })
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return localStorage.getItem('authenticated')==='false' ? (
    <Redirect to="/login"/>
  ) : (
    <div>
      <Button onClick={getHello}>Get Hello From Server</Button>
      <NavigationBar />
      <DateBar />
      <br />
      <ProgressBar
        numberOfDone={getFilterdByDateTasks().filter((t) =>t.completed === true).length} //nie działa jeszcze dla time limited
        numberOfTasks={getFilterdByDateTasks().length}
      />
      <br/>
      
      <AddToDo />
      <Menu />
      <div style={{ display: 'flex',width:'100%',justifyContent: 'center'}}>

          <TasksList style={{width: '50%'}} tasks={getFilterdByDateTasks()}/>
       
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">{message.data}</Alert>
      </Snackbar>


    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  tasks: state.todos.allTasks,
  day: state.date.day
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
