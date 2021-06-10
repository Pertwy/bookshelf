const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    description:String,
    books:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book" //This is the Schema name
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //This is the Schema name
    },
    likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" //This is the Schema name
    }],
    comments:[{
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //This is the Schema name
      },
      comment: String
    }],
    isAdmin:{type:Boolean, default:false},
},{
    timestamps: true
})

const List = mongoose.model('List', bookSchema)

exports.List = List;
