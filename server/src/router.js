// const express = require('express');
// const router = express.Router();

import { Router } from 'express'
import { signup } from './controllers/signup.js';
import { login } from './controllers/login.js';
import {createPost, showPost, editPost, deletePost, allPosts} from './controllers/postController.js'
import { userPosts, userProfile } from './controllers/userController.js';


 const router = Router();

router.get('/', (req, res) => {
    res.send('Hello !')
})

router.get('/user/:id', userProfile)
router.get('/allPosts', allPosts)
router.get('/:id/posts', userPosts)
router.post('/signup', signup)
router.post('/login', login)
router.post('/createPost', createPost)
router.post('/showPost/:id', showPost)
router.post('/editPost/:id', editPost)
router.post('/deletePost/:id', deletePost)

export default router;