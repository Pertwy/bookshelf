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
  function navigateMembers(){    
    history.push("/members")
  }
  function navigateProfile(){    
    history.push("/profile")
  }
  function navigateSignIn(){    
    history.push("/signup")
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
          <label for="check" class="checkbtn-menu flot-right">
            <i className="">MENU</i>
          </label>

          <span>
            <h4 className="all-text home-btn" onClick={()=>navigateHome()}>Bookshelf</h4>
          </span>
       
          {/* <input type="checkbox" id="check"/>
          <label for="check" class="checkbtn">
            <i onClick={()=>navigateHome()}>Bookshelf</i>
          </label> */}
       
       

        <ul className="nav-drop-down">

                {!isLoggedIn && (
                  <>
                    <li>
                      <input type="checkbox" id="check"/>
                      <label for="check" class="checkbtn-menu-item">
                        <i onClick={()=>navigateSignIn()}>Sign In/UP</i>
                      </label>
                    </li>
                  </>
                  )}

                  <li>
                    <input type="checkbox" id="check"/>
                    <label for="check" class="checkbtn-menu-item-home">
                      <i onClick={()=>navigateHome()}>HOME</i>
                    </label>
                  </li>


                  <li>
                    <input type="checkbox" id="check"/>
                    <label for="check" class="checkbtn-menu-item">
                      <i onClick={()=>navigateMembers()}>MEMBERS</i>
                    </label>
                  </li>

                  {isLoggedIn && (
                  <>

                    <li>
                      <input type="checkbox" id="check"/>
                      <label for="check" class="checkbtn-menu-item">
                        <i onClick={()=>navigateProfile()}>PROFILE</i>
                      </label>
                    </li>

                    <li>
                      <i onClick={()=>logout()} className=" checkbtn-menu-item logout-button" >SIGN OUT</i>
                    </li>
                  </>
                  )}


                  <li className="navbar-item-search">
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