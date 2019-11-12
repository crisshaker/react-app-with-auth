import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../context/AuthContext';
import AuthForm from './AuthForm';

const Register = () => {
  const {
    state: { loading, token },
    register
  } = useContext(Context);

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <AuthForm buttonText="Register" onSubmit={register} loading={loading} />
    </div>
  );
};

export default Register;
