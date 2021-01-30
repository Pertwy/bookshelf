const router = require("express").Router();
let {Testuser} = require("../models/testuser.model")
let {Book} = require("../models/book.model")
const _ = require("lodash")
const config = require("config")
const auth = require("../middleware/auth")
const express = require('express');

router.route("/").get((req, res) => {
    Testuser.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})

router.post('/books', async (req, res) => {
    const user = await Testuser.findOne({email: req.body.email})
        .populate("books") //This is the mongo db collect name
        .select("books");
    res.send(user);
//{email:req.body.user}
});

router.put('/addBookToUser', async (req, res) => {
    let newBook = new Book(_.pick(req.body.book, ["title", "author", "image"]))
    newBook = await newBook.save();
    
    console.log(newBook)
    
    let user = await Testuser.findOne({email: req.body.email})
    user.books.push(newBook._id)

    console.log(user.books)

    await user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.put('/addFriendToUser', async (req, res) => {
    let friend = await Testuser.findOne({email: req.body.friend})
    
    let user = await Testuser.findOne({email: req.body.currentuser})
    user.books.push(friend._id)

    await user.save()
        .then(() => res.json('User updated!'))
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