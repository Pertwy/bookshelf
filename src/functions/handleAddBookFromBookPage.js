import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import showNotification from "./showNotification"


export async function handleAddBookFromBookPage(book, type, user){

    const newBook = { 
      title: book.title, 
      author: book.author, 
      image: book.image,
      description: book.description,
      categories: book.categories, 
      industryIdentifiers: book.industryIdentifiers,
      infoLink: book.infoLink,
      language: book.language,
      maturityRating: book.maturityRating,
      pageCount: book.pageCount,
      publishedDate: book.publishedDate,
      publisher: book.publisher
      };

    let info = {"book":newBook, "email":user}


    if (type === "favorite"){
        try{
            axios.put('http://localhost:5000/api/users/addFavorite', info)
              .then(res => { showNotification(res.data, res.data)});
            }catch(e){
              console.error(e)
            }}

    if (type === "read"){
        try{
        axios.put('http://localhost:5000/api/users/addBookToUser', info)
          .then(res => { showNotification(res.data, res.data)});
        }catch(e){
          console.error(e)
        }}

    if (type === "readlist"){
        try{
            axios.put('http://localhost:5000/api/users/addReadList', info)
              .then(res => { showNotification(res.data, res.data)});
            }catch(e){
              console.error(e)
            }}

    if (type === "bookshelf"){
        try{
        axios.put('http://localhost:5000/api/users/addBookshelf', info)
            .then(res => { showNotification(res.data, res.data)});
        }catch(e){
            console.error(e)
        }}

  }