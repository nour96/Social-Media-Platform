// const express = require('express');
// const router = express.Router();

import { Router } from 'express'
import { signup } from './controllers/signup.js';
import { login } from './controllers/login.js';

 const router = Router();

router.get('/', (req, res) => {
    res.send('Hello !')
})

router.post('/signup', signup)
router.post('/login', login)
router.post('/newPost')

export default router;