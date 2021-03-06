import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-alice-carousel/lib/alice-carousel.css"
import TabPanel from "../components/TabPanel"
import showNotification from '../functions/showNotification';
import Button from '@material-ui/core/Button';

export default function User(props){
  const [myUserData, setMyUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [userData, setUserData] = useState({photo:"", givenName:"", surname:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})
  const [update, setUpdate] = useState(0)
  const [owner, setOwner] = useState(false)
  const [isLoggedIn, setIsLoggedIn] =useState("")

   
  useEffect(() => {

      axios.get('/api/users/currentUser')
          .then(response => (setIsLoggedIn(response.data)))

      axios.get("/api/users/"+props.location.pathname.replace("/user/", ""))
      .then(response => (setUserData(response.data)))

      axios.get('/api/users/')
        .then(response => (setMyUserData(response.data)))

  },[update, userData])
 


  
  function handleFollow(){
    let info = {"follow":props.location.pathname.replace("/user/", "")}
    axios.post('/api/users/follow',info)
      .then(res => { showNotification(res.data, res.data)});
}

  function handleUnfollow(){
    let info = {"unfollow":props.location.pathname.replace("/user/", "")}
    axios.post('/api/users/unfollow',info)
      .then(res => { showNotification(res.data, res.data)});
  }



  let doesFollow = myUserData.following.some((follower) => {
    return follower._id === props.location.pathname.replace("/user/", "")
  })
  let followButton
  if(!doesFollow){
    followButton = <><Button  style={{
      borderRadius: 5,
      borderColor: "#a9aeb3",
      backgroundColor: "#a9aeb3",
      color: "black",
      padding: "3px 3px",
      fontSize: "8px"
      }}
      onClick={()=>handleFollow()}>Follow</Button> </>
  }else {
    followButton = <><Button  style={{
      borderRadius: 5,
      borderColor: "#a9aeb3",
      backgroundColor: "#a9aeb3",
      color: "black",
      padding: "3px 3px",
      fontSize: "8px"
      }}
      onClick={()=>handleUnfollow()}>Unfollow</Button> </>
  }




    return (
      <div className="shadow-lg px-4 pb-4">
        {/* <UserDropDown setEmail={setCurrentUser}/> */}
  
            <div className="pb-2 container-fluid row">
          
                <div className="col-sm-10 col-md-8">
                  <div className="pl-3 row">
                    <h4 className="pr-2 all-text name">{userData.givenName} {userData.surname}</h4> 

                    {isLoggedIn &&(
                      <>
                      {followButton}
                      </>
                    )}

                  </div>
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
  
          <TabPanel setUserData={setUserData} userData={userData} owner={owner}/>
        
  
      </div>
    )
  }