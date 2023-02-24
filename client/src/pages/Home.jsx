import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PostCard } from '../components/PostCard';
import { Box } from '@mui/system';
import { CreatePost } from '../components/CreatePost';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Pagination } from '@mui/material';

export const HomePage = () => { const { userInfo } = useAuth();

const [posts, setPosts] = useState([]);
const [totalPages, setTotalPages] = useState(0);
const [currentPage, setCurrentPage] = useState(1);

const fetchPosts = async (page, limit) => {
  const res = await axios.get(`http://localhost:9080/api/posts?page=${page}&limit=${limit}`);
  setPosts(res.data.posts);
  setTotalPages(res.data.totalPages);
};

useEffect(() => {
  fetchPosts(currentPage, 5);
}, [currentPage]);

const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

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
            key={post._id}
            author={post.author}
            title={post.title}
            content={post.content}
            id={post._id}
          />
        ))}
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  </>
);
};