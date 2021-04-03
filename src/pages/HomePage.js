import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [listSize, setListSize] = useState(6)

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

    return (userData.books.slice(0, listSize).map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
            <Link to={"/book/"+_id}>
              <img className="card-img-top" src={image} alt={title}></img>
              <div className="hiddenBlock">alright mate</div>
            </Link>
        </section>
      )
    })
  )}



  function AdminLists() {
    
      return (userData.books.map(currentBook => {

        const {title, author, image,  _id} = currentBook
        return (

          <section key={_id} className="book">
            <div >
              <img className="card-img-top" src={image} alt={title}></img>
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                {/* <p className="card-text">{author}</p> */}
              </div>
            </div>
          </section>
        )
      })    
  )
 
}


  function FriendBookList() {
    return (userData.following.map(following => {
      if(following.books[0]){
      return (
        <section className="book" key={following.books[following.books.length - 1]._id} >
            <Link to={"/book/"+following.books[following.books.length - 1]._id}>
              <img className="card-img-top" src={following.books[following.books.length - 1].image} alt={following.books[following.books.length - 1].title}></img>
              <div className="hiddenBlock">{following.name}</div>
            </Link>
        </section>
      )}
    })
  )}




  return (
    <div>

      <div className="container shadow-lg p-4 mb-4 bg-white">
        <UserDropDown setEmail={setCurrentUser}/>

        <div className="book-row-section">
          <h2 className="book-row-title">LATEST FROM FRIENDS</h2>
        
          <div className="row book-row">
            <FriendBookList/>
          </div>
        </div>

        <div className="book-row-section">
          <h2 className="book-row-title">BOOKS I'VE READ</h2>
          <div className="row book-row">
            <BookList/>
          </div>
        </div>

        <div className="book-row-section">
          <h2 className="book-row-title">POPULAR LISTS</h2>
          
          <div className="row book-row">
            <DisplayList lists={adminLists}/>
          </div>
          
        </div>

        

      </div>
    </div>
  )
}