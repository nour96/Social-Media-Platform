import React from 'react'
import { UserInfo } from '../components/UserInfo'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router';
import { PostCard } from '../components/PostCard'


export const UserProfile = () => {
    const { id } = useParams({})
    const [user, setUser] = useState({})
    const [userPosts, setUserPosts] = useState([])

    const userInfo = async () => {
        const result = await axios.get(`http://localhost:9080/api/user/${id}`)
        setUser(result.data)
    }

    const userPost = async () => {
        const result = await axios.get(`http://localhost:9080/api/${id}/posts`)
        setUserPosts(result.data)
    }

    const renderedPosts = userPosts.map((post) => {
        return <PostCard sx={{ p: 0.5 }} /*name={post.author.firstName}*/ title={post.title} content={post.content} />
    })

    useEffect(() => {
        userInfo()
        userPost();
    }, user)

    return (
        <div>
            <div><UserInfo name={`${user.firstName}  ${user.lastName}`} username={user.userName} avatar={user.avatar} /></div>
            <div>{renderedPosts}</div>
        </div>
    )
}