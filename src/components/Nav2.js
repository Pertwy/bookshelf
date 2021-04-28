import React, {useState, useCallback} from "react";
import {withRouter, useHistory} from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import "./Navbar.css"

export default function Nav2() {

  const [search, setSearch] = useState("")
  const history = useHistory();
  const handleSearch = useCallback(() => history.push("/searchresults/"+search), [history]);

    return (
        <>
           <Navbar className="nav-background container"  expand="lg">
            <Link to="/" className="nav-text navbar-brand">Bookshelf</Link>
              
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                
                <ul className="navbar-nav ">
                  
                  <li className="navbar-item">
                    <Link to="/test" className="nav-text nav-link">Sign In/Up</Link>
                  </li>

                  <li className="navbar-item ">
                    <Link to="/profile" className="nav-text nav-link">Profile</Link>
                  </li>

                  <li className="navbar-item">
                    <Form inline>
                      {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={({ target }) => setSearch(target.value)}/> */}
                      <TextField onChange={({ target }) => setSearch(target.value)} placeholder="Search"/>
                      <Button onClick={()=> handleSearch()} variant="outline-success">Search</Button>
                    </Form>
                  </li>

                  
                  {/* <Paper component="form" className={classes.root} onSubmit={()=> handleSearch()} >
                    <InputBase
                      className={classes.input}
                      placeholder="Search"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={({ target }) =>     
                          setSearch(target.value)}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper> */}

                </ul>
                
              </Nav>

              {/* <div className="collpase navbar-collapse">
                <Link to="/" className="navbar-brand">Bookshelf</Link>
                <ul className="navbar-nav ml-auto">
                  
                  <li className="navbar-item">
                  <Link to="/test" className="nav-link">Sign In/Up</Link>
                  </li>

                  <li className="navbar-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                  </li>

                  <Link to={"/searchresults/"+search}>Search</Link>

                </ul>
              </div> */}
              
            </Navbar.Collapse>
          </Navbar>
        </>
            
    );

}