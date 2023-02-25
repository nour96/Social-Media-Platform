import jwt from 'jsonwebtoken';

const options = {
  expiresIn: '24h',
};

const generateJWT = (res, user) => {
  if (!user || !res) {
    return "Invalid data!";
  }
  const { _id, userName, firstName, lastName } = user;
  const payload = { _id, userName, firstName, lastName };
  const token = jwt.sign(payload, 'FDHFGA486412', options);
  res.cookie('token', token, { httpOnly: false });

  return token;


  
};

export default generateJWT;
