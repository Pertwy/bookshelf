import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import "bootstrap/dist/css/bootstrap.min.css";
import DisplayList from "../components/DisplayLists"
import {useHistory} from 'react-router-dom';
import DisplayAllLists from "../components/DisplayAllLists"

export default function HomePage(){
  const [userData, setUserData] = useState({books:[],favorites:[],readList:[],lists:[], following:[]})
  const [adminLists, setAdminLists] = useState([])
  const [isLoggedIn, setIsLoggedIn] =useState("")
  const [adminData, setAdminData] = useState({books:[],favorites:[]})
  const [friendsBookshelf, setFriendsBookshelf] = useState(true)
  const [friendsLatest, setFriendsLatest] = useState(true)
  
    const history = useHistory();
    function memberNavigate(){    
      history.push("/members")
    }



  useEffect(() => {
    

    axios.get('/api/users/currentUser')
        .then(response => (setIsLoggedIn(response.data)))

    axios.get("/api/lists/admin")
      .then(response => (setAdminLists(response.data)))

    axios.get('/api/users/')
      .then(response => (setUserData(response.data)))

    axios.get('/api/users/popular')
      .then(response => (setAdminData(response.data)))

  },[])


function TestSet(data){

  for (let i = 0; i < userData.following.length; i++) {
  
    if (userData.following[i].bookshelf.length > 0){
      console.log("shelves")
      setFriendsBookshelf(true)
    }
    if (userData.following[i].books.length > 0){
      setFriendsLatest(true)
      console.log("books")
    }}
}


  function AdminLists(props) {
    return (props.input.slice(0, 6).map(book => {
      return (
        <section className="the-book d-flex flex-column" key={book._id} >
          <div className="mt-auto py-2">
            <div className="">
              
              <Link to={"/book/"+book._id}>
                <img className="card-img-top card-img-top-bottom" src={book.image} alt={book.title}></img>
              </Link>
        
            </div>
          </div>
        </section>
      )
    })
  )
}

function FriendCheck(){
for (let i = 0; i < userData.following.length; i++) {
  
  if (userData.following[i].bookshelf.length > 0){
    console.log("tick")
    setFriendsBookshelf(true)
  }
  if (userData.following[i].books.length > 0){
    setFriendsLatest(true)
    console.log("tick")
  }
}}


  function FriendReadList() {
    return (userData.following.slice(0, 6).map(following => {
      if(following.books[0]){
      return (
        <section className="the-book d-flex flex-column" key={following.books[following.books.length - 1]._id} >
          <div className="mt-auto py-2">
            <div className="">
              
              <Link to={"/book/"+following.books[following.books.length - 1]._id}>
                <img className="card-img-top" src={following.books[following.books.length - 1].image} alt={following.books[following.books.length - 1].title}></img>
              </Link>

              <div className="under-card">
                <Link to={"/user/"+following._id} className="">
                  <p className="under-card-text">{following.userName}</p>
                </Link>
              </div>
        
            </div>
          </div>
        </section>
      )}
    })
  )}



  function FriendBookshelfList() {
    return (userData.following.slice(0, 6).map(following => {
      if(following.bookshelf[0]){
      return (
        <section className="the-book d-flex flex-column" key={following.bookshelf[following.bookshelf.length - 1]._id} >
          <div className="mt-auto py-2">
            <div className="">
              
              <Link to={"/book/"+following.bookshelf[following.bookshelf.length - 1]._id}>
                <img className="card-img-top" src={following.bookshelf[following.bookshelf.length - 1].image} alt={following.bookshelf[following.bookshelf.length - 1].title}></img>
              </Link>

              <div className="under-card">
                <Link to={"/user/"+following._id} className="">
                  <p className="under-card-text">{following.userName}</p>
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

        <div className={"py-4 home-page-heading-div"}>

          <div className={""}>
            <h2 className={"all-text home-page-heading"}>The social network for book lovers</h2>
            <div className={"col"}>
              <p className={"all-text home-page-bullets"}>View what's on your friends shelves</p>
              <p className={"all-text home-page-bullets"}>Track books you've read</p>
              <p className={"all-text home-page-bullets"}>Save the ones you haven't got around to</p>
              <p className={"all-text home-page-bullets"}>Let friends know what's good</p>
              {/* <button onClick={()=>handleTest()}>test</button> */}
            </div>
          </div>
        </div>


        <div className="book-row-section">
          <div className="book-row-div">
            <h2 className="book-row-title">POPULAR THIS WEEK</h2>
            
          </div>
          <div className="mx-1 row book-row">
            <AdminLists input={adminData.favorites}/>
          </div>
        </div>

        <div className="book-row-section">
          <div className="book-row-div">
            <h2 className="book-row-title">STAFF PICKS</h2>
          </div>
          <div className="mx-1 row book-row">
            <AdminLists input={adminData.books}/>
          </div>
        </div>




        {isLoggedIn && (userData.following.length > 0) && (
          <>

        {friendsLatest && (
        <div className="book-row-section">
          <div className="book-row-div">
            <h2 className="book-row-title">LATEST FROM FRIENDS</h2>
          </div>
          <div className="mx-1 row book-row">
            <FriendReadList type="readlist"/>
          </div>
        </div>)}

        {friendsBookshelf && (
        <div className="book-row-section">
          <div className="mx-1 book-row-div row space-between">
            <h2 className="book-row-title">BOOKSHELVES</h2>
            <Link to={"/followingBookshelves"}><h2 className="book-row-title">VIEW ALL</h2></Link>
          </div>

          <div className="mx-1 row">
            <FriendBookshelfList/>
          </div>
        </div>)}

        </>)}





        {isLoggedIn && (userData.following.length == 0) && (
        <>
          <div className=" mt-5 home-page-heading-div">
            <h2 className=" all-text">Add friends to see what they've been reading</h2>
            <div onClick={()=>memberNavigate()} className="search-members-button">
              <h5 className="all-text py-2">Search members</h5>
            </div>
          </div>
        </>)}
        





        <div className="book-row-section">
          <div className="mb-3 book-row-div">
            <h2 className="book-row-title">POPULAR LISTS</h2>
          </div>
          
          <div className="mx-1 row book-row">
            <DisplayAllLists lists={adminLists}/>
          </div>
        </div>

        
    </div>
  )
}