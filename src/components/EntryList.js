import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoogleAPISearch.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login"

export default function EntryList(){
  const [books, setBooks] = useState([])    
  const [cred, setCred] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/books/')
      .then(response => (setBooks(response.data)))
  },[books])

  // function deleteGoal(id){
  //   axios.delete('http://localhost:5000/goals/' + id)
  //     .then(response => { console.log(response.data)});

  //   setGoals([...goals, goals.filter(el => el._id !== id)])
  // }

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
      <Login />
      <h3>Books I've read</h3>
      <div className="row">
        <BookList/>
      </div>
    </div>
  )
}