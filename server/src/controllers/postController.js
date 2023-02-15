import Post from '../models/post.js'

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const createPost = new Post({
            title,
            content,
            author: req.user._id
        })

        const post = await newPost.save();
        res.status(200).json(post)

    } catch (arr) {
        res.status(500).json({message: 'Internal error occured!'})
    }
}

const getPost = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id)
        if (!post) {
            res.status(200).json({message: 'This post does not exist'})
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({message: 'Internal error occured!'})
    }
}

const editPost = async (req, res) => {
    
}