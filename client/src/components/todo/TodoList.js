import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/TodoContext';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  const {
    state: { todos },
    fetchTodos
  } = useContext(Context);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>TodoList</h1>
      <Link to="/todos/new" className="ui teal button">
        New
      </Link>
      <div className="ui middle aligned divided list">
        {todos.map(todo => (
          <TodoListItem todo={todo} key={todo._id} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
