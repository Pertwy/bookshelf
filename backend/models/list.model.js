const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    isAdmin:{type:Boolean, default:false},
    books:[],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Testuser" //This is the Schema name
    },
    likes:{type:Boolean, default:0},
    comments:[{
      author: String,
      comment:String
    }]
},{
    timestamps: true
})

const List = mongoose.model('List', bookSchema)

exports.List = List;
