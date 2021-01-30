import React, { useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Adduser(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  

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

  function handleSignUp(e) {
    e.preventDefault();
    newUserInDB()      
  } 


  return (
    <div>
      <h3>Add a user</h3>
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
                  setEmail(target.value)}
                placeholder="Email"
            />
            <br />
            <button type="submit">
                Sign up
            </button>
        </form>
      </div>
    </div>
  )
}
