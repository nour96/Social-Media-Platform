import User from '../models/user.js';
import Post from '../models/post.js';

export const userProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(200).json({ message: 'This user does not exist' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal error occured!' });
  }
};

export const userPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { id } = req.params;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Post.find({ author: id }).countDocuments();
  try {
    const posts = await Post.find({ author: id })
      .populate('author')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    if (!posts) {
      res.status(200).json({ message: 'No posts found for this user.' });
    }
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal error occured!' });
  }
};

export const userFavourite = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { id } = req.params;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await User.findById(id).select('favourites').countDocuments();
  try {
    const favouritePosts = await User.findById(id)
      .select('favourites firstName lastName avatar userName')
      .populate({
        path: 'favourites',
        populate: { path: 'author' },
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    if (!favouritePosts) {
      res.status(200).json({ message: 'This user has no favourite posts.' });
    }
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      posts: favouritePosts,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal error occured!' });
  }
};
