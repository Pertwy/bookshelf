import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import HalfRating from "../components/Stars"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AdditionButton from "../components/AddButtons/AddFavoriteButton"
import showNotification from "../functions/showNotification"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export default function ViewBook(props){
  const [book, setBook] = useState({bookshelf:[], reviews:[]})  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] =useState("")



  function handleAddReview(e){
    e.preventDefault();
    let info = {"_id":props.location.pathname.replace("/book/", ""), "review":review, "rating":rating}

    axios.post('http://localhost:5000/api/users/addreview',info)
      .then(res => { showNotification(res.data, res.data)})

    let testBook = book
    testBook.reviews.push({"review":review, "authorName":isLoggedIn.userName , "author":{"_id":isLoggedIn._id}})
    setBook(testBook)
    setReview("")
    setRating(0)
    
  }
      

  useEffect(() => {

    axios.get('http://localhost:5000/api/users/currentUser')
          .then(response => (setIsLoggedIn(response.data)))

    axios.get("http://localhost:5000/api/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
     

    axios.get('http://localhost:5000/api/users/')
      .then(response => (setUserData(response.data)))

  },[book])


  function Reviews(){
    return (book.reviews.map(review => {
      return(
      <div className="pb-2">
        <Link to={"/user/"+review.author._id}>
          <h6 className="all-text review-name">{review.authorName}</h6>
        </Link>
        
        <p className="all-text review-text">{review.review}</p>
      </div>
    )
    }))
  }

  





    function InfoBox(props){
      if(props.info){
        return(
        <div className="col-sm-2">
          <div className="p1 infoBox text-center">
            <p className="infoText all-text">{props.title}</p>
            <p className="infoText all-text">{props.info}</p>
          </div>
        </div>
        )
      }
      else{
        return(<></>)
      }
    }


    function ISBNInfoBox(props){
      if(props.info){
        return(
        <div className="col-sm-2">
          <div className="p1 infoBox text-center">
            {props.info.map( info =>(
              <>
                  <p className="infoText all-text">{info.type}</p>
                  <p className="infoText all-text">{info.identifier}</p>
                  </>
              ))}
          </div>
        </div>
        )
      }
      else{
        return(<></>)
      }
    }


    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          
  
        },
      },
      input:{
        '& > *': {
        display:"block",
        color: "#cacbcc", 
        width:"100%",
        marginTop:"10px",
        // height:"50px",  
        }
      }
    }));
  
    const classes = useStyles();





  let numberOfFollowingBookshelves = 0
  var i;

  for (i = 0; i < userData.following.length; i++) {

    let check = userData.following[i].bookshelf.some((book) => {
      return book._id === props.location.pathname.replace("/book/", "")
    }) 
    if(check){numberOfFollowingBookshelves+=1}

  }


  return (
    <div className="container shadow-lg p-4 mb-4 ">

      <div className="content">
        <div className="row">
          <div className = "col-xs-6 col-sm-6 col-md-3">
            <img className="book-image" src={book.image} alt={book.title}></img>
          </div>

          <div className = "col-xs-6 col-sm-9 col-md-9">
            <div className="row">
              <div className="pl-3 col-sm-6">
                <h2 className="all-text">{book.title}</h2>
                <h5 className="mt-3 all-text">By {book.author}</h5>
              </div>

              <div className="pt-1 col-sm-6">

                {isLoggedIn &&(<>
                  <p className="all-text" >On {numberOfFollowingBookshelves} friend's bookshelves</p>
                </>)}

                <p className="all-text ">On {book.bookshelf.length} bookshelves</p>
              </div>
            </div>

            {book.description  &&(
              <div className="book-description-box">
                <p className="mt-3 all-text book-description summary" >{book.description}</p>
              </div>)}
            
          </div>
        </div>

        {isLoggedIn &&(<>
        <span className="row pl-2">
          <div>
            <AdditionButton type="favorite" currentUser={currentUser} book={book} page="ViewBook"/>
            <AdditionButton type="read" currentUser={currentUser} book={book} page="ViewBook"/>
          </div>
          <div>
            <AdditionButton type="readlist" currentUser={currentUser} book={book} page="ViewBook"/>
            <AdditionButton type="bookshelf" currentUser={currentUser} book={book} page="ViewBook"/>
          </div>
        </span></>)}

        {/* {book.pageCount || book.language || book.publishedDate || book.publisher || book.maturityRating || book.industryIdentifiers  &&(
        <> */}
        <h4 className="all-text avatar-heading pt-4"> ADDITIONAL INFO</h4>
        <div className=" container mt-2 mb-3">
          <div className="row mx-auto ">
            <InfoBox title="PAGE COUNT" info={book.pageCount}/>
            <InfoBox title="LANGUAGE" info={book.language}/>
            <InfoBox title="DATE PUBLISHED" info={book.publishedDate}/>
            <InfoBox title="PUBLISHER" info={book.publisher}/>
            <InfoBox title="MATURITY" info={book.maturityRating}/>
            <ISBNInfoBox title="ISBN" info={book.industryIdentifiers}/>
          </div>
        </div>
        {/* </>)} */}

        {/* <h4>Number of times read {book.numberOfTimesRead}</h4>
        <h4>Number of times favorited {book.numberOfTimesFavorited}</h4>
        <h4>Read Lists </h4>
        <h4>Lists </h4> */}

        


        
          <div>

            <h4 className="all-text avatar-heading"> REVIEWS</h4>

            <div className="row">
              <div className="col-sm-6">
                {book.reviews.length > 0 &&(
                <Reviews/>)}

                {book.reviews.length === 0 && isLoggedIn &&(
                <h5 className="all-text">Be the first to review!</h5>
                )}
              </div>


              {isLoggedIn &&(<>
              <div className="col-sm-6">
                <form onSubmit={handleAddReview}>
                  {/* <label>Add a review</label> */}
                  <TextField
                  className={classes.input}
                  id="outlined-multiline-static"
                  label="Add a review"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  fullwidth
                  onChange={({ target }) =>     
                      setReview(target.value)}
                />
                  <HalfRating setRating={setRating}/>
                  <Button type="submit"
                  style={{
                    borderRadius: 5,
                    borderColor: "#a9aeb3",
                    backgroundColor: "#a9aeb3",
                    color: "black",
                    padding: "7px 7px",
                    fontSize: "12px"
                    }}>Submit</Button>
                </form>
              </div>
              </>)}
            </div>

          </div>
        

      </div>
    </div>
  )
}