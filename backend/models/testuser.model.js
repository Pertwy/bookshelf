const { string } = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const testuserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  bio:{
    type: String,
  },
  photo:{
    type: String,
  },



  followers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testuser" //This is the Schema name
  }],
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Testuser" //This is the Schema name
  }],



  reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review" //This is the Schema name
  }],
  likes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" //This is the Schema name
  }],



  books:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" //This is the Schema name
  }],
  readList:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" //This is the Schema name
  }],
  favorites:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" //This is the Schema name
  }],
  bookshelf:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" //This is the Schema name
  }],


  lists:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "List" //This is the Schema name
  }],
  bookclubs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bookclub" //This is the Schema name
  }]
});

testuserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const Testuser = mongoose.model('Testuser', testuserSchema);

exports.Testuser = Testuser; 
