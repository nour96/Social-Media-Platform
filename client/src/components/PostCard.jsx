import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import {
  Grid,
  IconButton,
  Input,
  Typography,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { LikeDislike } from './LikeDislike';
import Delete from '@mui/icons-material/Delete';


export const PostCard = ({ name, title, content, id }) => {

  const { userInfo, token } = useAuth();

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      "token": token
    }
    axios.delete(`http://localhost:9080/api/post/${id}`, { data: {"token": token} })
      .then
      ((res) => {
        console.log(res);
      },
        (err) => {
          console.log(err);
        });
  };

  return (
    <div>
      <Card sx={{ mb: 1 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="A">{name[0]}</Avatar>}
          title={title}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={handleDeleteSubmit}>
            <Delete />
          </IconButton>
          {/* <IconButton aria-label="like">
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="dislike">
            <ThumbDownIcon />
          </IconButton> */}
          {/* <LikeDislike /> */}
        </CardActions>
      </Card>
    </div>
  );
};
