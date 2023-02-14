import User from "../models/user.js"
import bcrypt from 'bcrypt'
import generateJWT from "../middlewares/generateJWT.js";


export const login = async (req, res) => {

    const { userName, password } = req.body;
    const user = await User.findOne({ userName })
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword) {
            const token = generateJWT(userName);
            user.accessToken = token;
            await user.save()
            res.json({ message: "Welcome!" })
         }
        else {
            res.json({ message: "Try Again!" })
        }

    } else {

        res.json({ message: "Try Again!" })
    }


}