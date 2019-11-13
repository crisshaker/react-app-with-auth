const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const requireAuth = require('../middlewares/requireAuth');

async function getTodos(req, res) {
  try {
    const todos = await Todo.find({ _user: req.user._id });
    res.send(todos);
  } catch (err) {
    res.status(403).send({ error: 'request failed' });
  }
}

async function createTodo(req, res) {
  const { title } = req.body;
  if (!(title && title.toString().trim())) {
    res.status(403).send({ error: 'title is required' });
  }

  try {
    await Todo.create({ title, _user: req.user._id });
    res.send({ success: true });
  } catch (err) {
    res.status(403).send({ error: 'request failed' });
  }
}

async function deleteTodo(req, res) {
  const { todoID } = req.params;

  if (!todoID) {
    return res.status(403).send({ error: 'bad request' });
  }

  try {
    const todo = await Todo.findById(todoID);
    if (!todo) {
      return res.status(404).send({ error: 'todo not found' });
    }

    if (req.user._id.toString() !== todo._user.toString()) {
      return res.status(401).send({ error: 'authorization required' });
    }

    await todo.remove();
    res.send({ success: true });
  } catch (err) {
    res.status(403).send({ error: 'request failed' });
    console.log(err);
  }
}

async function getTodo(req, res) {
  const { todoID } = req.params;

  if (!todoID) {
    return res.status(403).send({ error: 'bad request' });
  }

  try {
    const todo = await Todo.findById(todoID);
    if (!todo) {
      return res.status(404).send({ error: 'todo not found' });
    }

    if (req.user._id.toString() !== todo._user.toString()) {
      return res.status(401).send({ error: 'authorization required' });
    }

    res.send(todo);
  } catch (err) {
    res.status(403).send({ error: 'request failed' });
    console.log(err);
  }
}

async function editTodo(req, res) {
  const { todoID } = req.params;

  if (!todoID) {
    return res.status(403).send({ error: 'bad request' });
  }

  const { title } = req.body;
  if (!(title && title.toString().trim())) {
    return res.status(403).send({ error: 'title required' });
  }

  try {
    const todo = await Todo.findById(todoID);
    if (!todo) {
      return res.status(404).send({ error: 'todo not found' });
    }

    if (req.user._id.toString() !== todo._user.toString()) {
      return res.status(401).send({ error: 'authorization required' });
    }

    await todo.updateOne({ title });
    res.send({ success: true });
  } catch (err) {
    res.status(403).send({ error: 'request failed' });
    console.log(err);
  }
}

module.exports = app => {
  app.post('/todos', requireAuth, createTodo);
  app.get('/todos/:todoID', requireAuth, getTodo);
  app.get('/todos', requireAuth, getTodos);
  app.patch('/todos/:todoID', requireAuth, editTodo);
  app.delete('/todos/:todoID', requireAuth, deleteTodo);
};
