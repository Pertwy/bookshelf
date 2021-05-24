import React, {useState, useCallback} from "react";
import {useHistory} from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import "./Navbar.css"
import { makeStyles } from '@material-ui/core/styles';


export default function Nav2() {

  const [search, setSearch] = useState("cats")
  const history = useHistory();

  function test(e){    
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
        <>
           <Navbar className="nav-background container"  expand="lg">
            <Link to="/" className="all-text nav-text navbar-brand"><h2 className="all-text">Bookshelf</h2></Link>
              
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                
                <ul className="navbar-nav ">

                  <li className="navbar-item">
                    <Link to="/signup" className="nav-text nav-link"><h6 className="all-text">TestSign</h6></Link>
                  </li>
                  
                  <li className="navbar-item">
                    <Link to="/test" className="nav-text nav-link"><h6 className="all-text">Sign In/Up</h6></Link>
                  </li>

                  <li className="navbar-item">
                    <Link to="/members" className="nav-text nav-link"><h6 className="all-text">Members</h6></Link>
                  </li>

                  <li className="navbar-item ">
                    <Link to="/profile" className="nav-text nav-link"><h6 className="all-text">Profile</h6></Link>
                  </li>


                  <li className="navbar-item">
                    <Form inline onSubmit={test}>
                      <TextField className={classes.input} onChange={({ target }) => setSearch(target.value)} placeholder="Search"/>
                      <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                  </li>
                 
                 </ul>
                
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>
        </>
            
    );

}