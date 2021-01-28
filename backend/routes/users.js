const router = require("express").Router();
let {User} = require("../models/user.model")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const auth = require("../middleware/auth")
const express = require('express');
const {Book, validate} = require("../models/book.model")


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


router.get('/userbooks', auth, async (req, res) => {
    const user = await User
        .findById(req.body._id)
        //for jwt token
        //.findById(req.user._id)
        .populate("books") //This is the mongo db collect name
        .select("books");
    res.send(user);
});



router.post('/add', async (req, res) => {
 
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new User(_.pick(req.body, ["email", "password", "name"]));

    let salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    
    let token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.header("x-auth-token", token).send(_.pick(newUser, ["_id", "email", "name"])))

    // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]))
    //res.send(user)
  });


router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.put('/createBookAndAddToUser', auth, async (req, res) => {
    let user = await User.findById(req.user._id)
    user.books.push(req.body.book)

    user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
   

        
});


//router.route('/updatebooks/').put((req, res) => {
    //     User.find({"cred": req.params.cred})
    //         .then(user => {
    //         user.books = [ ...user.books, req.body.book];
    
    //         User.save()
    //             .then(() => res.json('User updated!'))
    //             .catch(err => res.status(400).json('Error: ' + err));
    //         })
    //         .catch(err => res.status(400).json('Error: ' + err));
    // });
    


//updating
// async function updateAuthor(courseId){
//     const course = await course.update({_id: courseId},{
//         $set:{
//             "author.name":"John Smith"
//         }
//     })
// }

//This removes the author property
//         $unset:{
//             "author":""
//         }


//adding the the array
// async function addAuthor(courseId, author){
//     const course = await course.findById(courseId)
//     course.authors.push(author)
//     course.saver()
// }

//remove the the array
// async function addAuthor(courseId, authorID){
//     const course = await course.findById(courseId)
//     const author = course.authors.id(authorId)
//     author.remove()
//     course.saver()
// }

  module.exports = router;