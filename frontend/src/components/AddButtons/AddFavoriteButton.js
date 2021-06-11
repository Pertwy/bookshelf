import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Button from '@material-ui/core/Button';
import {handleAddBook} from "../../functions/handleAddBook"
import {handleAddBookFromBookPage} from "../../functions/handleAddBookFromBookPage"
import "../../index.css"

export default function AdditionButton(props) {

  function SearchResultButton(props){

    return(
      <Button 

        style={{
          borderRadius: 5,
          // backgroundColor: "#21b6ae",
          color: "#e4e5e6",
          padding: "5px 7px",
          fontSize: "13px"
        }}
        onClick={() => handleAddBook(props.book, props.type, props.currentUser)}
        >{props.title}</Button>
    )
  }


  function ViewBookButton(props){
    return(
      <Button 

        style={{
        borderRadius: 5,
        // backgroundColor: "#21b6ae",
        color: "#e4e5e6",
        padding: "7px 7px",
        fontSize: "11px"
        }}
        //onClick={()=>console.log(props.book)}
        onClick={() => handleAddBookFromBookPage(props.book, props.type)}
        >{props.title}</Button>
    )
    }

    //


    let but
    if (props.type === "favorite" && props.page === "SearchResults"){but = <span><SearchResultButton book={props.book} type={props.type} title="+ Favorite"/></span>}
    if (props.type === "read" && props.page === "SearchResults"){but = <span><SearchResultButton book={props.book} type={props.type} title="+ Read"/></span>}
    if (props.type === "readlist" && props.page === "SearchResults"){but = <span><SearchResultButton book={props.book} type={props.type} title="+ Read List"/></span>}
    if (props.type === "bookshelf" && props.page === "SearchResults"){but = <span><SearchResultButton book={props.book} type={props.type} title="+ Bookhelf"/></span>}

    if (props.type === "favorite" && props.page === "ViewBook"){but = <span><ViewBookButton book={props.book} type={props.type} title="+ Favorite"/></span>}
    if (props.type === "read" && props.page === "ViewBook"){but = <span><ViewBookButton book={props.book} type={props.type} title="+ Read"/></span>}
    if (props.type === "readlist" && props.page === "ViewBook"){but = <span><ViewBookButton book={props.book} type={props.type} title="+ Read List"/></span>}
    if (props.type === "bookshelf" && props.page === "ViewBook"){but = <span><ViewBookButton book={props.book} type={props.type} title="+ Bookshelf"/></span>}

  return (
    <>{but}</>
  );
}


