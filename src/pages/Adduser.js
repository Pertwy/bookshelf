import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./addUser.css"
import { red } from '@material-ui/core/colors';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

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
      "email":email, "name":name, "password":password
    }
    console.log(newUser)

    try{
      axios.post('http://localhost:5000/api/users/add', newUser)
        .then(res => console.log(res.data));
      }catch(e){
        console.error(e)
      }
  }

  function handleLogin(){

    let user = {"email":email, "password":password}

    try{
      axios.post('http://localhost:5000/api/auth/', user, {withCredentials: true, credentials: 'include'})
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
        margin:"10px"

      },
    },
    input:{
      '& > *': {
      display:"block",
      color: "#cacbcc", 
      width:"90%",
      marginTop:"10px",
      marginLeft:"5%",
      height:"50px"     
      }
    }
  }));

  const classes = useStyles();

  




  return (
    <div>
      
      <div className=" container ">

        <div className="row justify-content-center">
          
        
        {/* classes.root,  */}
        <div className={" col-sm-12 col-md-6"}>
        <div className={" login-background background-colour"}>
        <form  noValidate autoComplete="off" onSubmit={handleSignUp}>
            <div className={"text-align"}>
            <h3 className="sign-text">Sign Into your Account  </h3>  
            </div>
            <TextField  variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} label="Email" />

            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setPassword(target.value)} label="Password" />

            
            
            <div className={"text-align"}>
              <Button className="mt-2" onClick={() => handleLogin()} variant="outlined">
                Log in
              </Button>
            </div>


        </form>
        </div>
        </div>


        <div className={" col-sm-12 col-md-6"}>
        <div className={"background-colour login-background "}>
        <form  noValidate autoComplete="off" onSubmit={handleSignUp}>
            <div className={"text-align"}>
              <h3 className="sign-text">Create Your Account</h3>  
            </div>
            <TextField  variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setName(target.value)} label="Name" />

            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setEmail(target.value)} label="Email" />

            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setPassword(target.value)} label="Password" />

            <TextField variant="outlined" fullWidth className={classes.input} variant="outlined" onChange={({ target }) =>     
                  setBio(target.value)} label="Bio" />

            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setUserName(target.value)} label="User Name" />

            {/* <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setGivenName(target.value)} label="Given Name" />
            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setSurname(target.value)} label="Surname" /> */}

            <TextField variant="outlined" fullWidth className={classes.input} onChange={({ target }) =>     
                  setPronoun(target.value)} label="Pronoun" />
            {/* <button type="submit">
                Sign up
            </button> */}
            <div className={"text-align"}>
              <Button className="mt-2" type="submit" variant="outlined">
                Sign Up
              </Button>
            </div>
        </form>
        </div >
        </div> 





        </div>

      </div>
    </div>
  )
}
