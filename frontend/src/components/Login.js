// components/session/Login.jsx
import React, { useState } from 'react';
import axios from "axios"

export default function Login(){
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [name, setName] = useState("");
    

    function newUserInDB(){
      let newUser = {
        "email":signUpEmail, "password":signUpPassword, "name":name
      }

      try{
        axios.post('/api/users/add', newUser)
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
      newUserInDB()      
    } 

    return (
        <div>    
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    onChange={({ target }) =>     
                      setName(target.value)}
                    placeholder="Name"
                />
                <br />
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
