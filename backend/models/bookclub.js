const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookclubSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String},
    books:[],
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //This is the Schema name
    },
    discussion:[{
      author: String,
      comment: String
    }]
},{
    timestamps: true
})

const Bookclub = mongoose.model('Bookclub', bookclubSchema)

exports.Bookclub = Bookclub;
