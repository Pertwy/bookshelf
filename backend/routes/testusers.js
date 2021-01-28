const router = require("express").Router();
let {Testuser} = require("../models/testuser.model")
const _ = require("lodash")
const config = require("config")
const auth = require("../middleware/auth")
const express = require('express');

router.route("/").get((req, res) => {
    Testuser.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/add', async (req, res) => {
 
    let user = await Testuser.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    let newUser = new Testuser(_.pick(req.body, ["email", "name"]));
    
    await newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
        //.then(() => send(_.pick(newUser, ["_id", "email", "name"])))
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

  module.exports = router;