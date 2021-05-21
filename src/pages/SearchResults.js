import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"
import AdditionButton from "../components/AddButtons/AddFavoriteButton"
import {Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import UserSearch from "../components/UserSearch";

export default function SearchResults(props) {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  const [searchSwitch, setSearchSwtich] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+props.location.pathname.replace("/searchresults/", "")+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })
    },[])

    //Search Google books Api
  function handleSubmit(e){
    e.preventDefault()

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+search+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })
  }
  
  


 
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    const authorArray = book.volumeInfo.authors
    
    return(
      <div className="row space-between mb-4 searched-row pb-2 shadow-lg">

        {/* <div className="col-sm-10 col-md-8"></div> */}
        <div className="col-sm-3 row">
          <div>
            <div className="image-div">
              <img className="mr-2 search-image" src={url || defaultImage} alt={book.volumeInfo.title}/>
            </div>
          </div>
        </div>

        <div className="col-sm-5 row">
          <div className={"description"}>
            <h5 className={"searched-title all-text"}>{book.volumeInfo.title}</h5>
            {authorArray && (
            <p className={"searched-author all-text"}>{authorArray.join()}</p>
            )}
          </div>
        </div>
        
        <div className="col-sm-4">
            <AdditionButton type="favorite" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="read" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="readlist" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="bookshelf" currentUser={currentUser} book={book} page="SearchResults"/>
        </div> 

      </div>
    )
  }

  function handleSearchChange(){
    setSearchSwtich(!searchSwitch)
  }
  let but
  if (searchSwitch){but = <><button onClick={()=> handleSearchChange()}>Search Memebers</button></>}
  else{but = <><button onClick={()=> handleSearchChange()}>Search Books</button></>}




  return (
    <div className="container">
        <div className="container center-all">

          {but}
          <UserDropDown setEmail={setCurrentUser}/>

          {!searchSwitch &&(
          <div>
            <UserSearch/>
          </div>)}



          {searchSwitch &&(
            <>
          <div className="result-width center-all mb-3" >
            <div className="space-between">
              <p className={"all-text"}>SHOWING RESULTS FOR {props.location.pathname.replace("/searchresults/", "")}</p>
            </div>

            <Form inline onSubmit={handleSubmit}>
              <TextField onChange={({ target }) => setSearch(target.value)} placeholder="Search"/>
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>

          </div>


          <div className="result-width center-all"> 
            {result.map(book => (
                <SearchedBook book={book}/>
              ))}
          </div>
          </>)}


        </div>
      </div>
  );
}

