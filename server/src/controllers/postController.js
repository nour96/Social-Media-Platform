import Post from '../models/post.js'

export const createPost = async (req, res) => {
    const { _id } = req.user
    const { title, content } = req.body;
    try {
        const post = new Post({
            title,
            content,
            author: _id
        })

        await post.save();
        res.status(201).json({ message: 'Post created', post })

    } catch (arr) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const allPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const total = await Post.countDocuments();
  
    const posts = await Post.find()
      .populate('author', 'firstName lastName avatar userName')
      .skip(startIndex)
      .limit(limit);
  
    const totalPages = Math.ceil(total / limit);
  
    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
    });
  };

export const showPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id)
        if (!post) {
            res.status(200).json({ message: 'This post does not exist' })
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const editPost = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user
    const { title, content } = req.body
    try {
        const post = await Post.findById(id)
        if (post.author == _id) {
            post.title = title;
            post.content = content;
            await post.save();
            res.status(200).json(post)
        } else {
            res.status(402).json({ message: 'You are not authorized to edit this post.' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }

}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    
    try {
        const post = await Post.findById(id);
        if (post.author == req.user._id) {
            await Post.findByIdAndDelete(id)
            res.status(200).json({ message: 'Your post has been deleted.' })
        } else {
            res.status(400).json({ message: 'You are not allowed to delete this post.' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }

}

export const upVote = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        if (post.upvotes.includes(req.user._id)) {
            return res.status(400).json('User already upvoted this post');
        }
        if (post.downvotes.includes(req.user._id)) {
            post.downvotes.pull(req.user._id);
        }
        post.upvotes.push(req.user._id);
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

export const downVote = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        if (post.downvotes.includes(req.user._id)) {
            return res.status(400).send('User already downvoted this post');
        }
        if (post.upvotes.includes(req.user._id)) {
            post.upvotes.pull(req.user._id);
        }
        post.downvotes.push(req.user._id);
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

