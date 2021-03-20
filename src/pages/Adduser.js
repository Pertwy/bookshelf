import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Adduser(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("")
  const [pronoun, setPronoun] = useState("")
  const [password, setPassword] = useState("")
  

  function newUserInDB(){
    let newUser = {
      "email":email, "name":name
    }

    try{
      axios.post('http://localhost:5000/testusers/add', newUser)
        .then(res => console.log(res.data));
      }catch(e){
        console.error(e)
      }
  }

  function handleLogin(){

    let user = {"email":email, "password":password}

    try{
      axios.post('http://localhost:5000/auth/', user, {withCredentials: true, credentials: 'include'})
        .then(res => console.log(res.data));
      }catch(e){
        console.error(e)
      }
  }



  function handleSignUp(e) {
    e.preventDefault();
    newUserInDB()      
  } 

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    input:{
      display:"block"
    }
  }));

  const classes = useStyles();

  return (
    <div>
      
      <div className="d-flex container justify-content-center">  
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSignUp}>
            <h3 className={classes.input}>Create an account</h3>  
            <TextField  fullWidth className={classes.input} onChange={({ target }) =>     
                  setName(target.value)} id="standard-basic" label="Name" />
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} id="standard-basic" label="Email" />
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setBio(target.value)} id="standard-basic" label="Bio" />
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setUserName(target.value)} id="standard-basic" label="User Name" />
            {/* <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setGivenName(target.value)} id="standard-basic" label="Given Name" />
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setSurname(target.value)} id="standard-basic" label="Surname" /> */}
            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setPronoun(target.value)} id="standard-basic" label="Pronoun" />
            {/* <button type="submit">
                Sign up
            </button> */}
            <Button type="submit" variant="outlined">
              Sign Up
            </Button>
        </form>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSignUp}>
            <h3 className={classes.input}>Login</h3>  

            <TextField  fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} id="standard-basic" label="Email" />

            <TextField fullWidth className={classes.input} onChange={({ target }) =>     
                  setPassword(target.value)} id="standard-basic" label="Password" />

            <Button onClick={() => handleLogin()} variant="outlined">
              Log in
            </Button>
        </form>

      </div>
    </div>
  )
}
