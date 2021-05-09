import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import TabPanel from "../components/TabPanel"


export default function Profile(){
  const [books, setBooks] = useState([])  
  const [currentUser, setCurrentUser] = useState("john@gmail.com")
  const [userData, setUserData] = useState({photo:"", givenName:"", surname:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [owner, setOwner] = useState(true)

  useEffect(() => {
    if(currentUser){
      let email = {"email":currentUser}
      axios.post('http://localhost:5000/api/users/',email)
        .then(response => (setUserData(response.data)))
    }
    else{
      axios.get('http://localhost:5000/api/books/')
        .then(response => (setBooks(response.data)))
    }
  },[currentUser])



  return (
    <div className=" shadow-lg px-4 pb-4">
      {/* <UserDropDown setEmail={setCurrentUser}/> */}

        <div className="pb-2 container-fluid row">
          
          {/* <div className="photo-div col-sm-2 col-md-2">
          </div> */}

          <div className="col-sm-10 col-md-8">
            <h4 className="all-text name">{userData.givenName} {userData.surname}</h4>
            <p className="all-text bio">{userData.bio}</p>
          </div>

          <div className="col-sm-12 col-md-4 stats">
            <div className="row">
              <div className="stats-div">
                <p className="all-text stats-num">{userData.bookshelf.length}</p>
                <p className="all-text stats-title">BOOKSHELF</p>
              </div>

              <div className="stats-div">
                <p className="all-text stats-num">{userData.books.length}</p>
                <p className="all-text stats-title">READ</p>
              </div>

              <div className="stats-div">
                <p className="all-text stats-num">{userData.followers.length}</p>
                <p className="all-text stats-title">FOLLOWERS</p>
              </div>
           

              <div className="stats-div">
                <p className="all-text stats-num">{userData.following.length}</p>
                <p className="all-text stats-title">FOLLOWING</p>
              </div>

            </div>
          </div>

        </div>

        <div>
          <TabPanel setUserData={setUserData} userData={userData} owner={owner}/>
        </div>
      
    </div>
  )
}