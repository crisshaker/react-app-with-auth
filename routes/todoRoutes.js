const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const requireAuth = require('../middlewares/requireAuth');

async function fetchTodo(req, res, next) {
  const { todoID } = req.params;

  if (!todoID) {
    return res.status(400).send({ error: 'bad request' });
  }

  try {
    const todo = await Todo.findById(todoID);
    if (!todo) {
      return res.status(404).send({ error: 'todo not found' });
    }

    if (req.user._id.toString() !== todo._user.toString()) {
      return res.status(403).send({ error: 'authorization required' });
    }

    req.todo = todo;
    next();
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
    console.log(err);
  }
}

async function getTodos(req, res) {
  try {
    const todos = await Todo.find({ _user: req.user._id });
    res.send(todos);
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
  }
}

async function createTodo(req, res) {
  const { title } = req.body;
  if (!(title && title.toString().trim())) {
    return res.status(400).send({ error: 'title is required' });
  }

  try {
    await Todo.create({ title, _user: req.user._id });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
  }
}

async function deleteTodo(req, res) {
  try {
    await req.todo.remove();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
    console.log(err);
  }
}

async function getTodo(req, res) {
  try {
    res.send(req.todo);
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
    console.log(err);
  }
}

async function editTodo(req, res) {
  const { title } = req.body;
  if (!(title && title.toString().trim())) {
    return res.status(403).send({ error: 'title required' });
  }

  try {
    req.todo.title = title;
    await req.todo.save();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: 'request failed' });
    console.log(err);
  }
}

module.exports = app => {
  app.post('/todos', requireAuth, createTodo);
  app.get('/todos/:todoID', requireAuth, fetchTodo, getTodo);
  app.get('/todos', requireAuth, getTodos);
  app.patch('/todos/:todoID', requireAuth, fetchTodo, editTodo);
  app.delete('/todos/:todoID', requireAuth, fetchTodo, deleteTodo);
};
