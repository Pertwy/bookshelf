import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"

export default function Navbar() {

    return (
      <div className= "container-fullwidth">
      <nav className= "space-between navrow navbar navbar-dark bg-dark navbar-expand-lg">

        {/* <div>
          <h3 className="Bookshelf">Bookshelf</h3>
        </div> */}

        
        <div className="collpase navbar-collapse">
          <Link to="/" className="navbar-brand">Bookshelf</Link>
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

            <li className="navbar-item">
            <Link to="/lists" className="nav-link">Lists</Link>
            </li>

            <li className="navbar-item">
            <Link to="/user" className="nav-link">User</Link>
            </li>
          </ul>
        </div>
   
      </nav>
      </div>
    );

}