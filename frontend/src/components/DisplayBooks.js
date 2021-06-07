import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import showNotification from '../functions/showNotification';

//Feed me your lists aand i'll show them for you
export default function DisplayBooks(props) {

  function handleDeleteBook(_id, listtype){
    let info = {"book":_id}

    if(listtype === "favorites"){
      axios.post('/api/users/removefavorite', info)
          //.then(response => (console.log(response.data)))
          .then(res => { showNotification(res.data, res.data)});
    }

    if(listtype === "read"){
      axios.post('/api/users/removebook', info)
          .then(res => { showNotification(res.data, res.data)});
    }

    if(listtype === "readingList"){
      axios.post('/api/users/removereadlist', info)
          .then(res => { showNotification(res.data, res.data)});
    }

    if(listtype === "bookshelf"){
      axios.post('/api/users/removebookshelf', info)
          .then(res => { showNotification(res.data, res.data)});
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