import { Router } from 'express';
import { signup } from './controllers/signup.js';
import { login } from './controllers/login.js';
import {
  createPost,
  showPost,
  editPost,
  deletePost,
  allPosts,
} from './controllers/postController.js';
import {
  addPostToFavorites,
  userFavourite,
  userPosts,
  userProfile,
} from './controllers/userController.js';
import { logout } from './controllers/logout.js';
import { isAuth } from './middlewares/privateRoute.js';
import { userValidation } from './middlewares/userValidation.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello !');
});

router.post('/signup', userValidation, signup);
router.post('/login', login);
router.get('/logout', logout);

router.get('/user/:id', userProfile);
router.get('/user/:id/posts', userPosts);
router.get('/user/:id/favourite', userFavourite);

router.post('/favourite', addPostToFavorites);

router.get('/posts', allPosts);
router.post('/posts', isAuth, createPost);

router.get('/post/:id', showPost);
router.put('/post/:id', isAuth, editPost);
router.delete('/post/:id', isAuth, deletePost);
// router.post('/posts/:id/upvote')
// router.post('/posts/:id/downvote')

export default router;
