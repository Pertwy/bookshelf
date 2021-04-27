import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import DisplayList from '../components/DisplayLists';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from "../components/TabPanel"

export default function User(props){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [follow, setFollow] = useState("")
  const [update, setUpdate] = useState(0)



  useEffect(() => {
    //console.log(currentUser)
    if(currentUser){

      axios.get("http://localhost:5000/api/users/"+props.location.pathname.replace("/user/", ""))
      .then(response => (setUserData(response.data)))
      //.then(response => (console.log(response.data)))

    }
    else{
      axios.get('http://localhost:5000/api/books/')
        .then(response => (setBooks(response.data)))
    }
  },[currentUser, update, userData])





  function handleFollow(){
      let info = {"currentUser":currentUser, "follow":follow}
      axios.post('http://localhost:5000/api/users/follow',info)
        .then(response => console.log(response))
  }




  function handleDeleteBook(_id, listtype){
    let info = {"book":_id, "currentUser":currentUser}
    console.log(info)

    if(listtype === "favorites"){
      axios.post('http://localhost:5000/api/users/removefavorite', info)
          .then(response => (console.log(response.data)))

      const fave = userData.favorites.filter(fave => fave._id !== _id);
      const data = userData
      data.favorites = fave
      setUserData(data)
    }

    if(listtype === "read"){
      axios.post('http://localhost:5000/api/users/removebook', info)
          .then(response => (console.log(response.data)))

      const fave = userData.books.filter(fave => fave._id !== _id);
      const data = userData
      data.books = fave
      setUserData(data)
    }

    if(listtype === "readingList"){
      axios.post('http://localhost:5000/api/users/removereadlist', info)
          .then(response => (console.log(response.data)))

      const fave = userData.readList.filter(fave => fave._id !== _id);
      const data = userData
      data.readList = fave
      setUserData(data)
    }



  }


  function BookList(books) {
    return (books.books.map(currentBook => {

      const {title, author, image,  _id} = currentBook
      return (

        <section className="book" key={_id} >
          <Link className="link" to={"api/book/"+_id}>
            <img className="card-img-top" src={image} alt={title}></img>
          </Link>

          <div className="button">
            <button onClick={() => handleDeleteBook(_id, books.type)}>Remove</button>
          </div> 
        </section>
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
          
          <div className="photo-div col-sm-2 col-md-2">
          </div>

          <div className="col-sm-10 col-md-8">
            <h4 className="name">{userData.name}</h4>
            <p className="bio">{userData.bio}</p>
          </div>

          <div className="col-sm-12 col-md-2">
            <section>
              <p className="stats">Bookshelf {userData.bookshelf.length}</p>
            </section>
            <section>
              <p className="stats">Read {userData.books.length}</p>
            </section>
            <section>
              <p className="stats">Followers {userData.followers.length}</p>
            </section>
            <section>
              <p className="stats">Following {userData.following.length}</p>
            </section>
          </div>

        </div>

        <TabPanel/>

      

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
            <BookList books={userData.books} type="read"/>
          </div>
        </div>

        <div className="book-row-section">
          <div className="row space-between">
            <h3 className="book-row-title">READING LIST</h3>
            <h6>VIEW ALL</h6>
          </div>
          <div className="row book-row">
            <BookList books={userData.readList} type="readingList"/>
          </div>
        </div>

        <div className="book-row-section pb-5">
          <div className="row space-between">
            <h3 className="book-row-title" >LISTS</h3>
            <Link to="/alllists" className="navbar-brand">Bookshelf</Link>
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