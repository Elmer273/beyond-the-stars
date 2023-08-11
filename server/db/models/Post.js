import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
   },

   creation_date: {
      type: Date,
      required: false,
      default: Date.now()
   },

   likes: {
      type: Map,
      of: Boolean,
      default: {}
   },

   comments: {
      type: Array,
      default: []
   },

   location: String,
   description: String,
   picturePath: String,
   userPicturePath: String,
},
   {timestamps: true}
);

const Post = mongoose.Model("Post", PostSchema);

export default Post;