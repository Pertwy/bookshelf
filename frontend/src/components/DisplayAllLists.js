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

          {list.books.map((book) => (
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
        <div className=" center-all">
          <h4 className="all-text profile-title-text">Create lists to share with your friends</h4>
        </div>

        {props.lists.map(list => (
            <UsersExistingLists list={list}/>
          ))}
    </div>
  );
}