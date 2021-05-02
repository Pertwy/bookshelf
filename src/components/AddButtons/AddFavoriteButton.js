import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Button from '@material-ui/core/Button';
import {handleAddBook} from "../../functions/handleAddBook"

export default function AdditionButton(props) {

    let but
    if (props.type === "favorite"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Favorite</Button></div>}
    if (props.type === "read"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Read</Button></div>}
    if (props.type === "readlist"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Read List</Button></div>}
    if (props.type === "bookshelf"){but = <div><Button onClick={() => handleAddBook(props.book, props.type, props.currentUser)}>+ Bookshelf</Button></div>}

  return (
    <>{but}</>
  );
}


