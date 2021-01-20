import './GoogleAPISearch.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';

export default function GoogleAPISearch() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  
  const [selectedShow, setSelectedShow] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [selectedImage, setSelectedImage] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
      .then(data => {
        setResult(data.data.items)
      })
  }

  function handleChange(e){
      const book = e.target.value
      setBook(book.trim())

      // axios.get("https://www.googleapis.com/books/v1/volumes?q="+e.target.value+ "&key="+apiKey+"&maxResults=40")
      // .then(data => {
      //   setResult(data.data.items)
      // })
  }

  function handleBook(Book){
    console.log(Book)
    setSelectedTitle(Book.volumeInfo.title)
    setSelectedAuthor(Book.volumeInfo.authors)
    setSelectedImage(Book.volumeInfo.imageLinks.thumbnail)
    setSelectedShow(true)
  }

  return (
    <div className="container">
      <div className="row">

        <div className="col-md-6">
          <h1>Book Search - Google Books API</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input onChange={handleChange} type="text" className="form-control mt-10" placeholder="Search for books" autoComplete="off"/>
            </div>
            <button type="submit" className="btn btn-danger">Search</button>
          </form>
          {selectedShow && (
            <div className="card">
              <img className="card-img-top" src={selectedImage} alt={selectedTitle}></img>
              <div className="card-body">
                <h4 className="card-title">{selectedTitle}</h4>
                <p className="card-text">{selectedAuthor}</p>
              </div>
            </div>
            //Add button 
            //Sends book information to Mongo db
          )}

            
        </div>

        <div className="col-md-6">
          {result.map(book => (
            // Wrap this in a div, so that when it's clicked, it passes some book info to a function
            <div className="d-inline-block" onClick={() => handleBook(book)}>
              <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
            </div>
          ))}
        </div>
      </div>
        

      </div>

  );
}

// <div className="card" style="width:400px">
            //   <img className="card-img-top" src="img_avatar1.png" alt="Card image">
            //   <div className="card-body">
            //     <h4 className="card-title">John Doe</h4>
            //     <p className="card-text">Some example text.</p>
            //   </div>
            // </div>
          //  <div className="container">
          //   <h2 className="d-inline-block">Book: </h2>
          //   <h2 className="d-inline-block"> {selectedTitle}</h2>
          //   <h2 className="d-inline-block">Author: </h2>
          //   <h2 className="d-inline-block"> {selectedAuthor}</h2>
          //   <img src={selectedImage} alt={selectedTitle}/>
          // </div>)