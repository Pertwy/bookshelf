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
    
    //const token = jwt.sign({_id: newUser._id}, config.get('jwtPrivateKey'))
    let token = newUser.generateAuthToken();
    
    await newUser.save()
        .then(() => res.cookie("token", token, {httpOnly: true}).send(_.pick(newUser, ["_id", "email", "name"])))

    // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]))
    //res.send(user)
  });



// log in

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
  
      if (!email || !password)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
  
  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
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