const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = require("express").Router();
const {Book, validate} = require("../models/book.model")
const _ = require("lodash")
const mongoose = require("mongoose")
const Fawn = require("fawn")

Fawn.init(mongoose)

router.route("/").get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/add', async (req, res) => {
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
  
    let newBook = new Book(_.pick(req.body, ["title", "author", "image"]))
    newBook = await newBook.save();

    //add to user here
    //add as a transaction

    res.send(newBook._id);
});




//this shit works
// router.route('/add').post((req, res) => {
 
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     let newBook = new Book(_.pick(req.body, ["title", "author", "image"]))

//     newBook.save()
//       .then(() => res.json('Book complete!'))
//       .catch(err => res.status(400).json('Error: ' + err));
// });



//transaction
// try{
//     new Fawn.Task()
//         .save('books', newBook) //books is the collection name
//         .update("users", {id: userEvent._id},{
//             $set add a book to books array
//         })
//         .run()
// }catch(ex){
//     res.status(500).send("Something failed.")
// }



// async function listBooks(){
//     const books = await Book
//         .find()
//         .populate("users")
//         .select("title author image users")
//     console.log(books)
// }

//Admin example
// router.delete('/:id', [auth, admin], async (req, res) => {
//     const genre = await Genre.findByIdAndRemove(req.params.id);
  
//     if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
//     res.send(genre);
// });

// listBooks()
module.exports = router;