import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isAuth = async (req, res, next) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res.status(401)
        .redirect('/login');
    }
    try {
      const verified = jwt.verify(authToken, process.env.TOKEN_SERCRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ success: false, msg: 'Invalid token!' });
    }
  };
  
 export const notLogged = (req, res, next) => {
    const { authToken } = req.cookies;
    if (authToken) return res.redirect('/');
    next();
  };