import React, { useState } from 'react';

const TodoForm = props => {
  const [title, setTitle] = useState(props.initialValues.title);

  const onSubmit = e => {
    e.preventDefault();

    props.onSubmit({ title });
  };

  return (
    <div>
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <button
          disabled={props.loading}
          className={`ui blue ${props.loading && 'loading'} button`}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

TodoForm.defaultProps = {
  buttonText: 'Submit',
  initialValues: {
    title: ''
  }
};

export default TodoForm;
