import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"
import DisplayList from "../components/DisplayLists"


export default function AddList() {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [lists, setLists] = useState([])
  const [listBooks, setListBooks] = useState([])
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
      axios.get('http://localhost:5000/api/users/grablists')
        .then(response => (setLists(response.data.lists)))
  },[addModal])
  


  //Search Google books Api
  function handleSubmit(e){
    e.preventDefault()

    const book = e.target.value
      setBook(book.trim())

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+ "&key="+apiKey+"&maxResults=40")
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
    axios.put('http://localhost:5000/api/users/addBookToUser', info)
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
    axios.put('http://localhost:5000/api/users/addListToUser', info)
      .then(res => { console.log(res)});
    }catch(e){
      console.error(e)
    }

    setAddModal(false)
    setListBooks([])
    setListName("")
  }


//Displays users existing lists
const UsersExistingLists = ({list}) => {
  return(
    <div >
      <h2>{list.title}</h2>
      {list.books.map((book) => (
        <img src={book.image} alt={book.title}/>
      ))}
    </div>
  )
}



  //Displays the current list of selected books
  const ListBookDisplay = ({book}) => {
    return(
      <div className="d-inline-block">
        <img src={book.image} alt={book.title}/>
        <div className="buttonDiv">
          <button onClick={() => handleBook(book)}>Remove</button>
        </div>  
      </div>
    )
  }



  //Displays the searched books from Google Books API
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    return(
      <div className="d-inline-block">
        <img src={url || defaultImage} alt={book.volumeInfo.title}/>
          <div className="buttonDiv">
            <button onClick={() => handleBook(book)}>Add To List</button>
            {/* <button onClick={handleAddBook}>Add To List</button> */}
          </div>  
      </div>
    )
  }

  


  return (
    <div className="container-fluid">

        
        <div className="row">

          {/* Left div */}
          <div className="col-md-6">


            <h1>Add/Edit Lists</h1>
            <UserDropDown setEmail={setCurrentUser}/>
            <button onClick={handleAddModal} className="btn btn-danger">Add New List</button>


            {/* Add list form */}
            {addModal &&(
            <div className="pt-5">
              <h3>Add new list</h3>
              <form onSubmit={handleAddList}>
                <input 
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}    
                  type="text" 
                  className="form-control mt-10" 
                  placeholder="List name" 
                  autoComplete="off"/>
                
                { listBooks.length === 0  && (
                <p>Add a book to get started</p>
                )}

                {listBooks.map(book => (
                  <ListBookDisplay book={book}/>
                ))}

                <button type="submit" className="btn btn-danger">Save List</button>
              </form>
            </div>)}



            {/*Display users lists*/}
            <div className="pt-5">
              <h2>Your Lists</h2>
              
              <DisplayList lists={lists}/>
            </div>
          </div> {/* Left div end */}


          {/*Right Div*/}
          <div className="col-md-6">
            <div className="row">


              {/*Search google books API */}
              <form>
                <div className="form-group">
                  <input onChange={handleSubmit} type="text" className="form-control mt-10 form-inline" placeholder="Search for books" autoComplete="off"/>
                </div>
                {/* <button type="submit" className="btn btn-danger">Search</button> */}
              </form>


              {/*Display google books API results*/}
                {result.map(book => (
                  <SearchedBook book={book}/>
                ))}

            </div>
          </div>{/*End of Right Div*/}
         </div>
      </div>
  );
}