import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import showNotification from "./showNotification"


export async function handleAddBook(book, type, user){
  

    const authorArray = book.volumeInfo.authors
    const newBook = { title: book.volumeInfo.title, 
      author: authorArray.join(), 
      _id: book.id,
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

    let info = {"book":newBook}

    if (type === "favorite"){
        try{
            axios.put('/api/users/addFavorite', info)
              .then(res => { showNotification(res.data, res.data)});
            }catch(e){
              console.error(e)
            }}

    if (type === "read"){
        try{
        axios.put('/api/users/addBookToUser', info)
          .then(res => { showNotification(res.data, res.data)});
        }catch(e){
          console.error(e)
        }}

    if (type === "readlist"){
        try{
            axios.put('/api/users/addReadList', info)
              .then(res => { showNotification(res.data, res.data)});
            }catch(e){
              console.error(e)
            }}

    if (type === "bookshelf"){
        try{
        axios.put('/api/users/addBookshelf', info)
            .then(res => { showNotification(res.data, res.data)});
        }catch(e){
            console.error(e)
        }}

  }