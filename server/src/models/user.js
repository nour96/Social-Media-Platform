const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_name: String,
    email: String,
    avatar: String,
    gender: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Favourite' }]

})

module.exports = mongoose.model('User', UserSchema)