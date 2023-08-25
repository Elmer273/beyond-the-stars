import Post from "../db/models/Post.js";
import User from "../db/models/User.js";

const createPost = async (req, res) => {
   try {
      const {
         userId,
         description,
         picturePath,
         isProfile
      } = req.body;
   
      const user = await User.findById(userId);
      const newPost = new Post({
         userId,
         firstName: user.firstName,
         lastName: user.lastName,
         location: user.location,
         description,
         userPicturePath: user.picturePath,
         picturePath,
      });
   
      await newPost.save();
   
      let posts = null;
      if(isProfile) {
         posts = await Post.find({userId});
      } else {
         posts = await Post.find();
      }
      res.status(201).json(posts);
   } catch(err) {
      res.status(409).json({error: err.message});
   }
};

const getAllPosts = async(req, res) => {
   try {
      const posts = await Post.find();
      res.status(200).json(posts);
   } catch(err) {
      res.status(404).json({error: err.message});
   }
};

const getUserPosts = async(req, res) => {
   try {
      const {userId} = req.params;
      const posts = await Post.find({userId});
      res.status(200).json(posts);
   } catch(err) {
      res.status(404).json({error: err.message});
   }
};

const likePost = async(req, res) => {
   try {
      const { id } = req.params;
      const { userId } = req.body;
      const post = await Post.findById(id);
      const isLiked = post.likes.get(userId);

      if (isLiked) {
         post.likes.delete(userId);
      } else {
         post.likes.set(userId, true);
      }

      const updatedPost = await Post.findByIdAndUpdate(
         id,
         { likes: post.likes},
         { new: true }
      );

      res.status(200).json(updatedPost);

   } catch (err) {
      res.status(404).json({error: err.message});
   }
}

export {
   createPost,
   getAllPosts,
   getUserPosts,
   likePost
};