const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

async function register(req, res) {
  const { email, password } = req.body;

  if (
    !(
      email &&
      email.toString().trim() &&
      password &&
      password.toString().trim()
    )
  ) {
    return res.status(403).send({ error: 'all fields required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).send({ error: 'email taken' });
    }

    const user = await User.create({ email, password });
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

    return res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (
    !(
      email &&
      email.toString().trim() &&
      password &&
      password.toString().trim()
    )
  ) {
    return res.status(403).send({ error: 'all fields required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: 'incorrect email or password' });
  }

  try {
    await user.comparePassword(password.toString());
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(403).send({ error: 'incorrect email or password' });
  }
}

async function verifyToken(req, res) {
  const { token } = req.body;

  if (!(token && token.toString().trim())) {
    res.status(403).send({ error: 'token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, payload) {
    if (err) {
      return res.status(403).send({ valid: false });
    }

    res.send({ valid: true });
  });
}

module.exports = app => {
  app.post('/auth/register', register);
  app.post('/auth/login', login);
  app.post('/auth/verify-token', verifyToken);
};
