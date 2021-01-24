const router = require("express").Router();
let User = require("../models/user.model")
const _ = require("lodash")
const bcrypt = require("bcrypt")


// router.route("/").get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json("Error " + err))
// })

router.post('/', async (req, res) => {
 
    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("invalid email or password")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("invalid email or password")

    const token = user.generateAuthToken();
    res.send(token)
});

module.exports = router;