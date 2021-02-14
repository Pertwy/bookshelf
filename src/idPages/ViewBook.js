import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewBook(props){
  const [book, setBook] = useState({})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [review, setReview] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
      
  },[])


  function Reviews(){
    return (book.reviews.map(review => {
      return(
      <div>
        <h3>{review.author}</h3>
        <p>{review.review}</p>
      </div>
    )
    }))
  }

  function handleAddReview(e){
    e.preventDefault();
    let info = {"_id":props.location.pathname.replace("/book/", ""), "review":review}
      axios.post('http://localhost:5000/books/addreview',info)
        .then(response => (console.log(response.data)))
  }


  return (
    <div>

      <UserDropDown setEmail={setCurrentUser}/>

      <div className="content">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <h4>Number of times read {book.numberOfTimesRead}</h4>
        <h4>Number of times favorited {book.numberOfTimesFavorited}</h4>
        {/* <h4>Number of reviews {book.reviews.length}</h4> */}
        <img src={book.image} alt={book.title}></img>

        <form onSubmit={handleAddReview}>
          <label>Add a review</label>
          <input
            type="text"
            onChange={({ target }) =>     
              setReview(target.value)}
            placeholder="Name"
          />
          <button type="submit">submit</button>
        </form>

        {console.log(book)}
        

        {book.reviews &&(
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