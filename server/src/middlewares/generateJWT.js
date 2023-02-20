import jwt from 'jsonwebtoken'

const options = {
    expiresIn: '24h'
}

const generateJWT = (res, user) => {
    const { _id, userName } = user;
    const payload = { _id, userName };
    const token = jwt.sign(payload, 'FDHFGA486412', options)
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    console.log(res)
    return token;
}

export default generateJWT