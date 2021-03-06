import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import defaultImage from '../assets/default-image.png';
import AdditionButton from "../components/AddButtons/AddFavoriteButton"
import 'react-notifications-component/dist/theme.css'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {  Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default function SearchResults(props) {

  const [result, setResult] = useState([])
  const [apiKey, setapiKey] = useState("AIzaSyDz2I7ZkOYGa4ZAkMrVE_aT7HBpapeuIII")
  const [currentUser, setCurrentUser] = useState("")
  const [isLoggedIn, setIsLoggedIn] =useState("")
  const history = useHistory();
  const [search, setSearch] = useState("cats")

  const useStyles = makeStyles((theme) => ({
    input:{
      '& > *': {

      color: "#DFE0E1",   
      width: "100px",
      padding: "auto",
      }
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    axios.get('/api/users/currentUser')
          .then(response => (setIsLoggedIn(response.data)))
    
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+props.location.pathname.replace("/searchresults/", "")+ "&key="+apiKey+"&maxResults=40", {withCredentials: false})
      .then(data => {
        setResult(data.data.items)
      })
    },[])

    function handleSearch(){    
      history.push("/searchresults/"+search)
    }
 
    const SearchedBook = ({book}) => {
    const url = book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
    const authorArray = book.volumeInfo.authors
    
    return(
      <div className="row space-between mb-4 searched-row pb-2 shadow-lg">
        <div className="search-results-image">
          <Link   to={
                  {     
                    pathname: '/book/'+ book.id,
                    state: book.volumeInfo
                    }
              }>               
            <img className="search-image " src={url || defaultImage} alt={book.volumeInfo.title}/>
            </Link>
        </div>

        <div className="ml-3 search-results-text">
          <div className={"description"}>
            <h5 className={"searched-title all-text"}>{book.volumeInfo.title}</h5>
            {authorArray && (
            <p className={"searched-author all-text"}>{authorArray.join()}</p>
            )}
          </div>
        </div>
        


        {isLoggedIn &&(<>
        <div className="search-results-buttons">
            <div className="testDiv">
            <AdditionButton  type="favorite" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton  type="read" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton  type="readlist" currentUser={currentUser} book={book} page="SearchResults"/>
            <AdditionButton  type="bookshelf" currentUser={currentUser} book={book} page="SearchResults"/>
            </div>
        </div> </>)}

      </div>
    )
  }



  return (
    <div className="container">
        <div className="container center-all">

          <div className="result-width center-all mb-3" >
            <div className="space-between">
              <p className={"all-text"}>SHOWING RESULTS FOR {props.location.pathname.replace("/searchresults/", "")}</p>
            </div>
            <div className="search-box" >
              <Form onSubmit={handleSearch}>
                <TextField className={classes.input} onChange={({ target }) => setSearch(target.value)} placeholder="Search All Books"/>
                {/* <Button type="submit" variant="outline-success">Search</Button> */}
              </Form>
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

