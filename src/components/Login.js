// components/session/Login.jsx
import React, { useState } from 'react';
import fire from '../fire';
import axios from "axios"

export default function Login(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [userCred, setUserCred] = useState("")
    

    function newUserInDB(){
      const newUser = {
        email:signUpEmail, cred:userCred
      }
      console.log(newUser)

      try{
        axios.post('http://localhost:5000/users/add', newUser)
          .then(res => console.log(res.data));
        }catch(e){
          console.error(e)
        }
    }



    function handleSignUp(e) {
      e.preventDefault();

      if (signUpPassword.length < 6) {
        alert("Please enter more than 6 characters for a password");
        return;
      }
      fire.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
      .then(console.log("you've signed up mate"))
      .then(cred =>{
        setUserCred(cred.user.uid)
        props.setCred(cred.user.uid)
      })
      .then(console.log(userCred))
      .then(newUserInDB())
      .then(
        setSignUpEmail("")
      )
      .then(
        setSignUpPassword("")
      )
      .catch(err => {
        console.log(err.message)
      })
      
    } 

    const handleSignIn = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
        .then(console.log("all good mate"))
          .catch((error) => {
            console.error('Incorrect username or password');
          });}

    return (
        <div>    
        <h2>Login</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    onChange={({ target }) =>     
                      setEmail(target.value)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="password"
                    onChange={({ target}) => 
                      setPassword(target.value)}
                    placeholder="Password"
                />
                <br />
                <button type="submit">
                    Sign in
                </button>
                
            </form>

            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    onChange={({ target }) =>     
                      setSignUpEmail(target.value)}
                    placeholder="Email"
                />
                <br />
                <input
                    type="password"
                    onChange={({ target}) => 
                      setSignUpPassword(target.value)}
                    placeholder="Password"
                />
                <br />
                <button type="submit">
                    Sign up
                </button>
            </form>
        </div>
    )
};
