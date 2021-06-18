const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = require("express").Router();
const {List} = require("../models/list.model")

const mongoose = require("mongoose")

router.route("/admin").get((req, res) => {
    List.find({isAdmin:true})
        .populate("author")
        .populate("books")
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json("Error " + err))
})

//transaction
// try{
//     new Fawn.Task()
//         .save('books', newBook) //books is the collection name
//         .update("users", {id: userEvent._id},{
//             $set add a book to books array
//         })
//         .run()
// }catch(ex){
//     res.status(500).send("Something failed.")
// }

module.exports = router;