import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Box } from '@mui/system'

export const CreatePost = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9080/api/createPost', { title, content })
            .then((res) => { console.log(res) }, (err) => {
                console.log(err)
            })
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
            <div class="MuiInput-root">
                <input class="MuiInput-input" value={content} onChange={(e) => setContent(e.target.value)}/>
            
                <input type="submit" value="Submit" />
                </div>
            </form>
        </Box>
    )
}