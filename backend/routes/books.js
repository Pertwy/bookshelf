const router = require("express").Router();
let Book = require("../models/book.model")

router.route("/").get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json("Error " + err))
})

router.route('/add').post((req, res) => {
 
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    //const endDate = Date.parse(req.body.date);

    const newBook = new Book({
        title,
        author,
        image
        //endDate
    });


    newBook.save()
      .then(() => res.json('Book complete!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
    Test.findById(req.params.id)
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Test.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Test.findById(req.params.id)
        .then(book => {
        book.description = req.body.description;

        Test.save()
            .then(() => res.json('Book updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;