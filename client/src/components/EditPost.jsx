import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Avatar, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

export const EditPost = ({ oldTitle, oldContent, id, setIsEdit }) => {
    const [title, setTitle] = useState(oldTitle);
    const [content, setContent] = useState(oldContent);
    const { userInfo, token } = useAuth();

    const user = userInfo?._id

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        axios.put(`http://localhost:9080/api/post/${id}`, { title, content, token })
            .then
            ((res) => {
                console.log(res);
                setTitle('')
                setContent('')
                setIsEdit(false)
            },
                (err) => {
                    console.log(err);
                });
    };

    return (
        <>
            <Box p={3} mb={3} borderRadius={1} bgcolor="background.paper">
                <Box display="flex" justifyContent="space-between">
                    <Avatar sx={{ width: 40, height: 40, mr: 1 }}>
                        {userInfo?.firstName.charAt(0)}
                    </Avatar>

                    <Box width="100%">
                        <form onSubmit={handleEditSubmit}>
                            <Box mb={2}>
                                <TextField
                                    name="title"
                                    placeholder="Post title"
                                    value={title}
                                    fullWidth
                                    onChange={(e) => setTitle(e.target.value)}
                                ></TextField>
                            </Box>
                            <Box mb={2}>
                                <TextField
                                    name="content"
                                    placeholder="share your thoughts..."
                                    fullWidth
                                    multiline
                                    minRows={6}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></TextField>
                            </Box>

                            <Button fullWidth variant="contained" type="submit">
                                Post
                            </Button>
                            <Box marginTop={1}>
                            <Button  fullWidth variant="outlined" onClick={()=>{setIsEdit(false)}}>
                                Cancel
                            </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )

}