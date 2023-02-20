import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: String,
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

}, {
    strict: "throw"
})



export default mongoose.model('User', UserSchema)