import Post from '../models/post.js'

const newPost = async (req, res) => {
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
