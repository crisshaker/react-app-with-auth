import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import { Context } from '../../context/TodoContext';

export default () => {
  const {
    createTodo,
    state: { loading }
  } = useContext(Context);

  return (
    <div>
      <TodoForm buttonText="Create" onSubmit={createTodo} loading={loading} />
    </div>
  );
};
