import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


//Feed me your lists aand i'll show them for you
export default function DisplayBooks(props) {
  const [currentUser, setCurrentUser] = useState("john@gmail.com")

  function handleDeleteBook(_id, listtype){
    let info = {"book":_id, "currentUser":currentUser}

    if(listtype === "favorites"){
      axios.post('http://localhost:5000/api/users/removefavorite', info)
          .then(response => (console.log(response.data)))
    }

    if(listtype === "read"){
      axios.post('http://localhost:5000/api/users/removebook', info)
          .then(response => (console.log(response.data)))
    }

    if(listtype === "readingList"){
      axios.post('http://localhost:5000/api/users/removereadlist', info)
          .then(response => (console.log(response.data)))
    }
  }


  return (props.books.map(currentBook => {

    const {title, author, image,  _id} = currentBook
    return (

      <section className="book" key={_id} >
        <Link className="link" to={"/book/"+_id}>
          <img className="card-img-top" src={image} alt={title}></img>
        </Link>

        <div className="button">
          <button onClick={() => handleDeleteBook(_id, props.type)}>Remove</button>
        </div> 
      </section>
    )
  }))
}