const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    author:{type: String, required: true},
    image:{type: String, required: true},
    numberOfTimesRead:{type:Number, default:0},
    numberOfTimesFavorited:{type:Number, default:0},
    bookshelf:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testuser" //This is the Schema name
    }],
    reviews:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review" //This is the Schema name
    }],
    rating:{
      one:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      two:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      three:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      four:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      five:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      six:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      seven:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      eight:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      nine:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      ten:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }]
    }
},{
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

function validateBook(book) {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      author: Joi.string().min(5).max(255).required(),
      image: Joi.string().min(5).required()
    };
  
    return Joi.validate(book, schema);
  }
  

exports.validate = validateBook;
exports.Book = Book;
//module.exports = Book