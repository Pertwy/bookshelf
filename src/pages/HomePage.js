import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login"
import UserDropDown from "../components/UserDropDown"

export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")

  useEffect(() => {
    console.log(currentUser)
    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/testusers/',email)
        .then(response => (setBooks(response.data.books)))
      
      console.log(books)
    }
    else{
      axios.get('http://localhost:5000/books/')
        .then(response => (setBooks(response.data)))
    }

  },[currentUser])


  function BookList() {
    return (books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section key={_id}>
          <div className="card book-card">
            <img className="card-img-top" src={image} alt={title}></img>
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <p className="card-text">{author}</p>
            </div>
          </div>
        </section>
      )
    })
  )}
 
  return (
    <div>
      <UserDropDown setEmail={setCurrentUser}/>
      <h3>Books I've read</h3>
      <div className="row">
        <BookList/>
      </div>
    </div>
  )
}