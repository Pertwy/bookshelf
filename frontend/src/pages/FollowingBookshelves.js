import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export default function FollowingBookshelves(){
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [isLoggedIn, setIsLoggedIn] =useState("")

    
  useEffect(() => {
    axios.get('/api/users/currentUser')
          .then(response => (setIsLoggedIn(response.data)))


    axios.get('/api/users/')
      .then(response => (setUserData(response.data)))
      //.then(response => (console.log(response.data)))
      
  },[])




  function FriendBookshelfList() {
    return (userData.following.map(following => {
      console.log(following)

        if(following.bookshelf[0]){
            
        return (
           <div className="full-width">
                <div className="book-row-div row space-between mb-3">
                    <Link to={"/user/"+following._id} className=""><p className="book-row-title">{following.userName}</p></Link>
                </div>

                <div className="row">
                {following.bookshelf.map(book => {
                    return(

                        <section className="d-flex flex-column" key={book._id} >
                            <div className="mt-auto p-2">
   
                                <Link to={"/book/"+book._id}>
                                    <img className="card-img-top card-img-top-bottom" src={book.image} alt={book.title}></img>
                                </Link>

                            </div>
                        </section>
                )})}
                </div>

                <br></br>

          </div>
        )
      
      }
    })
  )}




  return (
    <div className="pb-4">
      {!isLoggedIn &&(<>
        <Link to={"/signup"} className="">
          <h4 className="all-text">Please log in or create an account to view friends bookshelves</h4>
        </Link>
      </>)}

      {isLoggedIn &&(<>
        <div className=" center-all">
          <h4 className="mt-5 all-text profile-title-text">View the libraries the people you follow have created</h4>
        </div>

         <div className="book-row-section">
          <div className="row book-row">
            <FriendBookshelfList/>
          </div>
        </div>
      </>)}
    </div>
  )
}