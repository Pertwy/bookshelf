import './GoogleAPISearch.css';
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from 'react';
import defaultImage from '../assets/default-image.png';

import fire from '../fire';

export default function GoogleAPISearch() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  
  const [selectedShow, setSelectedShow] = useState(false)
  const [selectedBook, setSelectedBook] = useState({
    title:"",
    author:"",
    image:""
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const createToken = async () => {
    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
  }




  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
      .then(data => {
        setResult(data.data.items)
      })
  }

  // function handleChange(e){
  //     const book = e.target.value
  //     setBook(book.trim())

  function handleBook(Book){
    const authorArray = Book.volumeInfo.authors
    const newBook = { title: Book.volumeInfo.title, author: authorArray.join(), image: Book.volumeInfo.imageLinks.thumbnail};
    setSelectedBook(newBook)
    setSelectedShow(true)
  }

  async function handleAddBook(){

    const header = await createToken();

    try{
    axios.post('http://localhost:5000/books/add', selectedBook, header)
      .then(res => console.log(res.data));
    }catch(e){
      console.error(e)
    }

    setSelectedShow(false)
    console.log(isLoggedIn)
    // window.location = '/'
  }

  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <div className="d-inline-block" onClick={() => handleBook(book)}>
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>
      </div>
    )
  }


  return (
    <div className="container">
        <div className="row">

          <div className="col-md-6">
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