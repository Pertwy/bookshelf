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
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';

export default function Profile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();

  function FollowingList(input) {
    return (input.following.map(person => {

      return (  
        <Avatar className={classes.small} id={person._id} alt={person.name} src={person.photo} />
      )
    })
  )}
 
  return (
    <div className="container shadow-lg p-4 mb-4 bg-white">
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

      

    <div className="content-container pt-5 pb-5 container-fluid">
    <div className="row">

      <div className="col-sm-12 col-md-8">

        <div >
          <div className="row space-between">
            <h3 className="book-row-title" >FAVORITES</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <BookList books={userData.favorites} type="favorites"/>
          </div>
        </div>

        <div className="book-row-section">
          <div className="row space-between">
            <h3 className="book-row-title" >BOOKS I'VE READ</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <BookList books={userData.books} type="books"/>
          </div>
        </div>

        <div className="book-row-section">
          <div className="row space-between">
            <h3 className="book-row-title">READING LIST</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <BookList books={userData.readList} type="readList"/>
          </div>
        </div>

        <div className="book-row-section pb-5">
          <div className="row space-between">
            <h3 className="book-row-title" >LISTS</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <DisplayList lists={userData.lists}/>
          </div>
        </div>

      </div>


      <div className="col-sm-12 col-md-4">
        
          <div >

            <div className="row space-between book-row-div">
              <h3 className="book-row-title" >FOLLOWING</h3>
              <h6>VIEW ALL</h6>
            </div>

            <div>
              <AvatarGroup className="pt-2 pb-2">
                <FollowingList following={userData.following}/>
              </AvatarGroup>
            </div>
          </div>

          <div >
            <h4>Follow another user</h4>
            <UserDropDown setEmail={setFollow}/>
            <button onClick={() => handleFollow()}>Follow</button>
          </div>


          <div className="border border-left-0 border-right-0 border-top-0">
            <h4>Diary</h4>
          </div>

      </div>
      </div>
      </div>
      

    </div>
  )
}