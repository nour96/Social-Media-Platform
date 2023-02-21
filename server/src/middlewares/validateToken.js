import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const validateToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        res.status(401).json({
            message: 'Access token is missing'
        })
    }
}

const token = req.headers.authorization.split(' ')[1];

const options = {
    expiresIn: '24h'
}

try {
    let user = await User.findOne({ accessToken: token })
    if (!user) {
        res.status(403).json({ message: 'Authorization error!' })
    }

    result = jwt.verify(token, 'FDHFGA486412', options);
    if (!user.userName === result.userName) {
        res.status(401).json({ message: 'Invalid token!' })
    }
    res.status(401).json(result)
    
    req.decoded = result

} catch (err) {

    if (err.name === "TokenExpiredError") {
        res.status(403).json({
            message: "Token expired",
        })
    }
    res.status(403).json({message: "Authentication error"})

}
