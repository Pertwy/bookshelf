import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import TabPanel from "../components/TabPanel"


export default function User(props){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [update, setUpdate] = useState(0)
  const [owner, setOwner] = useState(false)



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
    let info = {"currentUser":currentUser, "follow":userData.email}
    axios.post('http://localhost:5000/api/users/follow',info)
      .then(response => console.log(response))
}



  
    return (
      <div className="container shadow-lg p-4 mb-4 bg-white">
        <UserDropDown setEmail={setCurrentUser}/>
  
          <div className="profile-container pt-5 pb-5 container-fluid row">
            
            <div className="photo-div col-sm-2 col-md-2">
            </div>
  
            <div className="col-sm-10 col-md-8">
              <h4 className="name">{userData.name}</h4> <button onClick={()=>handleFollow()}>Follow</button>
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
  
          <TabPanel setUserData={setUserData} userData={userData} owner={owner}/>
        
  
      </div>
    )
  }