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
  const [selectedShow, setSelectedShow] = useState(false)
  const [selectedBook, setSelectedBook] = useState({
    title:"",
    author:"",
    image:""
  })
  

  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
      .then(data => {
        setResult(data.data.items)
      })
  }

  function handleBook(Book){
    const authorArray = Book.volumeInfo.authors
    const newBook = { title: Book.volumeInfo.title, author: authorArray.join(), image: Book.volumeInfo.imageLinks.thumbnail};
    setSelectedBook(newBook)
    setSelectedShow(true)
  }


  async function handleAddBook(){
    let info = {"book":selectedBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addBookToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    setSelectedShow(false)
  }

  async function handleAddFavorite(){
    let info = {"book":selectedBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addFavorite', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    setSelectedShow(false)
  }

  async function handleAddReadList(){
    let info = {"book":selectedBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/testusers/addReadList', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    setSelectedShow(false)
  }

 
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <div className="d-inline-block" onClick={() => handleBook(book)}>
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>
        <div className="button">
          {/* <button onClick={() => handleBook(book)}>Favorite</button>
          <button onClick={() => handleBook(book)}>Read</button>
          <button onClick={() => handleBook(book)}>Read List</button>
          <button onClick={() => handleBook(book)}>Add to Bookshelf</button> */}
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


            {selectedShow && (
              <section>
                <div className="card">
                  <img className="card-img-top" src={selectedBook.image} alt={selectedBook.title}></img>
                  <div className="card-body">
                    <h4 className="card-title">{selectedBook.title}</h4>
                    <p className="card-text">{selectedBook.author}</p>
                  </div>
                </div>
                <button onClick={handleAddBook} className="btn btn-danger">Add Book</button>
                <button onClick={handleAddFavorite} className="btn btn-danger">Add to Favorites</button>
                <button onClick={handleAddReadList} className="btn btn-danger">Add to Read List</button>
              </section>
            )}




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