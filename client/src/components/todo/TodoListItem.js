import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/TodoContext';

const TodoListItem = props => {
  const { deleteTodo } = useContext(Context);

  return (
    <div className="item">
      <div className="right floated content">
        {props.todo.loading ? (
          <div className="ui active inline loader"></div>
        ) : (
          <React.Fragment>
            <Link to={`/todos/${props.todo._id}/edit`} className="ui button">
              Edit
            </Link>
            <button
              className="ui button"
              onClick={() => deleteTodo(props.todo._id)}
            >
              Delete
            </button>
          </React.Fragment>
        )}
      </div>
      <div className="content">
        <p>{props.todo.title}</p>
      </div>
    </div>
  );
};

export default TodoListItem;
