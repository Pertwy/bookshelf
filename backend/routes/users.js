const router = require("express").Router();
let User = require("../models/user.model")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const config = require("config")

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error " + err))
})

router.post('/add', async (req, res) => {
 
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered")

    const newUser = new User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    
    const token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.header("x-auth-token", token).send(_.pick(newUser, ["_id", "name", "email"])))

    // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]))
    //res.send(user)
  });

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/updatebooks/').put((req, res) => {
    User.find({"cred": req.params.cred})
        .then(user => {
        user.books = [ ...user.books, req.body.book];

        User.save()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

  module.exports = router;