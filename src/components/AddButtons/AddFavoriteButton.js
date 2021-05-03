import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Button from '@material-ui/core/Button';
import {handleAddBook} from "../../functions/handleAddBook"
import {handleAddBookFromBookPage} from "../../functions/handleAddBookFromBookPage"

export default function AdditionButton(props) {

    let but
    if (props.type === "favorite" && props.page === "SearchResults"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Favorite</Button></div>}
    if (props.type === "read" && props.page === "SearchResults"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Read</Button></div>}
    if (props.type === "readlist" && props.page === "SearchResults"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Read List</Button></div>}
    if (props.type === "bookshelf" && props.page === "SearchResults"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Bookshelf</Button></div>}

    if (props.type === "favorite" && props.page === "ViewBook"){but = <div><Button onClick={() => handleAddBookFromBookPage(props.book, props.type, props.currentUser)}>+ Favorite</Button></div>}
    if (props.type === "read" && props.page === "ViewBook"){but = <div><Button onClick={() => handleAddBookFromBookPage(props.book, props.type, props.currentUser)}>+ Read</Button></div>}
    if (props.type === "readlist" && props.page === "ViewBook"){but = <div><Button onClick={() => handleAddBookFromBookPage(props.book, props.type, props.currentUser)}>+ Read List</Button></div>}
    if (props.type === "bookshelf" && props.page === "ViewBook"){but = <div><Button onClick={() => handleAddBookFromBookPage(props.book, props.type, props.currentUser)}>+ Bookshelf</Button></div>}

  return (
    <>{but}</>
  );
}


