import { useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from "axios";

export const LikeDislike = ({post}) => {

    const [upvotes, setUpvotes] = useState(post.upvotes.length);
    const [downvotes, setDownvotes] = useState(post.downvotes.length);
    const [activeBtn, setActiveBtn] = useState("none");
  
    const handleUpvote = async () => {
      try {
        const response = await axios.post(`/posts/${post._id}/upvote`);
        setUpvotes(response.data.upvotes.length);
        setDownvotes(response.data.downvotes.length);
        setActiveBtn("like")
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleDownvote = async () => {
      try {
        const response = await axios.post(`/posts/${post._id}/downvote`);
        setUpvotes(response.data.upvotes.length);
        setDownvotes(response.data.downvotes.length);
        setActiveBtn("dislike")
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <div className="btn-container">
            <IconButton aria-label="like">
                <ThumbUpIcon className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
                    onClick={handleUpvote} />
                {upvotes}
            </IconButton>

            <IconButton aria-label="dislike">
                <ThumbDownIcon className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                    onClick={handleDownvote} />
                {downvotes}
            </IconButton>

        </div>
    )
}