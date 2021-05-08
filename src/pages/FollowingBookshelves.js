import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function FollowingBookshelves(){
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [listSize, setListSize] = useState(6)

  useEffect(() => {

    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/api/users/',email)
        .then(response => (setUserData(response.data)))
      
      // console.log(userData.following)
    }
    else{
      axios.get('http://localhost:5000/api/books/')
        .then(response => (setUserData(response.data)))
    }

  },[currentUser])




  function FriendBookshelfList() {
    return (userData.following.map(following => {

        if(following.bookshelf[0]){
            
        return (
           <div className="full-width">
                <div className="book-row-div row space-between mb-3">
                    <Link to={"/user/"+following._id} className=""><p className="book-row-title">{following.name}</p></Link>
                </div>

                <div className="row">
                {following.bookshelf.map(book => {
                    return(

                        <section className="d-flex flex-column" key={book._id} >
                            <div className="mt-auto p-2">
                                <div className="">
                                
                                <Link to={"/book/"+book._id}>
                                    <img className="card-img-top" src={book.image} alt={book.title}></img>
                                </Link>
                            
                                </div>
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


  function FriendBookshelfListTitle(following) {
    
  }




  return (
    <div className="pb-4">

        <UserDropDown setEmail={setCurrentUser}/>

         <div className="book-row-section">
          <div className="row book-row">
            <FriendBookshelfList/>
          </div>
        </div>


        
    </div>
  )
}