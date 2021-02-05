import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"
import "./AddList.css"

export default function AddBook() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  

  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
      .then(data => {
        setResult(data.data.items)
      })
  }



  async function handleAddBook(book){

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, author: authorArray.join(), image: book.volumeInfo.imageLinks.thumbnail};

    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addBookToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
  }

  
  async function handleAddFavorite(book){

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, author: authorArray.join(), image: book.volumeInfo.imageLinks.thumbnail};

    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addFavorite', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    
  }


  async function handleAddReadList(book){
    
    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, author: authorArray.join(), image: book.volumeInfo.imageLinks.thumbnail};
    
    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addReadList', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
  }

 
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <div className="d-inline-block" >
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>
        <div className="button">
          <button onClick={() => handleAddFavorite(book)}>Favorite</button>
          <button onClick={() => handleAddBook(book)}>Read</button>
          <button onClick={() => handleAddReadList(book)}>Read List</button>
        </div> 
      </div>
    )
  }


  return (
    <div className="container">
        <div className="row">

          <div className="col-md-6">

            <UserDropDown setEmail={setCurrentUser}/>

            <h1>Book Search - Google Books API</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input onChange={handleSubmit} type="text" className="form-control mt-10" placeholder="Search for books" autoComplete="off"/>
              </div>
              <button type="submit" className="btn btn-danger">Search</button>
            </form>
          </div>


          <div className="col-md-6">
            <div className="row">
            {result.map(book => (
                <SearchedBook book={book}/>
              ))}
            </div>
          </div>


        </div>
      </div>
  );
}