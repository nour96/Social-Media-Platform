import Comment from '../models/comment.js'

export const createComment = async (req, res) => {
    const { content, post, author } = req.body;
    try {
        const comment = new Comment({
            content,
            post,
            author
        })
        await comment.save();
        res.status(201).json({ message: 'Comment created', comment })
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const editComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            res.status(200).json({ message: 'This comment does not exist' })
        }
        comment.content = req.body.content;
        const updatedComment = await comment.save();
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (comment.author == req.user.id) {
            await Comment.findByIdAndDelete(id)
            res.status(200).json({ message: 'Your comment has been deleted.' })
        } else {
            res.status(400).json({ message: 'You are not allowed to delete this comment.' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }

}