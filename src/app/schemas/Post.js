import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
