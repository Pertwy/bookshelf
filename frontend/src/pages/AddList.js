import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"


import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { makeStyles } from '@material-ui/core/styles';


export default function AddList() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [listBooks, setListBooks] = useState([])
  const [description, setDescription] = useState("")
  const [listName, setListName] = useState("")



  const useStyles = makeStyles((theme) => ({
    margin: {
      color:"white",
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();




  //Search Google books API
  function handleSearch(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
    .then(data => {
        setResult(data.data.items)
      })
  }


  //Adds a book to the temporary list
  function handleAddBookToList(Book){
    const authorArray = Book.volumeInfo.authors
    const newBook = { title: Book.volumeInfo.title, author: authorArray.join(), image: Book.volumeInfo.imageLinks.thumbnail};
    setListBooks([...listBooks, newBook])
  }


  //Adds a new List to the Book schema
  async function handleSaveList(e){
    e.preventDefault()
    let info = {"books":listBooks, "title":listName}
    
    try{
    axios.put('/api/users/addListToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }

    //Navigate to the new list
  }



  //Displays the current list of selected books
  const ListBookDisplay = ({book}) => {
    return(
      <div className="book-to-be-added-to-list d-inline-block">
        <img className="book-to-be-added-to-list-img" src={book.image} alt={book.title}/>
        <div className="buttonDiv">
          <button onClick={() => handleAddBookToList(book)}>Remove</button>
        </div>  
      </div>
    )
  }

  



  //Displays the searched books from Google Books API
  const SearchedBook = ({book}) => {

    let authorArray = book.volumeInfo.authors
    let authors
    if(authorArray){authors = authorArray.join()}
    else{authors=""}

    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <>
      <div className="list-searched-book">
        <div className="list-searched-book-left">
          <img className="list-searched-book-img" src={url || defaultImage} alt={book.volumeInfo.title}/>
        
          <div className="ml-3 list-search-results">
            <div className={"description"}>
              <h5 className={"searched-title all-text"}>{book.volumeInfo.title}</h5>
              {authorArray && (
              <p className={"searched-author all-text"}>{authors}</p>
              )}
            </div>
          </div>
        </div>
        
        <IconButton onClick={() => handleAddBookToList(book)} aria-label="edit" className="">
          <AddCircleOutlineRoundedIcon className={classes.margin}/>
        </IconButton>

      </div>
      </>
    )
  }


  return (
    <div className="container-fluid">
        <div className="add-list-container">
          <div className="add-list-container-left px-2">

            <h1 className="all-text">New list</h1>
            <div className="pt-1">
              <form onSubmit={handleSaveList}>
                <input 
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}    
                  type="text" 
                  className="form-control mt-1" 
                  placeholder="List name" 
                  autoComplete="off"/>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}    
                  type="text" 
                  className="form-control mt-1 mb-3" 
                  placeholder="Description" 
                  autoComplete="off" 
                  name="Text1" 
                  cols="40" 
                  rows="5"/>

  
                <div className="books-test add-list-container-hidden">
                  { listBooks.length === 0  && (
                    <div className="start-a-list-text">
                      <p className="all-text pb-3">Add a book to get started</p>
                    </div>
                  )}

                  {listBooks.map(book => (
                    <ListBookDisplay book={book}/>
                  ))}
                </div>

                <div className="save-list-container my-4">
                  <input onChange={handleSearch} type="text" className="form-control  book-search-input mr-4" placeholder="Search for books" autoComplete="off"/>
                  <button type="submit" className="btn btn-danger save-list-button">Save List</button>
                </div>
              </form>
            </div>

            
            <div>
              {result.map(book => (
                  <SearchedBook book={book}/>
                ))}
            </div>


          </div>



          <div className="add-list-container-right px-4">
            <div className="books-test">

              { listBooks.length === 0  && (
                <div className="start-a-list-text">
                  <p className="all-text pb-3">Add a book to get started</p>
                </div>
              )}

              {listBooks.map(book => (
                <ListBookDisplay book={book}/>
              ))}

            </div>
          </div>


         </div>
      </div>
  );
}