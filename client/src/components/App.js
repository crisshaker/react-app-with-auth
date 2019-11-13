import React, { useContext, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../history';
import Header from './Header';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import TodoList from './todo/TodoList';
import TodoCreate from './todo/TodoCreate';
import TodoEdit from './todo/TodoEdit';
import ProtectedRoute from './ProtectedRoute';
import { Context } from '../context/AuthContext';

const App = () => {
  const {
    state: { token },
    tryLocalLogin
  } = useContext(Context);

  useEffect(() => {
    tryLocalLogin();
  }, []);

  if (token === null) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui loader"></div>
      </div>
    );
  }

  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path="/todos" exact component={TodoList} />
            <ProtectedRoute path="/todos/new" exact component={TodoCreate} />
            <ProtectedRoute
              path="/todos/:_id/edit"
              exact
              component={TodoEdit}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
