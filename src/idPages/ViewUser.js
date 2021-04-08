import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function Favorites(props){
  const [user, setUser] = useState({})  

  useEffect(() => {
    axios.get("http://localhost:5000/testusers/"+props.location.pathname.replace("/user/", ""))
      .then(response => (setUser(response.data)))
  },[])

  return (
    <div>

      <div className="content">
        <h1>Hello user</h1>
        <h2>{user.name}</h2>
        {/* <h3>{user.author}</h3>
        <img src={user.image} alt={user.title}></img> */}
        

      </div>
    </div>
  )
}