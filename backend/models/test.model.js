const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const testSchema = new Schema({
    title:{type: String, required: true},
    testArray:[],
    details:{
        test1:Number,
        test2:Number
    }
    //published:Boolean
    //keywords:Array
    // author:{
    //     type: Schema.ObjectId,
    //     ref: 'User'
    // }
    //test:{type:String, unique: true, default:"default" }
},{
    timestamps: true
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test