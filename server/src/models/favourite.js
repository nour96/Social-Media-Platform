const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavouriteSchema = new Schema({
    user_id: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    post_id: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Favourite', FavouriteSchema)