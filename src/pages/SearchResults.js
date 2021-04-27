import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"


export default function SearchResults(props) {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  

  useEffect(() => {
    
    //console.log(props.location.pathname.replace("/searchresults/", ""))
    // 
    
    // const search = props.location.pathname.replace("/searchresults/", "")
    // setBook(search.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+props.location.pathname.replace("/searchresults/", "")+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })

    },[])


  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })
  }



  async function handleAddBook(book){

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, author: authorArray.join(), image: book.volumeInfo.imageLinks.thumbnail};

    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/api/users/addBookToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
  }


  async function handleAddAuthBook(book){

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, author: authorArray.join(), image: book.volumeInfo.imageLinks.thumbnail};

    let info = {"book":newBook}
    try{
    axios.post('http://localhost:5000/api/books/addd', info)
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
    axios.put('http://localhost:5000/api/users/addFavorite', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    
  }


  async function handleAddReadList(book){
    
    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, 
      author: authorArray.join(), 
      image: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description,
      categories: book.volumeInfo.categories, 
      industryIdentifiers: book.volumeInfo.industryIdentifiers,
      infoLink: book.volumeInfo.infoLink,
      language: book.volumeInfo.language,
      maturityRating: book.volumeInfo.maturityRating,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
      };
    
    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/api/users/addReadList', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
  }

  async function handleAddBookshelf(book){

    console.log(book)
    
    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, 
      author: authorArray.join(), 
      image: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description,
      categories: book.volumeInfo.categories, 
      industryIdentifiers: book.volumeInfo.industryIdentifiers,
      infoLink: book.volumeInfo.infoLink,
      language: book.volumeInfo.language,
      maturityRating: book.volumeInfo.maturityRating,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
      };
    
    let info = {"book":newBook, "email":currentUser}
    try{
    axios.put('http://localhost:5000/api/users/addBookshelf', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
  }

 
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    const authorArray = book.volumeInfo.authors
    
    return(
      <div className="row space-between">
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>

        <div>
          <h5>{book.volumeInfo.title}</h5>
          {authorArray && (
          <p>{authorArray.join()}</p>
          )}
        </div>
        
        <div>
          <button onClick={() => handleAddFavorite(book)}>Favorite</button>
          <button onClick={() => handleAddBook(book)}>Read</button>
          <button onClick={() => handleAddReadList(book)}>Read List</button>
          <button onClick={() => handleAddBookshelf(book)}>Bookshelf</button>
        </div> 
      </div>
    )
  }


  return (
    <div className="container">
        <div>

          <div>
            <h1>Search Results</h1>
            <UserDropDown setEmail={setCurrentUser}/>

            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input onChange={handleSubmit} type="text" className="form-control mt-10" placeholder="Search for books" autoComplete="off"/>
              </div>
              {/* <button type="submit" className="btn btn-danger">Search</button> */}
            </form>
          </div>


          <div>
            {result.map(book => (
                <SearchedBook book={book}/>
              ))}
          </div>


        </div>
      </div>
  );
}