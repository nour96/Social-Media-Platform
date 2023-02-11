const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
   title: String,
   content: String,
   created_date: Date,
   author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Post', PostSchema)