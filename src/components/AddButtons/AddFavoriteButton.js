import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Button from '@material-ui/core/Button';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export default function AdditionButton(props) {

  async function handleAddBook(book){

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, 
      author: authorArray.join(), 
      image: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description,
      categories: book.volumeInfo.categories, 
      industryIdentifiers: book.volumeInfo.industryIdentifiers,
      infoLink: book.volumeInfo.infoLink,
      language: book.volumeInfo.language,
      maturityRating: book.volumeInfo.maturityRating,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
      };

    let info = {"book":newBook, "email":props.currentUser}


    if (props.type === "favorite"){
        try{
            axios.put('http://localhost:5000/api/users/addFavorite', info)
              .then(res => { showNotification(res.data)});
            }catch(e){
              console.error(e)
            }}

    if (props.type === "read"){
        try{
        axios.put('http://localhost:5000/api/users/addBookToUser', info)
          .then(res => { showNotification(res.data)});
        }catch(e){
          console.error(e)
        }}

    if (props.type === "readlist"){
        try{
            axios.put('http://localhost:5000/api/users/addReadList', info)
              .then(res => { showNotification(res.data)});
            }catch(e){
              console.error(e)
            }}

    if (props.type === "bookshelf"){
        try{
        axios.put('http://localhost:5000/api/users/addBookshelf', info)
            .then(res => { showNotification(res.data)});
        }catch(e){
            console.error(e)
        }}

  }

  function showNotification(title){
    store.addNotification({
        title: title,
        message: "teodosii@react-notifications-component",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      })}



    let but
    if (props.type === "favorite"){but = <div><Button onClick={() => handleAddBook(props.book)}>+ Favorite</Button></div>}
    if (props.type === "read"){but = <div><Button onClick={() => handleAddBook(props.book)}>+ Read</Button></div>}
    if (props.type === "readlist"){but = <div><Button onClick={() => handleAddBook(props.book)}>+ Read List</Button></div>}
    if (props.type === "bookshelf"){but = <div><Button onClick={() => handleAddBook(props.book)}>+ Bookshelf</Button></div>}

  return (
    <>{but}</>
  );
}


