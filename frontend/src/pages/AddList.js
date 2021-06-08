import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"


export default function AddList() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [lists, setLists] = useState([])
  const [listBooks, setListBooks] = useState([])
  const [description, setDescription] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [selectedShow, setSelectedShow] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [listName, setListName] = useState("")
  const [selectedBook, setSelectedBook] = useState({
    title:"",
    author:"",
    image:""
  })


  //Grab all the current users
  useEffect(() => {
      axios.get('/api/users/grablists')
        .then(response => (setLists(response.data.lists)))
  },[addModal])
  


  //Search Google books Api
  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
    .then(data => {
        setResult(data.data.items)
      })
  }



  //Open the add new list form
  function handleAddModal(){
    setAddModal(true)
  }



  //Adds a book to the temporary list
  function handleBook(Book){
    const authorArray = Book.volumeInfo.authors
    const newBook = { title: Book.volumeInfo.title, author: authorArray.join(), image: Book.volumeInfo.imageLinks.thumbnail};
    setListBooks([...listBooks, newBook])
    // console.log(listBooks)
  }



  //Adds a new Book to the Book schema
  async function handleAddBook(){
    let info = {"book":selectedBook, "email":currentUser}
    
    try{
    axios.put('/api/users/addBookToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }
    setSelectedShow(false)
  }



  //Adds a new List to the Book schema
  async function handleAddList(e){
    e.preventDefault()
    let info = {"books":listBooks, "title":listName}
    let test = {"books":listBooks, "title":listName}
    setLists([...lists, test])
    console.log(lists)
    
    try{
    axios.put('/api/users/addListToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }

    setAddModal(false)
    setListBooks([])
    setListName("")
  }



  //Displays the current list of selected books
  const ListBookDisplay = ({book}) => {
    return(
      <div className="book-to-be-added-to-list d-inline-block">
        <img className="book-to-be-added-to-list-img" src={book.image} alt={book.title}/>
        <div className="buttonDiv">
          <button onClick={() => handleBook(book)}>Remove</button>
        </div>  
      </div>
    )
  }



  //Displays the searched books from Google Books API
  const SearchedBook = ({book}) => {
    let authorArray = book.volumeInfo.authors
    let authors
    if(authorArray){authors = authorArray.join()}
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <>
      <div className="list-searched-book row">

        <img className="list-searched-book-img" src={url || defaultImage} alt={book.volumeInfo.title}/>
        
        <div>
          <p className="all-text">{book.volumeInfo.title}</p>
          {authorArray && (<p className="all-text">{authors}</p>)} 
          <button onClick={() => handleBook(book)}>Add To List</button>
        </div>
      </div>
      


      {/* <div className="d-inline-block">
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>
          <div className="buttonDiv">
            
            <button onClick={() => handleBook(book)}>Add To List</button>
            
          </div>  
      </div> */}
      </>
    )
  }

  {/* <p>{book.volumeInfo.title}</p> */}
  {/* <button onClick={handleAddBook}>Add To List</button> */}


  return (
    <div className="container-fluid">

        
        <div className="row">

          <div className="col-md-6">

            <h1 className="all-text">New list</h1>
            <div className="pt-1">
              <form onSubmit={handleAddList}>
                <input 
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}    
                  type="text" 
                  className="form-control mt-10" 
                  placeholder="List name" 
                  autoComplete="off"/>
                <input 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}    
                  type="text" 
                  className="form-control mt-10" 
                  placeholder="Description" 
                  autoComplete="off"/>
                
                <button type="submit" className="btn btn-danger">Save List</button>
              </form>
            </div>


            <div className="row">
              <form>
                <div className="form-group">
                  <input onChange={handleSubmit} type="text" className="form-control form-inline" placeholder="Search for books" autoComplete="off"/>
                </div>
              </form>
            </div>


            <div>
              {result.map(book => (
                  <SearchedBook book={book}/>
                ))}
            </div>

          </div>



          <div className="col-md-6">
            { listBooks.length === 0  && (
              <p className="all-text">Add a book to get started</p>
            )}

            {listBooks.map(book => (
              <ListBookDisplay book={book}/>
            ))}
          </div>


         </div>
      </div>
  );
}