import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewBookClub(props){
  const [bookclub, setBookclub] = useState({})  

  useEffect(() => {
    axios.get("/api/bookclub/"+props.location.pathname.replace("/api/bookclub/", ""))
      .then(response => (setBookclub(response.data)))
  },[])


  return (
    <div>

      <div className="content">
        <h1>Hello books</h1>
        <h2>{bookclub}</h2>

      </div>
    </div>
  )
}