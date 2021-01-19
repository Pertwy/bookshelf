const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    //endDate:{type: Date},
    milestones : {type: String, required: true}
},{
    timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal