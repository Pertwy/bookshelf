const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const diaryEntrySchema = new Schema({
    description:{type: String, required: true}
    //date:{type: Date, required: true}
},{
    timestamps: true
})

const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema)

module.exports = DiaryEntry