const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  meta: [String]
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, matching) => {
      if (err) {
        return reject(err);
      }

      if (!matching) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model('User', UserSchema);
