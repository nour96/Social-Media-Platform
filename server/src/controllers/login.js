import User from "../models/user.js"
import bcrypt from 'bcrypt'
import generateJWT from "../middlewares/generateJWT.js";


export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
            generateJWT(res, user);
            res.status(200).json({ message: "Welcome!" })
        }
        else {
            res.status(401).json({error: true, message: "Invalid email or password." })
        }

    } else {

        res.status(401).json({error: true, message: "No user found with the given email address." })
    }
}