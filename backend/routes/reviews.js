
const router = require("express").Router();
const {Review} = require("../models/review.model")
const _ = require("lodash")
const mongoose = require("mongoose")

router.route("/").get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json("Error " + err))
})


router.post('/add', async (req, res) => {
    let newReview = new Review(_.pick(req.body, ["title", "author", "image"]))
    newReview = await newReview.save();

    res.send(newReview._id);
});

module.exports = router;