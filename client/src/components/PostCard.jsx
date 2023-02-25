import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IconButton, Typography, Box } from '@mui/material';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Link from '@mui/material/Link';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditPost } from './EditPost';
import { Modal } from './Modal';
// import { Modal } from '@mui/material';

export const PostCard = ({
  id,
  author,
  title,
  content,
  date,
  userFavourites,
  handleSavePost,
  onDelete,
}) => {
  const deleteAlertTitle = 'Delete Post';
  const deleteAlertContent = 'Are you sure you want to permenantly delete the selected post?'
  const { userInfo, token } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isSaved = userFavourites?.includes(id);

  const handleDeleteSubmit = async (event) => {
    event.preventDefault();
    onDelete(id);
    toggleModalVisibility();
  };

  const toggleEditMode = (event) => {
    event.preventDefault();
    setIsEdit(!isEdit);
  };

  const toggleModalVisibility = () => {
    // event.preventDefault();
    setShowModal(!showModal);
  }

  return (
    <div>
      {!isEdit ? (
        <div>
          {showModal && 
          <Modal 
          show={showModal} 
          title={deleteAlertTitle} 
          content={deleteAlertContent}
          onOk={handleDeleteSubmit} 
          onClose={toggleModalVisibility} 
          />}
          
          <Box
            py={3}
            px={2.5}
            mb={2}
            display="flex"
            flexDirection="column"
            // border="1px solid red"
            bgcolor="background.card"
            borderRadius={1}
          >
            <Box mb={2} justifyContent="space-between" display="flex">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar sx={{ bgcolor: red[500], mr: 1 }}>
                  {author?.firstName[0]}
                </Avatar>
                <Link
                  href={`/user/${author?._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography mr={0.5}>
                    {author?.firstName} {author?.lastName}
                  </Typography>
                </Link>
                <Typography variant="caption">@{author?.userName}</Typography>
                {date && (
                  <Typography variant="caption" ml={0.3}>
                    • {date.split(/[T ]/i, 1)[0]}
                  </Typography>
                )}
              </Box>
              <Box>
                {userInfo?._id === author?._id && (
                  <>
                    <IconButton sx={{ px: 0.3 }} onClick={toggleModalVisibility}>
                      <Delete onClick={toggleModalVisibility} />
                    </IconButton>
                    <IconButton sx={{ px: 0.3 }} onClick={toggleEditMode}>
                      <EditIcon />
                    </IconButton>
                  </>
                )}
                <IconButton sx={{ px: 0.3 }} onClick={() => handleSavePost(id)}>
                  {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Box>
                <Box mb={1}>
                  <Typography mb={2} variant="h6">
                    {title}
                  </Typography>
                  <Typography variant="body2">{content}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>) : (
        <EditPost
          oldTitle={title}
          oldContent={content}
          id={id}
          setIsEdit={setIsEdit}
        />
      )
      }
    </div>
  );
};
