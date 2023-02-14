import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup = async (req, res) => {
    const { userName, firstName, lastName, password, email } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        userName,
        firstName,
        lastName,
        password: hashedPassword,
        email
    })
    try {
        await newUser.save()
        res.status(200).json({ message: "New user created!" })
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(422).json({ message: 'User already exist!' });
        }

        // Some other error
        return res.status(422).json(err.message);
    }

}
