import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Box } from '@mui/system'

export const CreateComment = () => {
        const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9080/api/createComment', { content, })
            .then((res) => { console.log(res) }, (err) => {
                console.log(err)
            })
    }

    return (
        <div className="new-post">
            {/* <form onSubmit={handleSubmit}>
            <div class="MuiInput-root">
                <input class="MuiInput-input" value={content} onChange={(e) => setContent(e.target.value)}/>
            
                <input type="submit" value="Submit" />
                </div>
            </form> */}
            <form onSubmit={handleSubmit}>
                <div>
                    
                        <input
                            name="title"
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    
                </div>
                <div>
                    
                       
                        <textarea
                            name="content"
                            rows={4}
                            cols={40}
                            placeholder="share your thoughts..."
                            value={content} onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                <hr />
                <button>Save post</button>
            </form>
        </div>
    )
}