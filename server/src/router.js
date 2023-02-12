// const express = require('express');
// const router = express.Router();

import { Router } from 'express'
export const router = Router();

router.get('/', (req, res) => {
    res.send('Hello !')
})

router.get('/newuser', async (req, res) => {

})

// export default router;