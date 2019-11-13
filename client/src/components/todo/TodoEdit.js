import React, { useContext } from 'react';
import TodoForm from './TodoForm';
import { Context } from '../../context/TodoContext';
import useFetchTodo from '../../hooks/useFetchTodo';

const TodoEdit = props => {
  const {
    editTodo,
    state: { loading }
  } = useContext(Context);

  const [todo] = useFetchTodo(props.match.params._id);

  const onSubmit = ({ title }) => {
    editTodo({ _id: props.match.params._id, title });
  };

  if (todo === null) {
    return <div className="ui active centered inline loader" />;
  }

  if (todo === false) {
    return (
      <div className="ui negative message">
        <div className="header">Error fetching todo</div>
        <p>Please try again</p>
      </div>
    );
  }

  return (
    <div>
      <TodoForm
        buttonText="Save changes"
        onSubmit={onSubmit}
        loading={loading}
        initialValues={todo}
      />
    </div>
  );
};

export default TodoEdit;
