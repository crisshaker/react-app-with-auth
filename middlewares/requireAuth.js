const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).send({ error: 'authorization required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'authorization required' });
    }

    const user = await User.findById(payload.user);
    if (!user) {
      return res.status(401).send({ error: 'authorization required' });
    }

    req.user = user;
    next();
  });
};
