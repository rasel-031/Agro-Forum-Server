
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  title: { type: String, required: true },
  imageURL: { type: String,},
  story: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
});

const postModel = mongoose.model("post", postSchema);

export default postModel;