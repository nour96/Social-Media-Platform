import jwt from 'jsonwebtoken'

const options = {
    expiresIn: '24h'
}

const generateJWT =  (userName) => {
    try {
        const payload = {userName};
        const token =  jwt.sign(payload, 'This is a good secret', options)
        return token
    }
    catch (err) {
        
    }
}

export default generateJWT