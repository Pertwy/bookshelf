import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../components/HomePage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"


export default function ViewBook(props){
  const [book, setBook] = useState({})  

  useEffect(() => {
    axios.get("http://localhost:5000/books/"+props.location.pathname.replace("/book/", ""))
      .then(response => (setBook(response.data)))
      

    // console.log(props.location.pathname.replace("/book/", ""))
  },[])

  // function Log(){
  //   console.log(book)
  // }


  return (
    <div>

      <div className="content">
        <h1>Hello books</h1>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <img src={book.image} alt={book.title}></img>
        {/* <Log></Log> */}
        {/* <UserDropDown setEmail={setCurrentUser}/> */}

        {/* <div className="book-row">
          <h2>{props}</h2>
        </div> */}

      </div>
    </div>
  )
}