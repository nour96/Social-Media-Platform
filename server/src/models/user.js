import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import validator from 'validator'
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: [true, 'This username is taken.'],
        required: [true, 'Enter a username.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [4, 'Password should be at least four characters']
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        require: [true, 'Enter an email address.'],
        unique: [true, 'This email address is taken.'],
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    avatar: String,
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

}, {
    strict: "throw"
})




export default mongoose.model('User', UserSchema)