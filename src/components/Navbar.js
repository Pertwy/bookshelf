import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"
import {  Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


export default function Navbar() {

  const [search, setSearch] = useState("cats")
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] =useState("")

  useEffect(() => {

      axios.get('http://localhost:5000/api/users/currentUser')
        .then(response => (setIsLoggedIn(response.data)))
        //.then(response => (setUserData(response.data)))

  },[])

  function logout(){
    axios.get('http://localhost:5000/api/auth/logout_get')
    .then(navigateHome())
 
  }

  function navigateHome(){    
    history.push("/")
    window.location.reload();
  }

  function handleSearch(){    
    history.push("/searchresults/"+search)
  }




  const useStyles = makeStyles((theme) => ({
    input:{
      '& > *': {
 
      color: "#e4e5e6",   
      width: "100px",
      paddingLeft: "10px",
      paddingRight: "10px", 
      marginLeft: "10px",
      marginRight: "10px", 
      }
    }
  }));

  const classes = useStyles();






    return (
      <div className= "container-fullwidth">
     
      <nav>
        <input type="checkbox" id="check"/>
        <label for="check" class="checkbtn">
          <i >MENU</i>
        </label>
        <Link to="/" className="logo all-text nav-text navbar-brand"><h2 className="all-text">Bookshelf</h2></Link>
        <ul className="nav-drop-down">

                {!isLoggedIn && (
                  <>
                    <li className="navbar-item">
                      <Link to="/signup" className="nav-text nav-link"><h6 className="all-text">Sign In/Up</h6></Link>
                    </li>
                  </>
                  )}
                  

                  <li className="navbar-item">
                    <Link to="/members" className="nav-text nav-link"><h6 className="all-text">Members</h6></Link>
                  </li>

                  {isLoggedIn && (
                  <>
                    <li className=" ">
                      <Link to="/profile" className="nav-text nav-link"><h6 className="all-text">Profile</h6></Link>
                    </li>

                    <li  className="navbar-item ">
                      {/* <button onClick={()=>logout()}>Log Out</button> */}
                      <h4 onClick={()=>logout()} className="all-text  logout-button" >SIGN OUT</h4>
                    </li>
                  </>
                  )}


                  <li className="navbar-item">
                    <Form inline onSubmit={handleSearch}>
                      <TextField className={classes.input} onChange={({ target }) => setSearch(target.value)} placeholder="Search"/>
                      <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                  </li>
                 
                 </ul>
      </nav>
   
     
      </div>
    );

}