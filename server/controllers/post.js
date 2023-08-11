import Post from "../db/models/Post";
import User from "../db/models/User";

const createPost = async (req, res) => {
   try {
      const {
         userId,
         description,
         picturePath
      } = req.body;
   
      const user = await User.findById(userId);
      const newPost = new Post({
         userId,
         location,
         description,
         picturePath,
         userPicturePath: user.picturePath
      });
   
      await newPost.save();
   
      const posts = await Post.find();
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

export default {
   createPost,
   getAllPosts,
   getUserPosts,
   likePost
};