import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import Radio from '@material-ui/core/Radio';
  import RadioGroup from '@material-ui/core/RadioGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import FormControl from '@material-ui/core/FormControl';
  import FormLabel from '@material-ui/core/FormLabel';


export default function ViewBook(props){
  const [book, setBook] = useState({})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [review, setReview] = useState("")
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
      
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
    let info = {"email":currentUser, "_id":props.location.pathname.replace("api/books/", ""), "review":review, "rating":value}
      axios.post('http://localhost:5000/api/users/addreview',info)
        .then(response => (console.log(response.data)))
  }

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  

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
            placeholder="Add a Review"
          />
          <FormControl className="row" component="fieldset">
            <FormLabel component="legend">Rating</FormLabel>
            <RadioGroup row aria-label="rating" name="rating" value={value} onChange={handleChange}>
              <FormControlLabel value= "1" labelPlacement="top" control={<Radio />} label= "1" />
              <FormControlLabel value= "2" labelPlacement="top" control={<Radio />} label= "2" />
              <FormControlLabel value= "3" labelPlacement="top" control={<Radio />} label= "3" />
              <FormControlLabel value= "4" labelPlacement="top" control={<Radio />} label= "4" />
              <FormControlLabel value= "5" labelPlacement="top" control={<Radio />} label= "5" />
              <FormControlLabel value= "6" labelPlacement="top" control={<Radio />} label= "6" />
              <FormControlLabel value= "7" labelPlacement="top" control={<Radio />} label= "7" />
              <FormControlLabel value= "8" labelPlacement="top" control={<Radio />} label= "8" />
              <FormControlLabel value= "9" labelPlacement="top" control={<Radio />} label= "9" />
              <FormControlLabel value= "10" labelPlacement="top" control={<Radio />} label= "10" />

            </RadioGroup>
          </FormControl>

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