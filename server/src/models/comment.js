import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const CommentSchema = new Schema({
    content: String,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },

})
const commentModel = mongoose.model('Comment', CommentSchema)

export default commentModel