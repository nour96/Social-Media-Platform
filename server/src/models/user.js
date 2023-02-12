import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

})

const userModel = mongoose.model('User', UserSchema)

export default userModel