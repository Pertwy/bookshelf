import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "./AddList.css"
import './HomePage.css';

export default function Favorites(){
  const [user, setUser] = useState({})  

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/"+props.location.pathname.replace("/api/user/", ""))
      .then(response => (setUser(response.data)))
  },[])

  function BookList(books) {
    return (books.books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
          <Link className="link" to={"/book/"+_id}>
            <img className="card-img-top" src={image} alt={title}></img>
          </Link>

          <div className="button">
            <button onClick={() => handleDeleteBook(_id)}>Remove</button>
          </div> 
        </section>
      )
    })
  )}


  return (
    <div>

        <div >
          <div className="row space-between">
            <h3 className="book-row-title" >FAVORITES</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <BookList books={user.favorites} type="favorites"/>
          </div>
        </div>
    </div>
  )
}