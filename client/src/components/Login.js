import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context/AuthContext';
import AuthForm from './AuthForm';

const Login = props => {
  const {
    state: { loading, token },
    login
  } = useContext(Context);

  const { from } = props.location.state || { from: { pathname: '/' } };

  if (token) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <AuthForm buttonText="Login" onSubmit={login} loading={loading} />
    </div>
  );
};

export default Login;
