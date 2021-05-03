import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import UserDropDown from "../components/UserDropDown"
import Button from '@material-ui/core/Button';
import AdditionButton from "../components/AddButtons/AddFavoriteButton"

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export default function SearchResults(props) {

  const [book, setBook] = useState("")
  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  

  useEffect(() => {
    
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+props.location.pathname.replace("/searchresults/", "")+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })
    },[])
  


 
  const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    const authorArray = book.volumeInfo.authors
    
    return(
      <div className="row space-between mb-4 searched-row pb-2">

        <div className="row ">
          <div>
            <img className="mr-2 seacrh-image" src={url || defaultImage} alt={book.volumeInfo.title}/>
          </div>

          <div className={"description"}>
            <h5 className={"all-text"}>{book.volumeInfo.title}</h5>
            {authorArray && (
            <p className={"all-text"}>{authorArray.join()}</p>
            )}
            {/* <p className={"all-text"}>{book.volumeInfo.description}</p> */}
          </div>
        </div>
        
        <div >
            <AdditionButton type="favorite" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="read" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="readlist" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton type="bookshelf" currentUser={currentUser} book={book} page="SearchResults"/>
        </div> 

      </div>
    )
  }


  return (
    <div className="container">
        <div className="container center-all">

          <div className="result-width center-all mb-3" >
            <div className="space-between">
            <p className={"all-text"}>SHOWING RESULTS FOR {props.location.pathname.replace("/searchresults/", "")}</p>
            
            <UserDropDown setEmail={setCurrentUser}/>
            </div>

          </div>


          <div className="result-width center-all"> 
            {result.map(book => (
                <SearchedBook book={book}/>
              ))}
          </div>


        </div>
      </div>
  );
}


// async function handleAddAuthBook(book){

//   const authorArray = book.volumeInfo.authors
//   const newBook = { title: book.volumeInfo.title, 
//     author: authorArray.join(), 
//     image: book.volumeInfo.imageLinks.thumbnail,
//     description: book.volumeInfo.description,
//     categories: book.volumeInfo.categories, 
//     industryIdentifiers: book.volumeInfo.industryIdentifiers,
//     infoLink: book.volumeInfo.infoLink,
//     language: book.volumeInfo.language,
//     maturityRating: book.volumeInfo.maturityRating,
//     pageCount: book.volumeInfo.pageCount,
//     publishedDate: book.volumeInfo.publishedDate,
//     publisher: book.volumeInfo.publisher,
//     };

//   let info = {"book":newBook}
//   try{
//   axios.post('http://localhost:5000/api/books/addd', info)
//     .then(res => { console.log(res)});
//   }catch(e){
//     console.error(e)
//   }
// }
