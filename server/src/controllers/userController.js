import User from "../models/user.js";
import Post from '../models/post.js'

export const userProfile = async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            res.status(200).json({ message: 'This user does not exist' })
        }
    
        res.status(200).json()
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }

}

export const userPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await Post.find({ author: id })
        if (!posts) {
            res.status(200).json({ message: 'No posts found for this user.' })
        }
        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const userFavs = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await User.findById(id).populate(favourites)
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ message: 'Internal error occured!' })
    }
}

export const logout = async (req, res) => {
    try {
        const {userName} = req.decoded;
        let user = await User.findOne({userName});
        user.accessToken = "";
        await user.save()
        res.status(200).json({message: "User logged out!"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}