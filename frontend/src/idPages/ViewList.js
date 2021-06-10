import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";

export default function ViewList(props){
  const [list, setList] = useState({books:[], title:"", description:"", likes:[], comments:[], author:{photo:"", userName:"", _id:""}})  


  useEffect(() => {
    axios.get('/api/users/getList/'+props.location.pathname.replace("/list/", ""))
          //.then(response => (console.log(response.data)))
          .then(response => (setList(response.data)))
  },[])


  function DisplayList (){
    return(
      <div className="list-row">
        {list.books.map((book) => (
        <>
          <section className="the-book  d-flex flex-column" key={book._id} >
            <div className="link-div mt-auto ">
                <Link to={"/book/"+book._id}>
                    <img className="card-img-top card-img-top-bottom" src={book.image} alt={book.title}></img>
                </Link>
            </div>
          </section>
        </>))}
      </div>
    )
  }



  return (
    <div className="list-container">

      <div className="ml-2 mt-2">
        <Link to={"/user/"+list.author._id}>
          <p className="sub-text">List by {list.author.userName}</p>
        </Link>
        <h4 className="all-text list-title-text">{list.title}</h4>
        <p className="mt-1 sub-text list-description-text">{list.description}</p>
      </div>

      <div className="book-row">
        <DisplayList/>
      </div>

    </div>
  )
}