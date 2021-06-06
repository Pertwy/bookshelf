import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import "./Navbar.css"

//Feed me your lists aand i'll show them for you
export default function DisplayAllLists(props) {
  

  const UsersExistingLists = ({list}) => {
    return(
      <div >
        
          <div className="row space-between pl-4 pr-4 pt-4">
            <h3 className="list-title">{list.title}</h3>

            {/* <div className="row">
              <button>Edit</button>
              <button>Delete</button>
            </div> */}
          </div>

          {list.books.map((book) => (
            <span className="listDiv">
              <img className="listBook" src={book.image} alt={book.title}/>
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