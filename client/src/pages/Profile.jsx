import React, { useCallback, useContext } from 'react';
import { UserInfo } from '../components/UserInfo';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { PostCard } from '../components/PostCard';
import { Box } from '@mui/system';
// import { Folder, Save } from '@material-ui/icons';
import { Avatar, Tab, Tabs, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

import { ColorModeContext } from '../context/ColorModeContext';
import { Pagination } from '@mui/material';

export const Profile = () => {
  const { id } = useParams({});

  const { userInfo: user, token } = useAuth();
  const { mode } = useContext(ColorModeContext);

  const [profile, setProfile] = useState(null);

  const [userPosts, setUserPosts] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const background =
    mode === 'dark'
      ? 'https://images.unsplash.com/photo-1589810264340-0ce27bfbf751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      : 'https://images.unsplash.com/photo-1548504778-b14db6c34b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80';

  const userProfile = useCallback(async () => {
    const res = await axios.get(`http://localhost:9080/api/user/${id}`);
    if (user !== res.data) {
      setProfile(res.data);
    } else {
      setProfile(user);
    }
  }, [id, user]);

  const userPost = useCallback(
    async (page, limit) => {
      const res = await axios.get(
        `http://localhost:9080/api/user/${id}/posts?page=${page}&limit=${limit}`
      );
      setUserPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    },
    [id]
  );

  const userFavourite = useCallback(
    async (page, limit) => {
      const res = await axios.get(
        `http://localhost:9080/api/user/${id}/favourite?page=${page}&limit=${limit}`
      );

      setUserFavourites(res.data.posts.favourites);
      setTotalPages(res.data.totalPages);
    },
    [id]
  );

  const handleSavePost = async (postId) => {
    const res = await axios.post('http://localhost:9080/api/favourite', {
      postId,
      userId: user?._id,
    });
    setUserFavourites(res.data.data);
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:9080/api/post/${id}`, {
        data: { token: token },
      });
      userPost(currentPage, 5);
      userFavourite(currentPage, 5);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userProfile();
    userPost(currentPage, 5);
    userFavourite(currentPage, 5);
  }, [currentPage, userProfile]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box py={5} display="flex" justifyContent="center" alignItems="center">
      <Box width="65%" bgcolor="background.paper">
        <Box position="relative">
          <img
            width="100%"
            height="200px"
            src={background}
            alt="background"
            style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 150,
              left: 50,
              borderRadius: '50%',
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mr: 1 }}>
              {profile?.firstName.charAt(0)}
            </Avatar>
          </Box>
        </Box>

        <Box py={5} ml={2}>
          <Typography sx={{ fontWeight: '500' }}>
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#555' }}>
            @{profile?.userName}
          </Typography>
        </Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Posts" />
          <Tab label="Favourites" />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 &&
            userPosts.map((post) => (
              <PostCard
                id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                userFavourites={userFavourites.map((fav) => fav._id)}
                handleSavePost={handleSavePost}
                onDelete={handleDeletePost}
              ></PostCard>
            ))}
          {value === 1 &&
            userFavourites.map((post) => (
              <PostCard
                id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                userFavourites={userFavourites.map((fav) => fav._id)}
                handleSavePost={handleSavePost}
                onDelete={handleDeletePost}
              ></PostCard>
            ))}
          <Box>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
