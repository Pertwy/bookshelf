import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

export default function Navbar() {

    return (
      <nav className="navrow navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/creategoal" className="nav-link">Create Goal</Link>
            </li>
            
            <li className="navbar-item">
            <Link to="/creatediary" className="nav-link">Create Diary Entry</Link>
            </li>
          </ul>
        </div>
      </nav>
    );

}