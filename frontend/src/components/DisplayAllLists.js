import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Link } from "react-router-dom";
import AddList from "../pages/AddList";
import "./Navbar.css"

//Feed me your lists aand i'll show them for you
export default function DisplayAllLists(props) {
  

  const UsersExistingLists = ({list}) => {
    return(
      <div className="pb-4" >
        
          <div className="row space-between px-4 ">
            
            <h4 className="list-title">{list.title}</h4>

            {/* <div className="row">
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
          </div>

          {list.books.slice(0, 10).map((book) => (
            <span className="listDiv">
              <Link to={"/book/"+book._id}>
              <span class="btn-img">
                <img className="listBook" src={book.image} alt={book.title}/>
              </span>
              </Link>
              
    
            </span>
          ))}
        
      </div>
    )
  }


  return (

    <div>
        
        {props.lists.map(list => (
            <UsersExistingLists list={list}/>
          ))}
    </div>
  );
}