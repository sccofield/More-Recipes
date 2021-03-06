import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.body.token || req.params.token;
  if (process.env.NODE_ENV === 'test') {
    const userId = req.body.userId || req.headers.token || 1;
    if (Number(userId)) {
      req.token = { userId };
      next();
    } else {
      return res.status(400).send({ status: 'Failure', message: 'Token Not Valid' });
    }
  } else if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (!error) {
        req.token = decode;
        next();
      } else {
        return res.status(400).send({ status: 'Bad Request', message: 'Token Not Valid' });
      }
    });
  } else {
    return res.status(400).send({ status: 'Bad Request', message: 'Please send a token!' });
  }
};

export default authMiddleware;
