import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

//Feed me your lists aand i'll show them for you
export default function DisplayList(props) {
  

  const UsersExistingLists = ({list}) => {
    return(
      <div >
        <h3>{list.title}</h3>
        {list.books.map((book) => (
          <img src={book.image} alt={book.title}/>
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