import jwt from 'jsonwebtoken';
const authValidator = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export default authValidator;
