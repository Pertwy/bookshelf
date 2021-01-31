const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{type: String, required: true},
    isAdmin:{type:Boolean, default:false},
    books:[],
    creator: mongoose.Schema.Types.ObjectId
},{
    timestamps: true
})

const List = mongoose.model('List', bookSchema)

exports.List = List;
