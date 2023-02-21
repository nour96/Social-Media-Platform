import { useState, useEffect } from 'react';
import axios from 'axios';
import { PostCard } from '../components/PostCard';
import { Box, Container } from '@mui/system';
import { Grid } from '@mui/material';
import { CreatePost } from '../components/CreatePost';
import { Navbar } from '../components/Navbar';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:9080/api/allPosts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  });

  const renderedPosts = posts.map((post) => {
    return (
      <PostCard
        sx={{ p: 0.5 }}
        /*name={post.author.firstName}*/ title={post.title}
        content={post.content}
      />
    );
  });

  return (
    <>
      <Navbar />
      <Container>
        <Box>
          <CreatePost />
        </Box>
        <Box>{renderedPosts}</Box>
      </Container>
    </>
  );
};
