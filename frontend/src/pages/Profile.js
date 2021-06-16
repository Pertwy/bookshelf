import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-alice-carousel/lib/alice-carousel.css"
import TabPanel from "../components/TabPanel"
import { Link } from 'react-router-dom';


export default function Profile(){
  const [userData, setUserData] = useState({photo:"", givenName:"", surname:"", reviews:[], books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [owner, setOwner] = useState(true)
  const [isLoggedIn, setIsLoggedIn] =useState("")
  const [update, setUpdate] = useState(0)


  useEffect(() => {

      axios.get('/api/users/currentUser')
        .then(response => (setIsLoggedIn(response.data)))

      axios.get('/api/users/')
        .then(response => (setUserData(response.data)))

  },[update])


  function updateProfile(){
    setUpdate(update + 1)
    console.log(update)
  }


  function Counter(props){
    return(
      <div className="stats-div">
        <p className="all-text stats-num">{props.info}</p>
        <p className="all-text stats-title">{props.label}</p>
      </div>
    )
  }


  return (
    
    <div className=" shadow-lg px-4 pb-4">

    
      {isLoggedIn &&(<>
        <div className="py-4 container-fluid row">
          <div className="col-sm-10 col-md-8">
            <h4 className="all-text name">{userData.givenName} {userData.surname}</h4>
            <p className="all-text bio">{userData.bio}</p>
          </div>

          <div className="col-sm-12 col-md-4 stats">
            <div className="row">
              <Counter label="BOOKSHELF" info={userData.bookshelf.length}/>
              <Counter label="READ" info={userData.books.length}/>
              <Counter label="FOLLOWERS" info={userData.followers.length}/>
              <Counter label="FOLLOWING" info={userData.following.length}/>
            </div>
          </div>
        </div>


        <div>
          <TabPanel setUserData={setUserData} userData={userData} owner={owner} updateProfile={updateProfile}/>
        </div>
        </>)}


        {!isLoggedIn &&(<>
        <Link to={"/signup"} className="">
          <h4 className="all-text">Please log in or create an account to view your profile</h4>
        </Link>
      </>)}

    </div>
  )
}