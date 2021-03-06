import jwt from 'jsonwebtoken';

const recipeViewValidator = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.body.token || req.params.token;
  if (process.env.NODE_ENV === 'test') {
    const userId = req.body.userId || req.headers.token || 1;
    req.token = { userId };
    next();
  } else if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (!error) {
        req.token = decode;
      }
    });
  }
  next();
};

export default recipeViewValidator;
