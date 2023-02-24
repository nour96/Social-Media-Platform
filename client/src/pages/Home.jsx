import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PostCard } from '../components/PostCard';
import { Box } from '@mui/system';
import { CreatePost } from '../components/CreatePost';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const { userInfo } = useAuth();

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:9080/api/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  return (
    <>
      <Box display="flex" flexDirection="column" my={10} mx={50}>
        {userInfo && (
          <Box width="100%">
            <CreatePost />
          </Box>
        )}
        <Box>
          {posts.map((post) => (
            <PostCard
              author={post.author} title={post.title}
              content={post.content} id={post._id}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
