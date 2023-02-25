import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const PostSchema = new Schema(
  {
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
const postModel = mongoose.model('Post', PostSchema);

export default postModel;
