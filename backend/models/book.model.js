const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    author:{type: String, required: true},
    image:{type: String, required: true},
    numberOfTimesRead:{type:Number, default:0},
    numberOfTimesFavorited:{type:Number, default:0},
    reviews:[{
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      },
      review: String
    }],
    rating:{
      1:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      2:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      3:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      4:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      5:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      6:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      7:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      8:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      9:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      }],
      10:[{
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