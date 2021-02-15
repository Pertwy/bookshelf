import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import DisplayList from '../components/DisplayLists';
import "./AddList.css"

export default function Profile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [follow, setFollow] = useState("")
  const [update, setUpdate] = useState(0)

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
  },[currentUser, update])



  function handleFollow(){
      let info = {"currentUser":currentUser, "follow":follow}
      axios.post('http://localhost:5000/testusers/follow',info)
        .then(response => console.log(response))
  }


  function handleDeleteBook(_id){
    let info = {"book":_id, "currentUser":currentUser}
    
      axios.post('http://localhost:5000/testusers/removefavorite', info)
          .then(response => (console.log(response.data)))
    
    
    // if(type == "books"){
    //   axios.post('http://localhost:5000/testusers/removebook', info)
    //       .then(response => (console.log(response.data)))
    //   setUpdate(update+1) 
    //       // .then(console.log(userData))
    // }
    // if(type == "readList"){
    //   axios.post('http://localhost:5000/testusers/removereadlist', info)
    //       .then(response => (console.log(response.data)))
    //       // .then(console.log(userData))
    //   setUpdate(update+1) 
    // }
  }



  function BookList(books) {
    return (books.books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
          <Link className="link" to={"/book/"+_id}>
            <img className="card-img-top" src={image} alt={title}></img>
          </Link>

          <div className="button">
            <button onClick={() => handleDeleteBook(_id)}>Remove</button>
          </div> 
        </section>

        // <section key={_id} >
        //   <div className="card book-card">
        //     <img className="card-img-top" src={image} alt={title}></img>
            // <div className="button">
            //   <button onClick={() => handleDeleteBook(_id)}>Remove</button>
            // </div> 
            
        //     <div className="card-body">
        //       <h4 className="card-title">{title}</h4>
        //       <p className="card-text">{author}</p>
        //     </div>
                       
        //   </div>
        // </section>
      )
    })
  )}

  function FollowingList(input) {
    return (input.following.map(person => {

      //const {name,  _id} = person
      return (

        <li className="ml-5">
          <h5>{person.name}</h5>
        </li>
      )
    })
  )}
 
  return (
    <div className="container">
      <UserDropDown setEmail={setCurrentUser}/>

      <div className="py-5 row container-fluid">
        
        <div className="col-sm-5 row">
          <h1 className="pr-5">Photo</h1>

          <div>
            <h4>Name: {userData.name}</h4>
            <h4>Email: {userData.email}</h4>
            <h4>Bio: {userData.bio}</h4>
          </div>
        </div>


        <div className="col-sm-5">
          <h4>Follow another user</h4>
          <UserDropDown setEmail={setFollow}/>
          <button onClick={() => handleFollow()}>Follow</button>
        </div>


        <div className="col-sm-2">
          <h4>Following</h4>
          <ul>
            <FollowingList following={userData.following}/>
          </ul>
        </div>

      </div>

      
        
      <div className="book-row-section">
        <h3 className="book-row-title" >Favorites</h3>
        <div className="row book-row">
          <BookList books={userData.favorites} type="favorites"/>
        </div>
      </div>

      <div className="book-row-section">
        <h3 className="book-row-title" >Books I've read</h3>
        <div className="row book-row">
          <BookList books={userData.books} type="books"/>
        </div>
      </div>

      <div className="book-row-section">
        <h3 className="book-row-title">Reading List</h3>
        <div className="row book-row">
          <BookList books={userData.readList} type="readList"/>
        </div>
      </div>

      <div className="book-row-section">
        <h3 className="book-row-title" >Lists</h3>
        <div className="row book-row">
          <DisplayList lists={userData.lists}/>
        </div>
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