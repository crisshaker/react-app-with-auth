module.exports = app => {
  require('./authRoutes')(app);
  require('./todoRoutes')(app);
};
