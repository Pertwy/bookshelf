import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import DisplayList from '../components/DisplayLists';

export default function User(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[]})

  useEffect(() => {
    console.log(currentUser)
    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/testusers/',email)
        .then(response => (setUserData(response.data)))
        .then(console.log(userData))
    }
    else{
      axios.get('http://localhost:5000/books/')
        .then(response => (setBooks(response.data)))
    }
  },[currentUser])


  function BookList(bookArrayInput) {
    return (bookArrayInput.books.map(currentBook => {

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
    <div className="container">
      <UserDropDown setEmail={setCurrentUser}/>

      <div className="row">
        <div>
          <h1>Photo</h1>
          <h4>Name: {userData.name}</h4>
          <h4>Email: {userData.email}</h4>
          <h4>Bio: {userData.bio}</h4>

        </div>
      </div>

      <h3>Favorites</h3>
      <div className="row">
        <BookList books={userData.favorites}/>
      </div>

      <h3>Books I've read</h3>
      <div className="row">
        <BookList books={userData.books}/>
      </div>

      <h3>Reading List</h3>
      <div className="row">
        <BookList books={userData.readList}/>
      </div>

      <h3>Lists</h3>
      <div className="row">
        <DisplayList lists={userData.lists}/>
      </div>

    
      
      {/* {userData.books.map((currentBook) => {
                const {title, author, image,  _id} = currentBook
                return (
                    <div key={_id}>
                      <img  src={image} alt={title}></img>
                    </div>
                    // <div>
                    //   <img
                    //     alt=''
                    //     src='https://shadycharacters.co.uk/wp/wp-content/uploads/2016/12/Book_IMG_1754-1-e1481474081467.jpg'
                    //   />
                    // </div>
                )
              })} */}

    

    </div>
  )
}