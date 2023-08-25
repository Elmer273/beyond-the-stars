import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
   userId: {
      type: String,
      required: true
   },
   
   firstName: {
      type: String,
      required: true,
      min: 2,
      max: 30
   },

   lastName: {
      type: String,
      required: true,
      min: 2,
      max: 30
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

const Post = mongoose.model("Post", PostSchema);

export default Post;