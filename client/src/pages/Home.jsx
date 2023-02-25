import { useState, useEffect } from 'react';
import axios from 'axios';
import { PostCard } from '../components/PostCard';
import { Box } from '@mui/system';
import { CreatePost } from '../components/CreatePost';
import { useAuth } from '../context/AuthContext';
import { Pagination } from '@mui/material';

export const HomePage = () => {
  const { userInfo, token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page, limit) => {
    const res = await axios.get(
      `http://localhost:9080/api/posts?page=${page}&limit=${limit}`
    );
    setPosts(res.data.posts);
    setTotalPages(res.data.totalPages);
  };

  const handleSavePost = async (postId) => {
    const res = await axios.post('http://localhost:9080/api/favourite', {
      postId,
      userId: userInfo?._id,
    });
    setUserFavourites(res.data.data);
  };

  const handleCreatePost = async (title, content, token) => {
    try {
      await axios.post('http://localhost:9080/api/posts', {
        title,
        content,
        token,
      });
      fetchPosts(currentPage, 5);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:9080/api/post/${id}`, {
        data: { token: token },
      });
      fetchPosts(currentPage, 5);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userFavourite = async () => {
      const res = await axios.get(
        `http://localhost:9080/api/user/${userInfo?._id}/favourite`
      );
      setUserFavourites(res.data.posts.favourites);
    };

    fetchPosts(currentPage, 5);
    if (userInfo?._id) {
      userFavourite();
    }
  }, [currentPage, userInfo?._id]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box py={5} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column" width="55%">
          {userInfo && (
            <Box width="100%">
              <CreatePost onSubmit={handleCreatePost} />
            </Box>
          )}
          <Box>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                author={post.author}
                title={post.title}
                content={post.content}
                date={post.createdAt}
                userFavourites={userFavourites.map((fav) => fav._id)}
                handleSavePost={handleSavePost}
                onDelete={handleDeletePost}
              />
            ))}
          </Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </>
  );
};
