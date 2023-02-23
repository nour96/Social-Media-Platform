import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isAuth = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({message: 'Not authorized.'})
    }
    try {
      const verified = jwt.verify(token, 'FDHFGA486412');
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid token!' });
    }
  };
  