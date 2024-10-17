import jwt from 'jsonwebtoken';
const authValidator = (req, res, next) => {
  const token = process.env.AUTH_TOKEN
    ? process.env.AUTH_TOKEN
    : req.headers['authorization']?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Access Denied',
      description:
        'Token not provided! Please add a Bearer token in the Authorization header or AUTH_TOKEN in environment configuration.',
    });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ status: 400, message: 'Invalid Token' });
  }
};

export default authValidator;
