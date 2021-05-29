import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayAllLists from '../components/DisplayAllLists';


export default function AllLists(){
  const [userData, setUserData] = useState({photo:"", books:[],favorites:[],readList:[],lists:[], following:[], followers:[], bookshelf:[]})

  useEffect(() => {

      axios.get('http://localhost:5000/api/users/')
        .then(response => (setUserData(response.data)))

  },[userData])



  return (
    <div className="container">
        <div className="book-row-section pb-5">
          <div className="row space-between">
            <h3 className="book-row-title" >LISTS</h3>
          </div>
          <div className="row book-row">
            <DisplayAllLists lists={userData.lists}/>
          </div>
        </div>

    </div>
  )
}