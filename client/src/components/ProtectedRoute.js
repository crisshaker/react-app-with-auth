import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from '../context/AuthContext';

export default ({ component: Component, ...rest }) => {
  const {
    state: { token }
  } = useContext(Context);

  return (
    <Route
      {...rest}
      render={props => {
        if (!token) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};
