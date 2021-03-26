import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import DisplayList from '../components/DisplayLists';
import "./AddList.css"
import {produce} from "immer"

export default function Profile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
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
    

      // setUserData(userData.favorites.filter(function(element){
      //   return element._id !== _id
      // }))

      const fave = userData.favorites.filter(fave => fave._id !== _id);

      const data = userData
      data.favorites = fave
      
      console.log(data)
      setUserData(data)
      console.log(userData)
      //console.log(userData.favorites.indexOf(fave))
      //console.log(userData.favorites.indexOf())

      // return produce(state, draftState => {
      //   const index = draftState.redux.savers.findIndex(saver => saver.id === action.payload.id)
      //   delete draftState.redux.savers[index]
      //   draftState.redux.savers = draftState.redux.savers.filter(function( element ) {
      //       return element !== undefined;
      //     });
      // })


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


        
        <div className="profile-container pt-5 pb-5 container-fluid row">
          <div className="col-sm-2">
            <h1 className="pr-5">Photo</h1>
          </div>

          <div className="col-sm-8">
            <h4>{userData.name}</h4>
            <p>{userData.bio}</p>
          </div>

          <div className="col-sm-2">
            <p>Bookshelf {userData.bookshelf.length}</p>
            <p>Read {userData.books.length}</p>
            <p>Followers {userData.followers.length}</p>
            <p>Following {userData.following.length}</p>
          </div>
        </div>

      

      <div className="content-container pt-5 pb-5 container-fluid row">

      <div className="col-sm-8">
        <div className="book-row-section">
          <h3 className="book-row-title" >FAVORITES</h3>
          <div className="row book-row">
            <BookList books={userData.favorites} type="favorites"/>
          </div>
        </div>

        <div className="book-row-section">
          <h3 className="book-row-title" >BOOKS I'VE READ</h3>
          <div className="row book-row">
            <BookList books={userData.books} type="books"/>
          </div>
        </div>

        <div className="book-row-section">
          <h3 className="book-row-title">READING LIST</h3>
          <div className="row book-row">
            <BookList books={userData.readList} type="readList"/>
          </div>
        </div>

        <div className="book-row-section">
          <h3 className="book-row-title" >LISTS</h3>
          <div className="row book-row">
            <DisplayList lists={userData.lists}/>
          </div>
        </div>
      </div>


      <div className="col-sm-4">
        <div >
            <h4>Follow another user</h4>
            <UserDropDown setEmail={setFollow}/>
            <button onClick={() => handleFollow()}>Follow</button>
          </div>


          <div >
            <h4>Following</h4>
            <ul>
              <FollowingList following={userData.following}/>
            </ul>
          </div>

          <div className="border border-left-0 border-right-0 border-top-0">
            <h4>Read List</h4>
          </div>
          <div className="border border-left-0 border-right-0 border-top-0">
            <h4>Diary</h4>
          </div>
          <div className="border border-left-0 border-right-0 border-top-0">
            <h4>Lists</h4>
          </div>
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