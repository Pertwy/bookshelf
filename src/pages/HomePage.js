import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    axios.get("http://localhost:5000/api/lists/admin")
      .then(response => (setAdminLists(response.data)))

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


  function BookList() {

    return (userData.books.slice(0, listSize).map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
            <Link to={"/book/"+_id}>
              <img className="card-img-top" src={image} alt={title}></img>
              {/* <div className="hiddenBlock">alright mate</div> */}
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


  function FriendReadList(props) {

    return (userData.following.map(following => {
      if(following.books[0]){
      return (
        <section className="d-flex flex-column" key={following.books[following.books.length - 1]._id} >
          <div className="mt-auto p-2">
            <div className="">
              
              <Link to={"/book/"+following.books[following.books.length - 1]._id}>
                <img className="card-img-top" src={following.books[following.books.length - 1].image} alt={following.books[following.books.length - 1].title}></img>
              </Link>

              <div className="under-card">
                <Link to={"/user/"+following._id} className="">
                  <p className="under-card-text">{following.name}</p>
                </Link>
              </div>
        
            </div>
          </div>
        </section>
      )}
    })
  )}

  function FriendBookshelfList() {
    return (userData.following.map(following => {
      if(following.bookshelf[0]){
      return (
        <section className="d-flex flex-column" key={following.bookshelf[following.bookshelf.length - 1]._id} >
          <div className="mt-auto p-2">
            <div className="">
              
              <Link to={"/book/"+following.bookshelf[following.bookshelf.length - 1]._id}>
                <img className="card-img-top" src={following.bookshelf[following.bookshelf.length - 1].image} alt={following.bookshelf[following.bookshelf.length - 1].title}></img>
              </Link>

              <div className="under-card">
                <Link to={"/user/"+following._id} className="">
                  <p className="under-card-text">{following.name}</p>
                </Link>
              </div>
        
            </div>
          </div>
        </section>
      )}
    })
  )}





  return (
    <div className="pb-4">

      {/* shadow-lg p-4 mb-4 bg-white */}
        {/* <UserDropDown setEmail={setCurrentUser}/> */}

        <div className={"py-4 home-page-heading-div"}>

          <div className={""}>
            <h2 className={"all-text home-page-heading"}>The social network for book lovers</h2>
            <div className={"col"}>
              <p className={"all-text home-page-bullets"}>View what's on your friends shelves</p>
              <p className={"all-text home-page-bullets"}>Track books you've read</p>
              <p className={"all-text home-page-bullets"}>Save the ones you haven't got around to</p>
              <p className={"all-text home-page-bullets"}>Let friends know what's good</p>
            </div>
          </div>
        </div>

        <div className="book-row-section">
          <h2 className="book-row-title">LATEST FROM FRIENDS</h2>
          <div className="row book-row">
            <FriendReadList type="readlist"/>
          </div>
        </div>

        <div className="book-row-section">
          <h2 className="book-row-title">BOOKSHELVES</h2>
          <div className="row book-row">
            <FriendBookshelfList/>
          </div>
        </div>


        <div className="book-row-section">
          <h2 className="book-row-title">POPULAR LISTS</h2>
          
          <div className="row book-row">
            <DisplayList lists={adminLists}/>
          </div>
          
        </div>

        
    </div>
  )
}