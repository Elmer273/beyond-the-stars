import express from 'express';
import { getAllPosts, getUserPosts, likePost } from '../controllers/post.js';
import { verifyToken }from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:userId/', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;