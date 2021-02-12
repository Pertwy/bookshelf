import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewBook(props){
  const [book, setBook] = useState({})  

  useEffect(() => {
    axios.get("http://localhost:5000/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
      
  },[])


  function Reviews(){
    return (book.reviews.map(review => {
      return(
        <h4>{review}</h4>
      )
    }))
  }


  return (
    <div>

      <div className="content">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <h4>Number of times read {book.numberOfTimesRead}</h4>
        <h4>Number of times favorited {book.numberOfTimesFavorited}</h4>
        <h4>Number of reviews {book.reviews.length}</h4>
        <img src={book.image} alt={book.title}></img>
        
        {book.reviews > 0 &&(
          <div>
            <h2>Reviews</h2>
            <Reviews/>
          </div>
        )}

{/* //numberOfTimesRead
//rating */}

      </div>
    </div>
  )
}