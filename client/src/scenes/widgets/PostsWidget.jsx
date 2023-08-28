import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false}) => {
   const dispatch = useDispatch();
   const posts = useSelector((state) => state.posts);
   const token = useSelector((state) => state.token);

   const getPosts = async () => {
      const response = await fetch('http://localhost:5000/posts', {
         method: 'GET',
         headers: { Authorization: `Bearer ${token}`},
      });
      const data = await response.json();
      const sortedData = data.sort((p1, p2) => (p1.createdAt < p2.createdAt) ? 1 : (p1.createdAt > p2.createdAt) ? -1 : 0)
      dispatch(setPosts({posts: sortedData}));
   }

   const getUserPosts = async () => {
      const response = await fetch(`http://localhost:5000/posts/${userId}`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${token}`},
      });
      const data = await response.json();
      const sortedData = data.sort((p1, p2) => (p1.createdAt < p2.createdAt) ? 1 : (p1.createdAt > p2.createdAt) ? -1 : 0)
      dispatch(setPosts({posts: sortedData}));
   }

   useEffect(() => {
      if (isProfile) {
         getUserPosts();
      } else {
         getPosts();
      }
   }, []);

   return (
      <>
         {posts.map(
            ({
               _id,
               userId,
               firstName,
               lastName,
               description,
               location,
               picturePath,
               userPicturePath,
               likes,
               comments
            }) => (
               <PostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
               />
            )
         )}
      </>
   );
};

export default PostsWidget;