import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {

    return (
      <div className= "container-fullwidth">
      <nav className= "navrow navbar navbar-dark bg-dark navbar-expand-lg">
   
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            {/* <li className="navbar-item">
            <Link to="/auth" className="nav-link">Auth</Link>
            </li> */}
            
            <li className="navbar-item">
            <Link to="/test" className="nav-link">Add a user</Link>
            </li>

            <li className="navbar-item">
            <Link to="/booksearch" className="nav-link">Book Search</Link>
            </li>
          </ul>
        </div>
   
      </nav>
      </div>
    );

}