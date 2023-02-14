import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const login = async (req, res) => {

    const { userName, password } = req.body;
    const user = await User.findOne({ userName })
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
            jwt.sign({ user }, 'this is a good secret', { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                console.log(token)
            })
            res.json({ message: "Welcome!" })
        }
        else {
            res.json({ message: "Try Again!" })
        }

    } else {

        res.json({ message: "Try Again!" })
    }


}