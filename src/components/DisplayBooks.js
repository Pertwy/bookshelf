import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


//Feed me your lists aand i'll show them for you
export default function DisplayBooks(props) {

  function handleDeleteBook(_id, listtype){
    let info = {"book":_id}

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

    if(listtype === "bookshelf"){
      axios.post('http://localhost:5000/api/users/removebookshelf', info)
          .then(response => (console.log(response.data)))
    }
  }


  return (props.books.map(currentBook => {

    const {title, author, image,  _id} = currentBook
    return (


      <section className="the-book  d-flex flex-column" key={_id} >
        <div className="link-div mt-auto ">

            <Link to={"/book/"+_id}>
                <img className="card-img-top card-img-top-bottom" src={image} alt={title}></img>
            </Link>

        </div>


      {props.owner &&(
        <div className="button">
          <button onClick={() => handleDeleteBook(_id, props.type)}>Remove</button>
        </div> )}



      </section>
    )
  }))
}