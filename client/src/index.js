import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as TodoProvider } from './context/TodoContext';

ReactDOM.render(
  <AuthProvider>
    <TodoProvider>
      <App />
    </TodoProvider>
  </AuthProvider>,
  document.querySelector('#root')
);
