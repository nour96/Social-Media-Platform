import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signup = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body

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
        res.status(200).json({ message: 'New user created!' })
    } catch (err) {
        if (err.name === 'ValidationError') {
            // validation error
            let errors = Object.values(err.errors).map(el => el.message);
            let fields = Object.values(err.errors).map(el => el.path);
            let code = 400;
            if (errors.length > 1) {
                const formattedErrors = errors.join(' ');
                res.status(code).send({ messages: formattedErrors, fields: fields });
            } else {
                res.status(code).send({ messages: errors, fields: fields })
            }
        }
        else if (err.code && err.code == 11000) {
            // duplicate values
            const field = Object.keys(err.keyValue);
            const code = 409;
            const error = `An account with that ${field} already exists.`;
            res.status(code).send({ messages: error, fields: field });
        }

        // Some other error
        else {
            res
                .status(500)
            .send('An unknown error occurred.')
        }
    }

}

