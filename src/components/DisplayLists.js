import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import "./Navbar.css"

//Feed me your lists aand i'll show them for you
export default function DisplayList(props) {
  

  const UsersExistingLists = ({list}) => {
    return(
      <div >
        
          <h3>{list.title}</h3>
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
      {console.log(props)}
        {props.lists.map(list => (
            <UsersExistingLists list={list}/>
          ))}
    </div>
  );
}