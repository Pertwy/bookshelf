import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login"
import UserDropDown from "../components/UserDropDown"
import DisplayList from "../components/DisplayLists"

export default function HomePage(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [adminLists, setAdminLists] = useState([])

  useEffect(() => {

    axios.get("http://localhost:5000/lists/admin")
      .then(response => (setAdminLists(response.data)))

    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/testusers/',email)
        .then(response => (setUserData(response.data)))
      
      // console.log(userData.following)
    }
    else{
      axios.get('http://localhost:5000/books/')
        .then(response => (setUserData(response.data)))
    }

  },[currentUser])


  function BookList() {
    return (userData.books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section key={_id} className="book">
          <div className="card book-card">
            <img className="card-img-top" src={image} alt={title}></img>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{author}</p>
            </div>
          </div>
        </section>
      )
    })
  )}

  function AdminLists() {
    
      return (userData.books.map(currentBook => {

        const {title, author, image,  _id} = currentBook
        return (

          <section key={_id} className="book">
            <div className="card book-card">
              <img className="card-img-top" src={image} alt={title}></img>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{author}</p>
              </div>
            </div>
          </section>
        )
      })    
  )
 
}



  

  function FriendBookList() {
    return (userData.following.map(following => {
      console.log(following.books[0])
    })
  )}



  return (
    <div>

      <div className="content">
        <UserDropDown setEmail={setCurrentUser}/>


        <div className="book-row">
          <h2 className="book-row-title">Books I've read</h2>
          <div className="row">
            <BookList/>
          </div>
        </div>

        <div className="book-row">
          <h2 className="book-row-title">Popular Lists</h2>
          
          <div className="row">
            <DisplayList lists={adminLists}/>
          </div>
          
        </div>

        <div className="book-row">
          <h2 className="book-row-title">Latest From Friends</h2>
          <div className="row">
            {/* <FriendBookList/> */}
          </div>
        </div>

      </div>
    </div>
  )
}