const router = require("express").Router();
let {Testuser} = require("../models/testuser.model")
let {Book} = require("../models/book.model")
let {List} = require("../models/list.model")
const _ = require("lodash")
const config = require("config")
const auth = require("../middleware/auth")
const express = require('express');


router.post('/', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.email})
        .populate("books")
        .populate("favorites")
        .populate("readList")
        .populate("lists") 
        .populate({
            path: 'following',
            populate: { path: 'books' }
          });; 

    // console.log(user.following)

    res.send(user);

});





router.get("/all", async (req, res) => {
    Testuser.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

router.get("/:_id", async (req, res) => {
    Testuser.findById(req.params._id)
        .populate("books")
        .populate("favorites")
        .populate("readList")
        .populate("lists") 
        .populate("following")
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/grablists', async (req, res) => {
    const user = await Testuser.findOne({email: req.body.email})
        .populate("lists") //This is the field name
        .select("books");
    res.send(user);
//{email:req.body.user}
});


router.put('/addListToUser', async (req, res) => {


    let user = await Testuser.findOne({email: req.body.email})
    console.log(user)

    let newList = new List({title:req.body.title, books:req.body.books, creator:user._id})
    newList = await newList.save();
    
    user.lists.push(newList._id)

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.put('/addFavorite', async (req, res) => {
    
    let user = await Testuser.findOne({email: req.body.email})
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.favorites.push(book._id)
        book.numberOfTimesFavorited += 1
        await user.save()
        await book.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
        newBook = await newBook.save();
        
        user.favorites.push(newBook._id)
    
        await user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});




router.put('/addReadList', async (req, res) => {
    let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
    newBook = await newBook.save();
    
    let user = await Testuser.findOne({email: req.body.email})
    user.readList.push(newBook._id)

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.put('/addBookToUser', async (req, res) => {
    //console.log(req.body)
    
    let user = await Testuser.findOne({email: req.body.email})
    let book = await Book.findOne({author: req.body.book.author, title: req.body.book.title, image: req.body.book.image })
    
    if(book) {
        user.books.push(book._id)
        book.numberOfTimesRead += 1
        await user.save()
        await book.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else{
        let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
        newBook = await newBook.save();
        
        user.books.push(newBook._id)
    
        await user.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});


router.post('/follow', async (req, res) => {
    let follow = await Testuser.findOne({email: req.body.follow})
    
    let user = await Testuser.findOne({email: req.body.currentUser})
    user.following.push({_id:follow._id, name:follow.name})

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.post('/removefavorite', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.favorites.indexOf(req.body.book)
    user.favorites.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/removebook', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.books.indexOf(req.body.book)
    user.books.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/removereadlist', async (req, res) => {
    let user = await Testuser.findOne({email: req.body.currentUser})

    index = user.readList.indexOf(req.body.book)
    user.readList.splice(index, 1)

    await user.save()
        .then(() => res.json('fave deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/add', async (req, res) => {
    console.log(req.body)
 
    let user = await Testuser.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new Testuser(_.pick(req.body, ["email", "name"]));
    
    await newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
        //.then(() => send(_.pick(newUser, ["_id", "email", "name"])))
  });





router.put('/createBookAndAddToUser', auth, async (req, res) => {
    let user = await User.findById(req.user._id)
    user.books.push(req.body.book)

    user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));        
});

  module.exports = router;