import React, { useState } from 'react';

const AuthForm = props => {
  const [email, setEmail] = useState('someuser@mail.com');
  const [password, setPassword] = useState('123');

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit({ email, password });
  };

  return (
    <div>
      <form className="ui form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={props.loading}
          className={`ui blue button ${props.loading && 'loading'}`}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

AuthForm.defaultProps = {
  buttonText: 'Submit',
  loading: false
};

export default AuthForm;
