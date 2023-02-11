const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: String,
    post_id: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_date: Date

})

module.exports = mongoose.model('Comment', CommentSchema)