import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import HalfRating from "../components/Stars"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function ViewBook(props){
  const [book, setBook] = useState({bookshelf:[], reviews:[]})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
      
     console.log(book) 
  },[])


  function Reviews(){
    return (book.reviews.map(review => {
      return(
      <div>
        <h3>{review.author.name}</h3>
        <p>{review.review}</p>
      </div>
    )
    }))
  }

  function handleAddReview(e){
    e.preventDefault();
    let info = {"email":currentUser, "_id":props.location.pathname.replace("api/books/", ""), "review":review, "rating":rating}
      axios.post('http://localhost:5000/api/users/addreview',info)
        .then(response => (console.log(response.data)))
  }


    function InfoBox(props){
      if(props){
        return(
        <div className="col-sm-2">
          <div className="p1 infoBox text-center">
            <p className="infoText">{props.title}</p>
            <p className="infoText">10</p>
            {/* <p>{props.info}</p> */}
          </div>
        </div>
        )
      }
      else{
        return(<></>)
      }
    }


  return (
    <div className="container shadow-lg p-4 mb-4 bg-white">

      <div className="content">
        <div className="row">
          <div className = "col-xs-6 col-sm-6 col-md-3">
            <img className="book-image" src={book.image} alt={book.title}></img>
          </div>

          <div className = "col-xs-6 col-sm-6 col-md-6">
            <h2>{book.title}</h2>
            <h3>By {book.author}</h3>
            <h5>Description</h5>
            
          </div>

          <div className = "col-xs-6 col-sm-6 col-md-3">
            <h3>Bookshelves</h3>
            <p>On {book.bookshelf.length} friend's bookshelves</p>
            <p>On {book.bookshelf.length} bookshelves</p>

            <form onSubmit={handleAddReview}>
              {/* <label>Add a review</label> */}
              <TextField
              id="outlined-multiline-static"
              label="Add A Review"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
              fullwidth
              onChange={({ target }) =>     
                  setReview(target.value)}
            />
              <HalfRating setRating={setRating}/>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
        {/* <h4>Number of reviews {book.reviews.length}</h4> */}
        
        <div className="container pt-5 pb-5">
          <div className="row">
            <InfoBox title="PAGE COUNT" info={book.pageCount}/>
            <InfoBox title="LANGUAGE" info={book.language}/>
            <InfoBox title="DATE PUBLISHED" info={book.publishedDate}/>
            <InfoBox title="PUBLISHER" info={book.publisher}/>
            <InfoBox title="MATURITY" info={book.maturityRating}/>
            <InfoBox title="ISBN" info={book.industryIdentifiers}/>
          </div>
        </div>

        {/* <h4>Number of times read {book.numberOfTimesRead}</h4>
        <h4>Number of times favorited {book.numberOfTimesFavorited}</h4>
        <h4>Read Lists </h4>
        <h4>Lists </h4> */}

        


        {book.reviews.length > 0 &&(
          <div>
            <div className="row">
              <h4> Reviews</h4>
              {/* <h5> View All </h5> */}
            </div>
            <Reviews/>
          </div>
        )}

      </div>
    </div>
  )
}