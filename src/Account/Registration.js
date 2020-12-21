import React from 'react'
import { connect } from 'react-redux'
import {TextField} from '@material-ui/core'
import {Button} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";
import { setAuthentication, setJwt} from './../Store/actions/index'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import logo_dark from "../Home/pngs/logo_dark.png";
import AuthService from './auth.service';
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

  const useStyles2 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: "230px"
      },
      
    },
  }));
 


export const Registration = (props) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  let history = useHistory();


const signup = () => {
 
  AuthService.register(username, username, password).then(
    result => {
      if(result.status===200){
        console.log("true")
        localStorage.setItem("user", result.data);
        localStorage.setItem('authenticated', true);
        history.push('/planner')
      }
    }
  );
}

const [open, setOpen] = React.useState(false);
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
// eslint-disable-next-line 
const [cpassword, setCPassword] = React.useState("");


const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};



const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#6e96fe",
    borderRadius: 100,
    height: 50,
    width: 110,
    '&:hover': {
      backgroundColor: "#5878CB"
    },
  },
}))(Button);


  return (localStorage.getItem('authenticated')==='true'?<Redirect to='/planner' />:
      <div>
          <img src={logo_dark} alt=""></img>
          <br></br>
          <div className={classes2.root}>

            <TextField  id="standard-basic" label="username" onChange={event => setUsername(event.target.value)} ></TextField><br></br>
            <TextField  error={cpassword!==password} label="password" type="password" onChange={event => setPassword(event.target.value)}></TextField> <br></br>
            <TextField  error={cpassword!==password} label="confirm password" type="password" onChange={event => setCPassword(event.target.value)} ></TextField> <br></br><br></br> 
          </div>     
          <div>
          </div>  

          <div>
            {cpassword!==password?
              <div style={{color: "red"}}>Passwords must match!</div>
              :<div></div>
            }
            {username.length>0&&username.length<5?
              <div style={{color: "red"}}>Username has to be longer than 4 letters!</div>
              :<div></div>
            }
            {(password.length>0&&cpassword.length>0)&&(password.length<5||cpassword.length)<5?
              <div style={{color: "red"}}>Passwords have to be longer than 4 letters!</div>
              :<div></div>
            }
          </div>

          <div className={classes.root}>
              <Link className="Registration" to='/login'>Or sign in</Link><br></br><br></br>  
              <div className="signinbutton">
                <ColorButton disabled={cpassword!==password||password.length<5||cpassword.length<5||username.length<5} variant="contained" onClick={signup} color="primary">Sign up</ColorButton>
              </div>
              
          </div>
         

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">Username or password is wrong!</Alert>
          </Snackbar>

          
      </div>
  )
}

const mapStateToProps = (state) => ({
    authenticated: state.authentication.authenticated,
    jwt: state.authentication.jwt

})

const mapDispatchToProps = {
  setJwt, setAuthentication
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
