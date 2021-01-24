const auth = require("../middleware/auth")
const router = require("express").Router();
const {Book, validate} = require("../models/book.model")
const _ = require("lodash")

router.route("/").get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json("Error " + err))
})


//this shit works
// router.route('/add').post((req, res) => {
 
//     const { error } = validate(req.body); 
//     if (error) return res.status(400).send(error.details[0].message);

//     let newBook = new Book(_.pick(req.body, ["title", "author", "image"]))

//     newBook.save()
//       .then(() => res.json('Book complete!'))
//       .catch(err => res.status(400).json('Error: ' + err));
// });

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let newBook = new Book(_.pick(req.body, ["title", "author", "image"]))
    newBook = await newBook.save();
    
    res.send(newBook);
  });


module.exports = router;