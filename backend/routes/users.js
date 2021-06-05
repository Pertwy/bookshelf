
//The dropdown, user select, menus are going to stay from now as they work extremely well for testing 
//When this is complete. Auth middleware needs to be added to most of these funstions


const router = require("express").Router();
let {User} = require("../models/user.model")
let {Book} = require("../models/book.model")
let {List} = require("../models/list.model")
const {Review} = require("../models/review.model")
const _ = require("lodash")
const config = require("config")
const express = require('express');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const isLoggedin = require("../middleware/isLoggedIn")

router.get('/currentUser', isLoggedin, async (req, res) => {
    let user = await User.findById(req.user._id)
    
    if (user){ 
        res.send(req.user);
    } else {res.send(null)}
});



//Add user
router.post('/add', async (req, res) => {
    // console.log(req.body)
 
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new User(_.pick(req.body, [ "email", "userName", "givenName", "surname", "password", "bio"]));
    
    let tom = await User.findById("60b25ffd76132833d8eaa9e7")
    tom.followers.push(newUser._id)
    tom.following.push(newUser._id)
    await tom.save()


    let salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)

    let token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.cookie("token", token, {httpOnly: true}).send(_.pick(newUser, ["_id", "email", "userName"])))
        // .catch(err => res.status(400).json("Error " + err))
  });



//Return user data with fields populated
router.get('/', auth, async (req, res) => {
    //let user = await User.findOne({email: req.body.email})
    let user = await User.findById(req.user._id)

        .select('-__v -password -email')
        .populate("books favorites followers readList bookshelf lists -__v -password -email")
        .populate({
            path: 'following',
            populate: { path: 'books'}
          })
        .populate({
            path: 'following',
            populate: { path: 'bookshelf'}
            })
        .populate({
            path: 'reviews',
            populate: { path: 'book'}
            })
    res.send(user);
});


//Return user data with fields populated
router.get('/popular', async (req, res) => {
    //let user = await User.findOne({email: req.body.email})
    let user = await User.findById("60b25ffd76132833d8eaa9e7")
        //.select('-__v -password -email')
        .select('favorites books')
        .populate("favorites books")

    res.send(user);
});





//Find all test users - For drop down
router.get("/all", async (req, res) => {
    User.find()
        .select('-__v -password -email')
        // .populate('bookids', '-_id -__v')
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})


//Get Test user info by id
router.get("/:_id", async (req, res) => {
    User.findById(req.params._id)
        .select('-__v -password -email')
        .populate("books favorites followers readList bookshelf lists")
        .populate("following", "-__v -password -email")
        .populate({
            path: 'reviews',
            populate: { path: 'book'}
            })
        
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

//Find a users lists
router.get('/grablists', auth, async (req, res) => {
    let user = await User.findById(req.user._id)
        .populate("lists") //This is the field name
        .select("books -__v -password -email");
    res.send(user);
});


//Add a list 
router.put('/addListToUser', async (req, res) => {

    let user = await User.findById(req.user._id)
    console.log(user)

    let newList = new List({title:req.body.title, books:req.body.books, creator:user._id})
    newList = await newList.save();
    
    user.lists.push(newList._id)

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Add Check if book is in the DB///////////////////////////////////////////////////////////////////////////////////
router.get('/checkBook/:_id', async (req, res) => {
    let book = await Book.findById(req.params._id)
    .populate({
        path: 'reviews',
        populate: { path: 'author' }
    })
    .catch(err => res.status(400).json("Error " + err))
    
    if(book) {
        res.send(book);
    }
    else{
        res.send(false)
    }
});
//Add book to the Database  
router.put('/addBookToDB', async (req, res) => {
    //console.log(req.body)

    let newBook = new Book(_.pick(req.body.book, ["_id", "title", "author", "image", "description", "categories", "industryIdentifiers", "infoLink", "language", "maturityRating","pageCount", "publishedDate", "publisher"]))
    await newBook.save()
        .then(() => res.json('Book added to DB'))
        .catch(err => res.status(400).json('Error: ' + err));
});




//Add book to favorites///////////////////////////////////////////////////////////////////////////////////
router.put('/addFavorite', auth, async (req, res) => {

    let user = await User.findById(req.user._id)
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.favorites.push(book._id)
        book.numberOfTimesFavorited += 1
        await user.save()
        await book.save()
            .then(() => res.json('Favourite Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image", "description", "categories", "industryIdentifiers", "infoLink", "language", "maturityRating","pageCount", "publishedDate", "publisher"]))
        newBook = await newBook.save();
        
        user.favorites.push(newBook._id)
    
        await user.save()
            .then(() => res.json('New Favourite Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


//Add book to bookshelf
router.put('/addBookshelf', auth, async (req, res) => {
    
    let user = await User.findById(req.user._id)
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })

    
    if(book != null) {
        user.bookshelf.push(book._id)
        book.bookshelf.push(user._id)
        await user.save()
        await book.save()
            .then(() => res.json('Added to Bookshelf!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image", "description", "categories", "industryIdentifiers", "infoLink", "language", "maturityRating","pageCount", "publishedDate", "publisher"]))
        newBook = await newBook.save();

        let bookupdate = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
        bookupdate.bookshelf.push(user._id)
        bookupdate = await bookupdate.save();
        
        user.bookshelf.push(newBook._id)
    
        await user.save()
            .then(() => res.json('New Added to Bookshelf!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


//Add book to bookshelf
router.put('/addReadList', auth, async (req, res) => {
    
    let user = await User.findById(req.user._id)
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })

    
    if(book != null) {
        user.readList.push(book._id)
        book.readList.push(user._id)
        await user.save()
        await book.save()
            .then(() => res.json('Added to Read List!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image", "description", "categories", "industryIdentifiers", "infoLink", "language", "maturityRating","pageCount", "publishedDate", "publisher"]))
        newBook = await newBook.save();

        let bookupdate = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
        bookupdate.readList.push(user._id)
        bookupdate = await bookupdate.save();
        
        user.readList.push(newBook._id)
    
        await user.save()
            .then(() => res.json('New Added to Read List!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});



//Add book to books read
router.put('/addBookToUser', auth, async (req, res) => {
    //console.log(req.body)
    
    let user = await User.findById(req.user._id)
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.books.push(book._id)
        book.numberOfTimesRead += 1
        await user.save()
        await book.save()
            .then(() => res.json('Book updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image", "description", "categories", "industryIdentifiers", "infoLink", "language", "maturityRating","pageCount", "publishedDate", "publisher"]))
        newBook.numberOfTimesRead += 1
        newBook = await newBook.save();
        
        user.books.push(newBook._id)
        await user.save()
            .then(() => res.json('New Book updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


//Follow another user
router.post('/follow', auth,  async (req, res) => {
    let user = await User.findById(req.user._id)
    user.following.push(req.body.follow)

    let otherUser = await User.findById(req.body.follow)
    otherUser.followers.push(user._id)

    await otherUser.save()
    await user.save()
        .then(() => res.json('Followed'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Unfollow another user
router.post('/unfollow', auth,  async (req, res) => {
    let user = await User.findById(req.user._id)

    index = user.following.indexOf(req.body.unfollow)
    user.following.splice(index, 1)


    let otherUser = await User.findById(req.body.unfollow)
    otherindex = otherUser.followers.indexOf(req.body.unfollow)
    otherUser.followers.splice(otherindex, 1)
    await otherUser.save()


    await user.save()
    .then(() => res.json('Unfollowed'))
        .catch(err => res.status(400).json('Error: ' + err));
});





//REmove favorite book from user
router.post('/removefavorite', auth, async (req, res) => {
    let user = await User.findById(req.user._id)

    index = user.favorites.indexOf(req.body.book)
    user.favorites.splice(index, 1)

    await user.save()
        .then(() => res.json('Deleted from Favorites'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove book from Read
router.post('/removebook', auth, async (req, res) => {
     let user = await User.findById(req.user._id)

    index = user.books.indexOf(req.body.book)
    user.books.splice(index, 1)

    await user.save()
        .then(() => res.json('Deleted from Books Read!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove book from readList 
router.post('/removereadlist', auth, async (req, res) => {
    let user = await User.findById(req.user._id)

    index = user.readList.indexOf(req.body.book)
    user.readList.splice(index, 1)

    await user.save()
        .then(() => res.json('Deleted from Read List'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Remove book from readList 
router.post('/removebookshelf', auth, async (req, res) => {
    let user = await User.findById(req.user._id)

   index = user.bookshelf.indexOf(req.body.book)
   user.bookshelf.splice(index, 1)

   await user.save()
       .then(() => res.json('Deleted from bookshelf'))
       .catch(err => res.status(400).json('Error: ' + err));
});



//Delete user by ID
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});




//Add a review. Includes rating
router.post('/addreview', auth, async (req, res) => {


    //Find user
    let user = await User.findById(req.user._id)
    
    //Find book
    let CurrentBook =  await Book.findById(req.body._id)
    
    //New Review
    const book = req.body._id;
    const author = user._id;
    const authorName = user.userName
    const review = req.body.review;
    const rating = req.body.rating;

    const newReview = new Review({
        book,
        author,
        review,
        rating,
        authorName
    });
    await newReview.save()

    
    //Push review ID to user and book
    CurrentBook.reviews.push(newReview._id)
    user.reviews.push(newReview._id)

    if(rating === "0.5"){
        CurrentBook.rating.one.push(author)
    }
    if(rating === "1"){
        CurrentBook.rating.two.push(author)
    }
    if(rating === "1.5"){
        CurrentBook.rating.three.push(author)
    }
    if(rating === "2"){
        CurrentBook.rating.four.push(author)
    }
    if(rating === "2.5"){
        CurrentBook.rating.five.push(author)
    }
    if(rating === "3"){
        CurrentBook.rating.six.push(author)
    }
    if(rating === "3.5"){
        CurrentBook.rating.seven.push(author)
    }
    if(rating === "4"){
        CurrentBook.rating.eight.push(author)
    }
    if(rating === "4.5"){
        CurrentBook.rating.nine.push(author)
    }
    if(rating === "5"){
        CurrentBook.rating.ten.push(author)
    }

    await CurrentBook.save()
    await user.save()
        .then(() => res.json('Review added'))
        .catch(err => res.status(400).json('Error: ' + err));

});



  module.exports = router;