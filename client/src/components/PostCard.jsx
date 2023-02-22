import React from 'react';
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

export const PostCard = ({ name, title, content }) => {



  return (
    <div>
      <Card sx={{ width: 600 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="A"></Avatar>}
          title={title}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
