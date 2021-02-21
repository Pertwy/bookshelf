const mongoose = require('mongoose')
const Joi = require('joi');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    book:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book" //This is the Schema name
    },
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testuser" //This is the Schema name
    },  
    review:String,
    rating:Number,
    likes:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testuser" //This is the Schema name
    },
    comments:[{
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testuser" //This is the Schema name
      },
      comment: String
    }]
},{
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

exports.Review = Review;
