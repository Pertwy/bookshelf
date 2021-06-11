const { string } = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
    minlength: 5,
    maxlength: 255
  },
  bio:{
    type: String,
  },
  photo:{
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
  },
  givenName: {
    type: String,
  },
  surname: {
    type: String,
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    unique: true
  },

  followers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //This is the Schema name
    // default: ["60c36b6af354781c60550759"]
  }],
  following:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //This is the Schema name
    // default: ["60c36b6af354781c60550759"]
  }],


  // followers:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", //This is the Schema name
  //   default: ["60c36b6af354781c60550759"]
  // }],
  // following:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", //This is the Schema name
  //   default: ["60c36b6af354781c60550759"]
  // }],



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

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, email: this.email, userName: this.userName }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User; 
